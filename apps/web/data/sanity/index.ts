import {
  COOKIE_BANNER_QUERY,
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

import { sanityFetch } from "./client";

// Loader for routes
export function loadRoute(pathname: string) {
  return sanityFetch({
    params: { pathname },
    query: ROUTE_QUERY,
  });
}

export function loadModularPage(pathname: string) {
  return sanityFetch({
    params: { pathname },
    query: MODULAR_PAGE_QUERY,
  });
}

export function loadHome() {
  return sanityFetch({
    query: HOME_QUERY,
  });
}

export function loadGlobalData() {
  return sanityFetch({
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
  const { data } = await loadRoute(pathname);
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
  return sanityFetch({
    query: NOT_FOUND_PAGE_QUERY,
  });
}

export function loadCookieBanner() {
  return sanityFetch({
    query: COOKIE_BANNER_QUERY,
  });
}

export function loadTextPage(pathname: string) {
  return sanityFetch({
    params: { pathname },
    query: TEXT_PAGE_QUERY,
  });
}

export function loadFaqs() {
  return sanityFetch({
    query: FAQS_PAGE_QUERY,
  });
}

export function loadDictionary() {
  return sanityFetch({
    query: DICTIONARY_QUERY,
  });
}

export function loadProductContent(handle: string) {
  return sanityFetch({
    params: { handle },
    query: PRODUCT_QUERY,
  });
}
