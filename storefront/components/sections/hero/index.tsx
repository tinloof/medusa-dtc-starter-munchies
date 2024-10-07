import MuxVideo from "@/components/shared/mux-video";
import {SanityImage} from "@/components/shared/sanity-image";
import {stegaClean} from "@sanity/client/stega";
import React from "react";

import type {ModularPageSection} from "../types";

import LargeHero from "./large-hero";
import SimpleHero from "./simple-hero";

interface VideoData {
  playbackId?: string;
  resolution?: string;
}

export default function Hero(props: ModularPageSection<"section.hero">) {
  const video = stegaClean(props.video?.asset) as unknown as VideoData;
  const largeImage = stegaClean(props.largeImage);
  return (
    <section
      {...props.rootHtmlAttributes}
      className="mx-auto w-full max-w-max-screen px-m py-xs lg:px-xl lg:py-xs"
    >
      {stegaClean(props.mediaType) === "image" && <SimpleHero {...props} />}
      {stegaClean(props.mediaType) === "video" && video && (
        <LargeHero props={props}>
          <MuxVideo
            className="aspect-[16/9] min-h-[590px] w-full object-cover object-center"
            loading="eager"
            video={video}
          />
        </LargeHero>
      )}
      {stegaClean(props.mediaType) === "largeImage" && largeImage && (
        <LargeHero props={props}>
          <SanityImage
            className="aspect-[16/9] min-h-[590px] w-full object-cover object-center"
            data={largeImage}
            loading="eager"
          />
        </LargeHero>
      )}
    </section>
  );
}
