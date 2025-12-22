export const TESTIMONIALS_SECTION_QUERY = /* groq */ `{
    ...,
    testimonials[] ->
}`;

export const SECTIONS_BODY_FRAGMENT = `{
    ...,
    _type == "section.testimonials" => ${TESTIMONIALS_SECTION_QUERY},
}`;
