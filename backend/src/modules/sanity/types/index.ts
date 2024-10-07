import { SanityDocumentStub } from "@sanity/client";

export type ProductDocumentCreateDTO = SanityDocumentStub & {
  _id: string;
  handle: string;
};
