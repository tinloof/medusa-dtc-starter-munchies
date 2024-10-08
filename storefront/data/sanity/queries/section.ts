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

export const SHOP_THE_LOOK_SECTION_QUERY = /* groq */ `{
    ...,
  productHotSpots[]
}`;

export const COLLECTION_LIST_SECTION_QUERY = /* groq */ `{
    ...,
    "cards": cards[] {
        _key,
        ...(@-> {
            _type,
            ...,
        })
    }
}`;

export const SECTIONS_BODY_FRAGMENT = groq`{
    ...,
    _type == "section.hero" => ${HERO_SECTION_QUERY},
    _type == "section.shopTheLook" => ${SHOP_THE_LOOK_SECTION_QUERY},
    _type == "section.collectionList" => ${COLLECTION_LIST_SECTION_QUERY},
}`;
