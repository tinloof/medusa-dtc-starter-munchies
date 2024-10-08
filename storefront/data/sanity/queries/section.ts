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

export const TESTIMONIALS_SECTION_QUERY = groq`{
    ...,
    testimonials[] -> 
}`;

export const SECTIONS_BODY_FRAGMENT = groq`{
    ...,
    _type == "section.hero" => ${HERO_SECTION_QUERY},
    _type == "section.testimonials" => ${TESTIMONIALS_SECTION_QUERY},
}`;
