import type {Metadata} from "next";

import config from "@/config";

import {Studio} from "./studio";

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
