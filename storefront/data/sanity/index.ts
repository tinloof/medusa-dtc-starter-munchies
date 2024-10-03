import type {
  GLOBAL_QUERYResult,
  HOME_QUERYResult,
  MODULAR_PAGE_QUERYResult,
  REDIRECT_QUERYResult,
} from "@/types/sanity.generated";

import {loadQuery, loadRoute} from "./loadQuery";
import {
  GLOBAL_QUERY,
  HOME_QUERY,
  MODULAR_PAGE_QUERY,
  REDIRECT_QUERY,
} from "./queries";

export async function loadModularPage(pathname: string) {
  return loadQuery<MODULAR_PAGE_QUERYResult>({
    params: {pathname},
    query: MODULAR_PAGE_QUERY,
  });
}

export async function loadHome() {
  return loadQuery<HOME_QUERYResult>({
    query: HOME_QUERY,
  });
}

export function loadGlobalData() {
  return loadQuery<GLOBAL_QUERYResult>({
    query: GLOBAL_QUERY,
  });
}

export async function loadPageByPathname({
  params: {path},
}: {
  params: {path: string[]};
}) {
  let pathname: string;

  if (Array.isArray(path)) {
    pathname = "/" + path.join("/");
  } else {
    pathname = "/" + path;
  }

  const data = await loadRoute(pathname);
  const documentType = data?.routeData._type;

  switch (documentType) {
    case "modular.page":
      return loadModularPage(pathname);

    default:
      console.warn("Invalid document type:", documentType);
      return null;
  }
}

export function loadRedirects(paths: string[]) {
  return loadQuery<REDIRECT_QUERYResult>({
    params: {paths},
    query: REDIRECT_QUERY,
  });
}
