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
} from "@packages/sanity/queries";
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
} from "@packages/sanity/types";
import { sanityFetch } from "./client";

// Loader for routes
export function loadRoute(pathname: string) {
  return sanityFetch<ROUTE_QUERY_RESULT>({
    query: ROUTE_QUERY,
    params: { pathname },
  });
}

export function loadModularPage(pathname: string) {
  return sanityFetch<MODULAR_PAGE_QUERY_RESULT>({
    query: MODULAR_PAGE_QUERY,
    params: {
      pathname,
    },
  });
}

export function loadHome() {
  return sanityFetch<HOME_QUERY_RESULT>({ query: HOME_QUERY });
}

export function loadGlobalData() {
  return sanityFetch<GLOBAL_QUERY_RESULT>({ query: GLOBAL_QUERY });
}

export async function loadPageByPathname(pathname: string) {
  const { result } = await loadRoute(pathname);
  const documentType = result?.routeData._type;

  switch (documentType) {
    case "home":
      return loadHome();
    case "modular.page":
      return loadModularPage(pathname);
    case "text.page":
      return loadTextPage(pathname);
    default:
      console.warn("Invalid document type:", documentType);
      return null;
  }
}

export function loadNotFound() {
  return sanityFetch<NOT_FOUND_PAGE_QUERY_RESULT>({
    query: NOT_FOUND_PAGE_QUERY,
  });
}

export function loadTextPage(pathname: string) {
  return sanityFetch<TEXT_PAGE_QUERY_RESULT>({
    query: TEXT_PAGE_QUERY,
    params: { pathname },
  });
}

export function loadFaqs() {
  return sanityFetch<FAQS_PAGE_QUERY_RESULT>({ query: FAQS_PAGE_QUERY });
}

export function loadDictionary() {
  return sanityFetch<DICTIONARY_QUERY_RESULT>({ query: DICTIONARY_QUERY });
}

export function loadProductContent(handle: string) {
  return sanityFetch<PRODUCT_QUERY_RESULT>({
    query: PRODUCT_QUERY,
    params: { handle },
  });
}
