import config from "@/config";
import {client} from "@/data/sanity/client";
import {defineEnableDraftMode} from "next-sanity/draft-mode";

export const {GET} = defineEnableDraftMode({
  client: client.withConfig({token: config.sanity.token}),
});
