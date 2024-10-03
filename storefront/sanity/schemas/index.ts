import modularPage from "./documents/modular-page";
import {ogImage} from "./objects/og-image";
import {lightPtBody, ptBody} from "./objects/pt-body";
import {sectionsBody} from "./objects/sections-body";
import {seo} from "./objects/seo";
import sections from "./sections";
import home from "./singletons/home";
import {settings} from "./singletons/settings";

const schemas = [
  modularPage,
  seo,
  ogImage,
  settings,
  home,
  ptBody,
  lightPtBody,
  ...sections,
  sectionsBody,
];

export default schemas;
