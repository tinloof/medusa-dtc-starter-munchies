import category from "./documents/category";
import collection from "./documents/collection";
import {faqCategory} from "./documents/faq-category";
import {faqEntry} from "./documents/faq-entry";
import modularPage from "./documents/modular-page";
import product from "./documents/product";
import testimonial from "./documents/testimonial";
import {textPage} from "./documents/text-page";
import {cta} from "./objects/cta";
import {link} from "./objects/link";
import {ogImage} from "./objects/og-image";
import {lightPtBody, ptBody} from "./objects/pt-body";
import {sectionsBody} from "./objects/sections-body";
import {seo} from "./objects/seo";
import spot from "./objects/spot";
import video from "./objects/video";
import sections from "./sections";
import {cookieBanner} from "./singletons/cookie-banner";
import {dictionary} from "./singletons/dictionary";
import {faqIndex} from "./singletons/faq";
import footer from "./singletons/footer";
import header from "./singletons/header";
import home from "./singletons/home";
import {notFound} from "./singletons/not-found";
import {settings} from "./singletons/settings";

const schemas = [
  modularPage,
  seo,
  ogImage,
  cta,
  link,
  spot,
  video,
  settings,
  home,
  ptBody,
  lightPtBody,
  footer,
  notFound,
  header,
  ...sections,
  testimonial,
  sectionsBody,
  product,
  collection,
  category,
  cookieBanner,
  dictionary,
  textPage,
  faqIndex,
  faqEntry,
  faqCategory,
];

export default schemas;
