import { defineMiddleware, sequence } from "astro:middleware";
import config from "./config";
import { requestContext } from "./lib/context";

const contextMiddleware = defineMiddleware((context, next) => {
  const ctx = context.locals.runtime?.ctx;
  const { cookies } = context;
  return requestContext.run({ ctx, cookies }, next);
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
  "/cms",
];

function isExcludedPath(pathname: string): boolean {
  return excludedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
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

  // HIT
  if (cachedResponse) {
    // Return cached response with HIT header
    const headers = new Headers(cachedResponse.headers);
    headers.set("X-Cache", "HIT");
    return new Response(cachedResponse.body, {
      status: cachedResponse.status,
      statusText: cachedResponse.statusText,
      headers,
    });
  }

  // Cache miss - render the page
  const originalResponse = await next();

  const cacheControl = originalResponse.headers.get("Cache-Control");
  if (cacheControl?.includes("private") || cacheControl?.includes("no-store")) {
    return originalResponse;
  }

  // Only cache successful responses
  if (originalResponse.status < 200 || originalResponse.status >= 300) {
    return originalResponse;
  }

  // Build headers for cached response
  const headers = new Headers(originalResponse.headers);

  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=0, s-maxage=31536000");
  }

  // Read body once, use for both cache and response
  const body = await originalResponse.arrayBuffer();

  // Create response to cache (without X-Cache header)
  const responseToCache = new Response(body, {
    status: originalResponse.status,
    statusText: originalResponse.statusText,
    headers,
  });

  // Store in cache (non-blocking via waitUntil)
  const ctx = context.locals.runtime?.ctx;

  if (ctx?.waitUntil) {
    ctx.waitUntil(cache.put(context.request, responseToCache.clone()));
  } else {
    await cache.put(context.request, responseToCache.clone());
  }

  // Return response with MISS header
  headers.set("X-Cache", "MISS");
  return new Response(body, {
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
