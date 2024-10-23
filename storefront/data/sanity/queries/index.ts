import {defineQuery, groq} from "next-sanity";

import {SECTIONS_BODY_FRAGMENT} from "./section";

export const MODULAR_PAGE_QUERY = groq`*[pathname.current == $pathname && _type == "modular.page"][0]{
  ...,
  sections[] ${SECTIONS_BODY_FRAGMENT},
}`;

export const HOME_QUERY = groq`*[_type == "home"][0]{
  ...,
  sections[] ${SECTIONS_BODY_FRAGMENT},
}`;

export const NOT_FOUND_PAGE_QUERY = groq`*[_type == "not.found" && pathname.current == '/not-found'][0]`;
export const COOKIE_BANNER_QUERY = groq`*[_type == "cookie.banner"][0]`;
export const GLOBAL_QUERY = groq`{
  "fallbackOGImage": *[_type == "settings"][0].fallbackOgImage,
  "footer": *[_id == "footer" && _type == "footer"][0],
  "header": *[_id == "header" && _type == "header"][0],
}`;

export const ROUTE_QUERY = defineQuery(`
  *[pathname.current == $pathname][0] {
    'routeData': {
      ...,
      'pathname': pathname.current,
    },
  }
`);

export const SITEMAP_QUERY = groq`
  *[
    (pathname.current != null && indexable)
  ] {
    pathname,
    "lastModified": _updatedAt,
  }
`;

export const REDIRECT_QUERY = groq`*[_type == "settings"][0].redirects[@.source in $paths][0]`;

export const TEXT_PAGE_QUERY = groq`*[_type == "text.page" && pathname.current == $pathname][0]`;

export const FAQS_PAGE_QUERY = groq`*[_type == "faq.index"][0]{
  ...,
  category[]-> {
    ...,
      questions[]-> {
        ...,
      }
    }
}`;

export const DICTIONARY_QUERY = groq`*[_type == "dictionary"][0]`;

export const PRODUCT_QUERY = groq`*[_type == "product" && pathname.current == ("/products/" + $handle)][0]{
  ...,
  sections[] ${SECTIONS_BODY_FRAGMENT},
}`;
