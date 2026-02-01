import { defineMiddleware, sequence } from "astro:middleware";
import config from "./config";
import { requestContext } from "./lib/context";

const log = (label: string, data: Record<string, unknown>) => {
  console.log(`[MW:${label}]`, JSON.stringify(data, null, 2));
};

const contextMiddleware = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  log("context", { pathname, method: context.request.method });
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
  "/_server-islands",
  "/cms",
];

function isExcludedPath(pathname: string): boolean {
  const match = excludedPaths.find(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  log("isExcludedPath", {
    pathname,
    match: match ?? "none",
    excluded: !!match,
  });
  return !!match;
}

const countryCodeMiddleware = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  log("countryCode:start", { pathname, method: context.request.method });

  // Skip static assets and excluded paths
  if (isExcludedPath(pathname)) {
    log("countryCode:skipped", { pathname, reason: "excluded" });
    return next();
  }

  // Extract first path segment
  const parts = pathname.split("/").filter(Boolean);
  const firstPart = parts[0]?.toLowerCase();
  log("countryCode:parsed", { pathname, parts, firstPart });

  // Redirect /us/... to /... (default country shouldn't appear in URL)
  if (firstPart === config.defaultCountryCode) {
    const restPath = `/${parts.slice(1).join("/")}`;
    log("countryCode:redirect", { from: pathname, to: restPath || "/" });
    return context.redirect(restPath || "/", 308);
  }

  // Check if path has a valid non-default country code
  const hasCountryCode =
    firstPart && config.supportedCountryCodes.includes(firstPart);

  // Store country code in locals for components
  const countryCode = hasCountryCode ? firstPart : config.defaultCountryCode;
  context.locals.countryCode = countryCode;
  context.locals.defaultCountryCode = config.defaultCountryCode;

  log("countryCode:set", { pathname, countryCode, hasCountryCode });
  return next();
});

const cachingMiddleware = defineMiddleware(async (context, next) => {
  const { request, url } = context;
  const { pathname } = url;

  log("caching:start", { pathname, method: request.method });

  // Skip caching for non-GET, API routes, CMS, static assets, and draft mode
  const isDraftMode = request.headers
    .get("cookie")
    ?.includes("sanity-draft-mode=true");

  if (isExcludedPath(pathname) || isDraftMode || request.method !== "GET") {
    log("caching:skipped", { pathname, isDraftMode, method: request.method });
    return next();
  }

  // Cache API not available (e.g., dev mode or workers.dev domain)
  if (typeof caches === "undefined") {
    log("caching:noCacheAPI", { pathname });
    return next();
  }

  const cache = caches.default;
  const cachedResponse = await cache.match(context.request);

  // HIT
  if (cachedResponse) {
    log("caching:HIT", { pathname, status: cachedResponse.status });
    // Return cached response with HIT header
    const headers = new Headers(cachedResponse.headers);
    headers.set("X-Cache", "HIT");
    return new Response(cachedResponse.body, {
      status: cachedResponse.status,
      statusText: cachedResponse.statusText,
      headers,
    });
  }

  log("caching:MISS", { pathname });
  // Cache miss - render the page
  const originalResponse = await next();

  log("caching:response", {
    pathname,
    status: originalResponse.status,
    cacheControl: originalResponse.headers.get("Cache-Control"),
  });

  const cacheControl = originalResponse.headers.get("Cache-Control");
  if (cacheControl?.includes("private") || cacheControl?.includes("no-store")) {
    log("caching:notCacheable", { pathname, cacheControl });
    return originalResponse;
  }

  // Only cache successful responses
  if (originalResponse.status < 200 || originalResponse.status >= 300) {
    log("caching:badStatus", { pathname, status: originalResponse.status });
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
  log("caching:stored", { pathname });
  return new Response(body, {
    status: originalResponse.status,
    statusText: originalResponse.statusText,
    headers,
  });
});

// Wrapper to catch errors
const errorLoggingMiddleware = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  try {
    const response = await next();
    log("final:response", { pathname, status: response.status });
    return response;
  } catch (err) {
    log("final:ERROR", {
      pathname,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
});

export const onRequest = sequence(
  errorLoggingMiddleware,
  contextMiddleware,
  countryCodeMiddleware,
  cachingMiddleware
);
