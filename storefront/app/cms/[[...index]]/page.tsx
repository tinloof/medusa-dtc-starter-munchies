import type {Metadata} from "next";

import config from "@/config";

import {Studio} from "./Studio";

export const metadata: Metadata = {
  title: `${config.siteName} - CMS`,
};

export default function StudioPage() {
  return (
    <body>
      <Studio />
    </body>
  );
}
