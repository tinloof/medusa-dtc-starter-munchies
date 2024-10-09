import type {Metadata} from "next";

import {ExitPreview} from "@/components/exit-preview";
import CoockieBanner from "@/components/global/cookie-banner/cookie";
import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import {TailwindIndicator} from "@/components/tailwind-indicator";
import config from "@/config";
import {loadGlobalData} from "@/data/sanity";
import {getOgImages} from "@/data/sanity/resolve-sanity-route-metadata";
import {revalidatePath, revalidateTag} from "next/cache";
import {draftMode} from "next/headers";
import {VisualEditing} from "next-sanity";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadGlobalData();

  return {
    openGraph: {
      images: !data?.fallbackOGImage
        ? undefined
        : getOgImages(data.fallbackOGImage),
      title: config.siteName,
    },
    title: config.siteName,
  };
}

export default async function Layout({children}: {children: React.ReactNode}) {
  const data = await loadGlobalData();

  return (
    <body className="relative flex min-h-screen min-w-min-screen flex-col">
      {data.header && <Header {...data.header} />}
      <main className="flex-1">{children}</main>
      {data.footer && <Footer {...data.footer} />}
      <CoockieBanner />
      {draftMode().isEnabled && (
        <VisualEditing
          refresh={async (payload) => {
            "use server";
            if (!draftMode().isEnabled) {
              console.debug(
                "Skipped manual refresh because draft mode is not enabled",
              );
              return;
            }
            if (payload.source === "mutation") {
              if (payload.document.slug?.current) {
                const tag = `${payload.document._type}:${payload.document.slug.current}`;
                console.log("Revalidate slug", tag);
                await revalidateTag(tag);
              }
              console.log("Revalidate tag", payload.document._type);
              return revalidateTag(payload.document._type);
            }
            await revalidatePath("/", "layout");
          }}
        />
      )}
      <TailwindIndicator />
      <ExitPreview enable={draftMode().isEnabled} />
    </body>
  );
}
