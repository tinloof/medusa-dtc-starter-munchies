import { defineQuery } from "next-sanity";

import { SECTIONS_BODY_FRAGMENT } from "./section";

export const MODULAR_PAGE_QUERY =
  defineQuery(`*[pathname.current == $pathname && _type == "modular.page"][0]{
  ...,
  sections[] ${SECTIONS_BODY_FRAGMENT},
}`);

export const HOME_QUERY = defineQuery(`*[_type == "home"][0]{
  ...,
  sections[] ${SECTIONS_BODY_FRAGMENT},
}`);

export const NOT_FOUND_PAGE_QUERY = defineQuery(
  `*[_type == "not.found" && pathname.current == '/not-found'][0]`
);
export const COOKIE_BANNER_QUERY = defineQuery(
  `*[_type == "cookie.banner"][0]`
);
export const GLOBAL_QUERY = defineQuery(`{
  "fallbackOGImage": *[_type == "settings"][0].fallbackOgImage,
  "footer": *[_id == "footer" && _type == "footer"][0],
  "header": *[_id == "header" && _type == "header"][0],
}`);

export const ROUTE_QUERY = defineQuery(`
  *[pathname.current == $pathname][0] {
    'routeData': {
      ...,
      'pathname': pathname.current,
    },
  }
`);

export const SITEMAP_QUERY = defineQuery(`
  *[
    (pathname.current != null && indexable)
  ] {
    pathname,
    "lastModified": _updatedAt,
  }
`);

export const TEXT_PAGE_QUERY = defineQuery(
  `*[_type == "text.page" && pathname.current == $pathname][0]`
);

export const FAQS_PAGE_QUERY = defineQuery(`*[_type == "faq.index"][0]{
  ...,
  category[]-> {
    ...,
      questions[]-> {
        ...,
      }
    }
}`);

export const DICTIONARY_QUERY = defineQuery(`*[_type == "dictionary"][0]`);

export const PRODUCT_QUERY =
  defineQuery(`*[_type == "product" && pathname.current == ("/products/" + $handle)][0]{
  ...,
  sections[] ${SECTIONS_BODY_FRAGMENT},
}`);
