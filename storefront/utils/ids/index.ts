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
