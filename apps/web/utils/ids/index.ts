import type {PortableTextBlock} from "@portabletext/react";

import {toPlainText} from "@portabletext/react";
import {slugify} from "@tinloof/sanity-web";

import {truncate} from "../string";

export interface DeepLinkData {
  /**
   * _key of the target deep-linked block
   */
  blockKey?: string;
  /**
   * name of the schema field that contains this block
   */
  fieldName?: string;
  parentDocumentId?: string;
}

export function getDeepLinkId(deepLink: DeepLinkData) {
  if (!deepLink?.blockKey || !deepLink?.fieldName) return;

  return `${deepLink.fieldName}__${deepLink.blockKey}`;
}

export const getPtComponentId = (blocks: PortableTextBlock) => {
  return truncate(slugify(toPlainText(blocks ?? [])), 200);
};
