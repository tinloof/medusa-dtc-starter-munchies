import type {PropsWithChildren} from "react";

import {ExitPreview} from "@/components/exit-preview";
import {TailwindIndicator} from "@/components/tailwind-indicator";
import cache from "next/cache";
import {draftMode} from "next/headers";
import VisualEditing from "next-sanity/visual-editing/client-component";

export default function Layout({children}: PropsWithChildren) {
  const shouldEnableDraftModeToggle =
    process.env.NODE_ENV === "development" && draftMode().isEnabled;
  return (
    <body className="relative flex min-h-screen min-w-min-screen flex-col overflow-x-clip">
      {children}
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
                await cache.revalidateTag(tag);
              }
              console.log("Revalidate tag", payload.document._type);
              return cache.revalidateTag(payload.document._type);
            }
            await cache.revalidatePath("/", "layout");
          }}
        />
      )}
      <TailwindIndicator />
      {shouldEnableDraftModeToggle && (
        <ExitPreview enable={draftMode().isEnabled} />
      )}
    </body>
  );
}
