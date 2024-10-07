import type {SectionList} from "./types";

import CenteredText from "./centered-text";
import Hero from "./hero";
import Marquee from "./marquee";
import MediaText from "./media-text";

export const sectionsList: SectionList = {
  "section.centeredText": CenteredText,
  "section.hero": Hero,
  "section.marquee": Marquee,
  "section.mediaText": MediaText,
};
