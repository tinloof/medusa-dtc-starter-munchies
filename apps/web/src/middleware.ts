import { defineMiddleware } from "astro:middleware";
import config from "./config";

// Paths that should be excluded from country code handling
const excludedPaths = [
  "/api",
  "/images",
  "/icons",
  "/favicon.ico",
  "/favicon-inactive.ico",
  "/_astro",
  "/_image",
];

function isExcludedPath(pathname: string): boolean {
  return excludedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
}

export const onRequest = defineMiddleware(async (context, next) => {
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
    const restPath = "/" + parts.slice(1).join("/");
    return context.redirect(restPath || "/", 308);
  }

  // Check if path has a valid non-default country code
  const hasCountryCode = firstPart && config.supportedCountryCodes.includes(firstPart);

  // Store country code in locals for components
  const countryCode = hasCountryCode ? firstPart : config.defaultCountryCode;
  context.locals.countryCode = countryCode;
  context.locals.restPath = hasCountryCode ? "/" + parts.slice(1).join("/") : pathname;
  context.locals.isDefaultCountry = countryCode === config.defaultCountryCode;

  return next();
});
