import {groq} from "next-sanity";

export const HERO_SECTION_QUERY = /* groq */ `{
    ...,
    video {
        asset->{
           "resolution": data.max_stored_resolution,
           playbackId,
        }
    }
}`;

export const FEATURED_PRODUCTS_SECTION_QUERY = /* groq */ `{
    ...,
    products[]->{
        ...,
    }
}`;
export const SECTIONS_BODY_FRAGMENT = groq`{
    ...,
    _type == "section.hero" => ${HERO_SECTION_QUERY},
    _type == "section.featuredProducts" => ${FEATURED_PRODUCTS_SECTION_QUERY},
}`;
