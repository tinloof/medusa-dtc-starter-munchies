import { defineMiddleware, sequence } from "astro:middleware";
import type { RequestContext } from "@/lib/context";
import config from "./config";
import { getTags, requestContext } from "./lib/context";

const contextMiddleware = defineMiddleware((context, next) => {
  const ctx = context.locals.runtime?.ctx;
  const { cookies } = context;
  const tags = new Set<string>();
  return requestContext.run({ ctx, cookies, tags }, next);
});

const excludedPaths = [
  "/api",
  "/images",
  "/icons",
  "/cdn-cgi",
  "/favicon.ico",
  "/favicon-inactive.ico",
  "/_astro",
  "/_image",
  "/_server-islands",
  "/cms",
];

function isExcludedPath(pathname: string): boolean {
  const match = excludedPaths.find(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  return !!match;
}

const countryCodeMiddleware = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Skip static assets and excluded paths
  if (isExcludedPath(pathname)) {
    return next();
  }

  // Extract first path segment
  const parts = pathname.split("/").filter(Boolean);
  const firstPart = parts[0]?.toLowerCase();

  // Redirect /us/... to /... (default country shouldn't appear in URL)
  if (firstPart === config.defaultCountryCode) {
    const restPath = `/${parts.slice(1).join("/")}`;
    return context.redirect(restPath || "/", 308);
  }

  // Check if path has a valid non-default country code
  const hasCountryCode =
    firstPart && config.supportedCountryCodes.includes(firstPart);

  // Store country code in locals for components
  const countryCode = hasCountryCode ? firstPart : config.defaultCountryCode;
  context.locals.countryCode = countryCode;
  context.locals.defaultCountryCode = config.defaultCountryCode;

  return next();
});

const cachingMiddleware = defineMiddleware(async (context, next) => {
  const { request, url } = context;
  const { pathname } = url;
  const ctx = context.locals.runtime?.ctx;

  // Skip caching for non-GET, API routes, CMS, static assets, and draft mode
  const isDraftMode = request.headers
    .get("cookie")
    ?.includes("sanity-draft-mode=true");

  if (isExcludedPath(pathname) || isDraftMode || request.method !== "GET") {
    return next();
  }

  // Cache API not available (e.g., dev mode or workers.dev domain)
  if (typeof caches === "undefined") {
    return next();
  }

  const cache = caches.default;
  const cachedResponse = await cache.match(context.request);

  // HIT - return immediately
  if (cachedResponse) {
    const headers = new Headers(cachedResponse.headers);
    return new Response(cachedResponse.body, {
      status: cachedResponse.status,
      statusText: cachedResponse.statusText,
      headers,
    });
  }

  // MISS - return streaming response immediately, cache in background
  const originalResponse = await next();

  const cacheControl = originalResponse.headers.get("Cache-Control");
  const shouldCache =
    !(
      cacheControl?.includes("private") || cacheControl?.includes("no-store")
    ) &&
    originalResponse.status >= 200 &&
    originalResponse.status < 300;

  if (!shouldCache) {
    const headers = new Headers(originalResponse.headers);
    headers.set("X-Cache", "SKIP");
    return new Response(originalResponse.body, {
      status: originalResponse.status,
      statusText: originalResponse.statusText,
      headers,
    });
  }

  // Clone for caching, return original immediately
  const responseToCache = originalResponse.clone();

  // Add X-Cache header and return immediately
  const headers = new Headers(originalResponse.headers);
  headers.set("X-Cache", "MISS");

  // Defer all caching work to waitUntil, re-entering ALS context
  const cacheWork = (store: RequestContext) =>
    requestContext.run(store, async () => {
      // Consume body - streaming completes, components render, tags collected
      const body = await responseToCache.arrayBuffer();

      // Now tags are complete
      const contextTags = getTags();

      const cacheHeaders = new Headers(responseToCache.headers);

      if (!cacheHeaders.has("Cache-Control")) {
        cacheHeaders.set(
          "Cache-Control",
          "public, max-age=0, s-maxage=31536000"
        );
      }

      // Merge Cache-Tag from response header + collected tags
      const responseTags = cacheHeaders.get("Cache-Tag");
      const allTags = new Set<string>(contextTags ?? []);

      if (responseTags) {
        for (const tag of responseTags.split(",")) {
          allTags.add(tag.trim());
        }
      }

      if (allTags.size) {
        cacheHeaders.set("Cache-Tag", [...allTags].join(","));
      }

      const finalResponse = new Response(body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: cacheHeaders,
      });

      await cache.put(context.request, finalResponse);
    });

  // Capture ALS store to re-enter context in waitUntil
  const contextStore = requestContext.getStore();

  if (contextStore) {
    if (ctx?.waitUntil) {
      ctx.waitUntil(cacheWork(contextStore));
    } else {
      await cacheWork(contextStore);
    }
  }

  return new Response(originalResponse.body, {
    status: originalResponse.status,
    statusText: originalResponse.statusText,
    headers,
  });
});

export const onRequest = sequence(
  contextMiddleware,
  countryCodeMiddleware,
  cachingMiddleware
);
