import type {
  BLOG_INDEX_QUERYResult,
  BLOG_POST_QUERYResult,
  GLOBAL_QUERYResult,
  HOME_QUERYResult,
  MODULAR_PAGE_QUERYResult,
  REDIRECT_QUERYResult,
} from "@/types/sanity.generated";

import {loadQuery, loadRoute} from "./loadQuery";
import {
  BLOG_INDEX_QUERY,
  BLOG_POST_QUERY,
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

export async function loadBlogIndex({
  entriesPerPage = 6,
  infiniteLoading = false,
  pageNumber = 1,
  sortBy = "_createdAt",
  sortOrder = "desc",
  tag,
}: {
  entriesPerPage?: number;
  infiniteLoading?: boolean;
  pageNumber?: number;
  sortBy?: string;
  sortOrder?: string;
  tag?: string;
}) {
  const pageStart = infiniteLoading ? 0 : entriesPerPage * (pageNumber - 1);
  const pageEnd = entriesPerPage * pageNumber;

  return loadQuery<BLOG_INDEX_QUERYResult>({
    params: {
      entriesPerPage,
      filterTag: tag ?? null,
      pageEnd,
      pageNumber,
      pageStart,
      sortBy,
      sortOrder,
    },
    query: BLOG_INDEX_QUERY,
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
    case "blog.post":
      return loadBlogPost(pathname);

    default:
      console.warn("Invalid document type:", documentType);
      return null;
  }
}

export function loadBlogPost(pathname: string) {
  return loadQuery<BLOG_POST_QUERYResult>({
    params: {pathname},
    query: BLOG_POST_QUERY,
  });
}

export function loadRedirects(paths: string[]) {
  return loadQuery<REDIRECT_QUERYResult>({
    params: {paths},
    query: REDIRECT_QUERY,
  });
}
