"use client";

import useInView from "@/hooks/use-in-view";
import Image, {getImageProps} from "next/image";
import React, {useEffect} from "react";
import {preload} from "react-dom";

export type MuxVideoProps = {
  loading?: "eager" | "lazy";
  video?: {
    playbackId?: string;
    resolution?: string;
  };
} & Omit<VideoProps, "mp4Url" | "webmUrl">;

export default function MuxVideo({
  loading,
  video,
  ...videoProps
}: MuxVideoProps) {
  const {playbackId, resolution} = video ?? {};

  if (!playbackId || !resolution) {
    return null;
  }

  const mp4Url = `https://stream.mux.com/${playbackId}/${
    resolution === "SD" ? "medium" : "high"
  }.mp4`;

  const webmUrl = `https://stream.mux.com/${playbackId}/${
    resolution === "SD" ? "medium" : "high"
  }.webm`;

  const {
    props: {src: poster},
  } = getImageProps({
    alt: "",
    fill: true,
    src: `https://image.mux.com/${playbackId}/thumbnail.webp?fit_mode=smartcrop&time=0`,
  });

  if (loading === "eager") {
    preload(poster, {
      as: "image",
      fetchPriority: "high",
    });

    return (
      <Video
        mp4Url={mp4Url}
        poster={poster}
        src={mp4Url}
        webmUrl={webmUrl}
        {...videoProps}
      />
    );
  }
}

type VideoProps = {
  loading?: "eager" | "lazy";
  mp4Url: string;
  webmUrl: string;
} & React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

function Video({loading, mp4Url, webmUrl, ...props}: VideoProps) {
  const [appeared, setAppeared] = React.useState(false);
  const {inView, ref} = useInView();
  const hidden = loading === "lazy" && !appeared;

  useEffect(() => {
    if (inView) {
      setAppeared(true);
    }
  }, [inView]);

  return (
    <>
      {hidden ? (
        <Image
          alt={"Video poster"}
          className={props.className}
          loading="lazy"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          ref={ref}
          src={props.poster ?? ""}
          style={props.style}
        />
      ) : (
        <video
          autoPlay
          className="rounded-2xl"
          controls={false}
          loop
          muted
          playsInline
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          ref={ref}
          {...props}
        >
          <source src={mp4Url} type="video/mp4" />
          <source src={webmUrl} type="video/webm" />
        </video>
      )}
    </>
  );
}
