import type {Metadata} from "next";

import {ExitPreview} from "@/components/ExitPreview";
import {TailwindIndicator} from "@/components/TailwindIndicator";
import config from "@/config";
import {loadGlobalData} from "@/data/sanity";
import {getOgImages} from "@/data/sanity/resolveSanityRouteMetadata";
import {revalidatePath, revalidateTag} from "next/cache";
import {draftMode} from "next/headers";
import {VisualEditing} from "next-sanity";

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
  return (
    <>
      <main>{children}</main>
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
    </>
  );
}
