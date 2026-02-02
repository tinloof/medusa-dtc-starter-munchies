import { defineMiddleware, sequence } from "astro:middleware";
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
    return await next();
  }

  const cache = caches.default;
  const cachedResponse = await cache.match(context.request);

  // HIT - return immediately
  if (cachedResponse) {
    const headers = new Headers(cachedResponse.headers);
    headers.set("X-Cache", "HIT");
    return new Response(cachedResponse.body, {
      status: cachedResponse.status,
      statusText: cachedResponse.statusText,
      headers,
    });
  }

  // MISS - render and return immediately, cache in background
  const originalResponse = await next();

  // Clone before returning so we can cache it
  const responseToCache = originalResponse.clone();

  // Capture tags NOW while still in AsyncLocalStorage context
  const contextTags = getTags();

  // Add X-Cache header to original response
  const responseHeaders = new Headers(originalResponse.headers);
  responseHeaders.set("X-Cache", "MISS");

  const response = new Response(originalResponse.body, {
    status: originalResponse.status,
    statusText: originalResponse.statusText,
    headers: responseHeaders,
  });

  // Defer all caching logic to waitUntil
  const cacheWork = async () => {
    const cacheControl = responseToCache.headers.get("Cache-Control");
    if (
      cacheControl?.includes("private") ||
      cacheControl?.includes("no-store")
    ) {
      return;
    }

    // Only cache successful responses
    if (responseToCache.status < 200 || responseToCache.status >= 300) {
      return;
    }

    const headers = new Headers(responseToCache.headers);

    if (!headers.has("Cache-Control")) {
      headers.set("Cache-Control", "public, max-age=0, s-maxage=31536000");
    }

    // Merge Cache-Tag from response header + collected tags (captured earlier)
    const responseTags = headers.get("Cache-Tag");
    const allTags = new Set<string>(contextTags ?? []);

    if (responseTags) {
      for (const tag of responseTags.split(",")) {
        allTags.add(tag.trim());
      }
    }

    if (allTags.size) {
      headers.set("Cache-Tag", [...allTags].join(","));
    }

    const body = await responseToCache.arrayBuffer();
    const finalResponse = new Response(body, {
      status: responseToCache.status,
      statusText: responseToCache.statusText,
      headers,
    });

    await cache.put(context.request, finalResponse);
  };

  if (ctx?.waitUntil) {
    ctx.waitUntil(cacheWork());
  } else {
    await cacheWork();
  }

  return response;
});

export const onRequest = sequence(
  contextMiddleware,
  countryCodeMiddleware,
  cachingMiddleware
);
