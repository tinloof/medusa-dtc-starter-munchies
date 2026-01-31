import type { AstroCookies } from "astro";
import type {
  DICTIONARY_QUERY_RESULT,
  FAQS_PAGE_QUERY_RESULT,
  GLOBAL_QUERY_RESULT,
  HOME_QUERY_RESULT,
  MODULAR_PAGE_QUERY_RESULT,
  NOT_FOUND_PAGE_QUERY_RESULT,
  PRODUCT_QUERY_RESULT,
  ROUTE_QUERY_RESULT,
  TEXT_PAGE_QUERY_RESULT,
} from "sanity.types";
import {
  DICTIONARY_QUERY,
  FAQS_PAGE_QUERY,
  GLOBAL_QUERY,
  HOME_QUERY,
  MODULAR_PAGE_QUERY,
  NOT_FOUND_PAGE_QUERY,
  PRODUCT_QUERY,
  ROUTE_QUERY,
  TEXT_PAGE_QUERY,
} from "@/sanity/queries";
import { sanityFetch } from "./sanity-fetch";

// Loader for routes
export function loadRoute(pathname: string, cookies?: AstroCookies) {
  return sanityFetch<ROUTE_QUERY_RESULT>({
    query: ROUTE_QUERY,
    params: { pathname },
    cookies,
  });
}

export function loadModularPage(pathname: string, cookies?: AstroCookies) {
  return sanityFetch<MODULAR_PAGE_QUERY_RESULT>({
    query: MODULAR_PAGE_QUERY,
    params: {
      pathname,
    },
    cookies,
  });
}

export function loadHome(cookies?: AstroCookies) {
  return sanityFetch<HOME_QUERY_RESULT>({ query: HOME_QUERY, cookies });
}

export function loadGlobalData(cookies?: AstroCookies) {
  return sanityFetch<GLOBAL_QUERY_RESULT>({ query: GLOBAL_QUERY, cookies });
}

export async function loadPageByPathname(
  pathname: string,
  cookies?: AstroCookies
) {
  const { result } = await loadRoute(pathname, cookies);
  const documentType = result?.routeData._type;

  switch (documentType) {
    case "home":
      return loadHome(cookies);
    case "modular.page":
      return loadModularPage(pathname, cookies);
    case "text.page":
      return loadTextPage(pathname, cookies);
    default:
      console.warn("Invalid document type:", documentType);
      return null;
  }
}

export function loadNotFound(cookies?: AstroCookies) {
  return sanityFetch<NOT_FOUND_PAGE_QUERY_RESULT>({
    query: NOT_FOUND_PAGE_QUERY,
    cookies,
  });
}

export function loadTextPage(pathname: string, cookies?: AstroCookies) {
  return sanityFetch<TEXT_PAGE_QUERY_RESULT>({
    query: TEXT_PAGE_QUERY,
    params: { pathname },
    cookies,
  });
}

export function loadFaqs(cookies?: AstroCookies) {
  return sanityFetch<FAQS_PAGE_QUERY_RESULT>({
    query: FAQS_PAGE_QUERY,
    cookies,
  });
}

export function loadDictionary(cookies?: AstroCookies) {
  return sanityFetch<DICTIONARY_QUERY_RESULT>({
    query: DICTIONARY_QUERY,
    cookies,
  });
}

export function loadProductContent(handle: string, cookies?: AstroCookies) {
  return sanityFetch<PRODUCT_QUERY_RESULT>({
    query: PRODUCT_QUERY,
    params: { handle },
    cookies,
  });
}
