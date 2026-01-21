import { defineMiddleware } from "astro:middleware";
import config from "./config";

// Paths that should not have country code prefix
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

function extractCountryCode(pathname: string): {
  countryCode: string;
  restPath: string;
} {
  // Skip excluded paths
  if (isExcludedPath(pathname)) {
    return { countryCode: config.defaultCountryCode, restPath: pathname };
  }

  const parts = pathname.split("/").filter(Boolean);
  const firstPart = parts[0]?.toLowerCase();

  // Check if first part is a valid country code
  if (firstPart && config.supportedCountryCodes.includes(firstPart)) {
    const restPath = "/" + parts.slice(1).join("/");
    return { countryCode: firstPart, restPath: restPath || "/" };
  }

  // No country code in URL, use default
  return { countryCode: config.defaultCountryCode, restPath: pathname };
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Skip static assets and excluded paths
  if (isExcludedPath(pathname)) {
    return next();
  }

  const { countryCode, restPath } = extractCountryCode(pathname);

  // Store country code in locals for components to access
  context.locals.countryCode = countryCode;
  context.locals.restPath = restPath;

  // If URL has no country code and we're using default, rewrite internally
  // This allows `/products` to work as `/us/products` internally
  const firstPart = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  const hasCountryCode = config.supportedCountryCodes.includes(firstPart || "");

  if (!hasCountryCode && countryCode === config.defaultCountryCode) {
    // For default country, we don't redirect - just serve the content
    // The route will handle it via [...path] catch-all
    context.locals.isDefaultCountry = true;
  } else {
    context.locals.isDefaultCountry = countryCode === config.defaultCountryCode;
  }

  return next();
});
