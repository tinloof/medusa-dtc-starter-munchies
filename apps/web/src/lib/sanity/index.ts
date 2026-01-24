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
import { getClient } from "./client";

const client = getClient();

// Loader for routes
export function loadRoute(pathname: string) {
  return client.fetch<ROUTE_QUERY_RESULT>(ROUTE_QUERY, { pathname });
}

export function loadModularPage(pathname: string) {
  return client.fetch<MODULAR_PAGE_QUERY_RESULT>(MODULAR_PAGE_QUERY, {
    pathname,
  });
}

export function loadHome() {
  return client.fetch<HOME_QUERY_RESULT>(HOME_QUERY);
}

export function loadGlobalData() {
  return client.fetch<GLOBAL_QUERY_RESULT>(GLOBAL_QUERY);
}

export async function loadPageByPathname(pathname: string) {
  const data = await loadRoute(pathname);
  const documentType = data?.routeData._type;

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
  return client.fetch<NOT_FOUND_PAGE_QUERY_RESULT>(NOT_FOUND_PAGE_QUERY);
}

export function loadTextPage(pathname: string) {
  return client.fetch<TEXT_PAGE_QUERY_RESULT>(TEXT_PAGE_QUERY, { pathname });
}

export function loadFaqs() {
  return client.fetch<FAQS_PAGE_QUERY_RESULT>(FAQS_PAGE_QUERY);
}

export function loadDictionary() {
  return client.fetch<DICTIONARY_QUERY_RESULT>(DICTIONARY_QUERY);
}

export function loadProductContent(handle: string) {
  return client.fetch<PRODUCT_QUERY_RESULT>(PRODUCT_QUERY, { handle });
}
