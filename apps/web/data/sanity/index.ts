import {
  COOKIE_BANNER_QUERY,
  DICTIONARY_QUERY,
  FAQS_PAGE_QUERY,
  GLOBAL_QUERY,
  HOME_QUERY,
  MODULAR_PAGE_QUERY,
  NOT_FOUND_PAGE_QUERY,
  PRODUCT_QUERY,
  REDIRECT_QUERY,
  ROUTE_QUERY,
  TEXT_PAGE_QUERY,
} from "@packages/sanity/queries";
import type {
  COOKIE_BANNER_QUERYResult,
  DICTIONARY_QUERYResult,
  FAQS_PAGE_QUERYResult,
  GLOBAL_QUERYResult,
  HOME_QUERYResult,
  MODULAR_PAGE_QUERYResult,
  NOT_FOUND_PAGE_QUERYResult,
  PRODUCT_QUERYResult,
  REDIRECT_QUERYResult,
  ROUTE_QUERYResult,
  TEXT_PAGE_QUERYResult,
} from "@packages/sanity/types";

import { sanityFetch } from "./sanity-fetch";

// Loader for routes
export function loadRoute(pathname: string) {
  return sanityFetch<ROUTE_QUERYResult>({
    params: { pathname },
    query: ROUTE_QUERY,
  });
}

export function loadModularPage(pathname: string) {
  return sanityFetch<MODULAR_PAGE_QUERYResult>({
    params: { pathname },
    query: MODULAR_PAGE_QUERY,
  });
}

export function loadHome() {
  return sanityFetch<HOME_QUERYResult>({
    query: HOME_QUERY,
  });
}

export function loadGlobalData() {
  return sanityFetch<GLOBAL_QUERYResult>({
    query: GLOBAL_QUERY,
  });
}

export async function loadPageByPathname({
  params: { path },
}: {
  params: { path?: string[] };
}) {
  let pathname: string;
  if (Array.isArray(path) && path.length > 0) {
    pathname = `/${path.join("/")}`;
  } else if (path) {
    pathname = `/${path}`;
  } else {
    pathname = "/";
  }
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

export function loadRedirects(paths: string[]) {
  return sanityFetch<REDIRECT_QUERYResult>({
    params: { paths },
    query: REDIRECT_QUERY,
  });
}

export function loadNotFound() {
  return sanityFetch<NOT_FOUND_PAGE_QUERYResult>({
    query: NOT_FOUND_PAGE_QUERY,
  });
}

export function loadCookieBanner() {
  return sanityFetch<COOKIE_BANNER_QUERYResult>({
    query: COOKIE_BANNER_QUERY,
  });
}

export function loadTextPage(pathname: string) {
  return sanityFetch<TEXT_PAGE_QUERYResult>({
    params: { pathname },
    query: TEXT_PAGE_QUERY,
  });
}

export function loadFaqs() {
  return sanityFetch<FAQS_PAGE_QUERYResult>({
    query: FAQS_PAGE_QUERY,
  });
}

export function loadDictionary() {
  return sanityFetch<DICTIONARY_QUERYResult>({
    query: DICTIONARY_QUERY,
  });
}

export function loadProductContent(handle: string) {
  return sanityFetch<PRODUCT_QUERYResult>({
    params: { handle },
    query: PRODUCT_QUERY,
  });
}
