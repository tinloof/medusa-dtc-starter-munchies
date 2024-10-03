import {groq} from "next-sanity";

export const MODULAR_PAGE_QUERY = groq`*[pathname.current == $pathname && _type == "modular.page"][0]`;

export const HOME_QUERY = groq`*[_type == "home"][0]`;

export const GLOBAL_QUERY = groq`{
  "fallbackOGImage": *[_type == "settings"][0].fallbackOgImage,
}`;

export const ROUTE_QUERY = groq`
  *[pathname.current == $pathname][0] {
    'routeData': {
      ...,
      'pathname': pathname.current,
    },
  }
`;

export const SITEMAP_QUERY = groq`
  *[
    (pathname.current != null && indexable)
  ] {
    pathname,
    "lastModified": _updatedAt,
  }
`;

export const REDIRECT_QUERY = groq`*[_type == "settings"][0].redirects[@.source in $paths][0]`;
