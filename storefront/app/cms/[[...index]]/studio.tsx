"use client";

import config from "@/sanity.config";
import {NextStudio} from "next-sanity/studio";

export function Studio() {
  return <NextStudio config={config} />;
}
