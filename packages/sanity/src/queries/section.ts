import { defineQuery } from "next-sanity";

export const TESTIMONIALS_SECTION_QUERY = defineQuery(`{
    ...,
    testimonials[] -> 
}`);

export const SECTIONS_BODY_FRAGMENT = defineQuery(`{
    ...,
    _type == "section.testimonials" => ${TESTIMONIALS_SECTION_QUERY},
}`);
