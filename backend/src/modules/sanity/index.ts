import { Module } from "@medusajs/framework/utils";
import SanityModuleService from "./service";

export const SANITY_MODULE = "sanity";

export default Module(SANITY_MODULE, {
  service: SanityModuleService,
});
