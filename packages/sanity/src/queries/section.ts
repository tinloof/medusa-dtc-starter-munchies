import {groq} from "next-sanity";

export const TESTIMONIALS_SECTION_QUERY = groq`{
    ...,
    testimonials[] -> 
}`;

export const SECTIONS_BODY_FRAGMENT = groq`{
    ...,
    _type == "section.testimonials" => ${TESTIMONIALS_SECTION_QUERY},
}`;
