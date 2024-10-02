import {blogPost} from "./documents/blogPost";
import {blogTag} from "./documents/blogTag";
import modularPage from "./documents/modularPage";
import {ogImage} from "./objects/ogImage";
import {lightPtBody, ptBody} from "./objects/ptBody";
import {sectionsBody} from "./objects/sectionsBody";
import {seo} from "./objects/seo";
import sections from "./sections";
import {blogIndex} from "./singletons/blogIndex";
import home from "./singletons/home";
import {settings} from "./singletons/settings";

const schemas = [
  modularPage,
  seo,
  ogImage,
  settings,
  home,
  blogIndex,
  blogPost,
  blogTag,
  ptBody,
  lightPtBody,
  ...sections,
  sectionsBody,
];

export default schemas;
