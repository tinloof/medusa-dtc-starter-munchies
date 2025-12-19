import { defineEnableDraftMode } from "next-sanity/draft-mode";
import config from "@/config";
import { client } from "@/data/sanity/client";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: config.sanity.token }),
});
