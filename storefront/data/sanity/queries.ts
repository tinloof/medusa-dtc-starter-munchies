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

export const BLOG_POST_CARD_FRAGMENT = groq`{
  ...,
  pathname,
  title,
  featuredImage
}`;

export const BLOG_INDEX_QUERY = groq`*[_type == "blogIndex"][0] {
  ...,
  pathname,
  "blogTags": *[_type == "blog.tag" && count(*[_type == "blog.post" && defined(tags[]) && ^._id in tags[]._ref]) > 0] {
    ...,
  },
  "entries": *[_type == "blog.post"
    && (($filterTag != null && defined(tags[]) && count(tags[@->slug.current in [$filterTag]]) > 0)
    || $filterTag == null)]
    | order(_createdAt asc) [$pageStart...$pageEnd] ${BLOG_POST_CARD_FRAGMENT},
  "featuredPosts": featuredPosts[] -> ${BLOG_POST_CARD_FRAGMENT},
  "entriesCount": count(*[_type == "blog.post"
    && (($filterTag != null && defined(tags[]) && count(tags[@->slug.current in [$filterTag]]) > 0)
    || $filterTag == null)
  ]),
  "entriesPerPage": $entriesPerPage,
  "pageNum": $pageNumber,
}`;

export const BLOG_POST_QUERY = groq`
  *[_type in ["blog.post"] && pathname.current == $pathname][0] {
    ...,
    body[]{
      ...,
      _type == "imageBlock" => {
        ...,
        image
      }
    }
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
