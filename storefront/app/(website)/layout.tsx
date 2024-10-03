import type {Metadata} from "next";

import {ExitPreview} from "@/components/exit-preview";
import {Cta, Link} from "@/components/shared/button";
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

export default function Layout({children}: {children: React.ReactNode}) {
  const example = "Add to cart";

  return (
    <body className="relative flex min-h-screen min-w-min-screen flex-col">
      <main className="flex-1">{children}</main>
      <div className="flex h-screen items-center justify-center gap-4">
        <div className="flex flex-col gap-4">
          <Link size="xl" variant="primary">
            {example}
          </Link>
          <Link disabled={true} href="/" size="xl" variant="primary">
            {example}
          </Link>
          <Cta disabled={true} size="xl" variant="primary">
            {example}
          </Cta>
          <Link href="/" loading={true} size="xl" variant="primary">
            {example}
          </Link>
          <Link href="/" size="lg" variant="primary">
            {example}
          </Link>
          <Cta size="md" variant="primary">
            {example}
          </Cta>
          <Cta size="sm" variant="primary">
            {example}
          </Cta>
        </div>
        <div className="flex flex-col gap-4">
          <Cta size="xl" variant="outline">
            {example}
          </Cta>
          <Cta disabled={true} size="xl" variant="outline">
            {example}
          </Cta>
          <Cta loading={true} size="xl" variant="outline">
            {example}
          </Cta>
          <Cta size="lg" variant="outline">
            {example}
          </Cta>
          <Cta size="md" variant="outline">
            {example}
          </Cta>
          <Cta size="sm" variant="outline">
            {example}
          </Cta>
        </div>
      </div>
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
