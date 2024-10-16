"use client";

import type {Video as VideoType} from "@/types/sanity.generated";

import {SanityImage, resolveImageData} from "@/components/shared/sanity-image";
import React, {useEffect, useState} from "react";
import {preload} from "react-dom";

export type VideoProps = {
  aspectRatio?: string;
  controls?: boolean;
  fetchPriority?: "default" | "high";
  poster?: VideoType["poster"];
  videoUrl?: null | string;
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "poster" | "src">;

export default function Video({
  aspectRatio,
  controls,
  fetchPriority = "default",
  poster,
  videoUrl,
  ...props
}: VideoProps) {
  const [appeared, setAppeared] = useState(fetchPriority === "high");

  const posterData = !poster ? null : resolveImageData({data: poster});

  useEffect(() => {
    setAppeared(true);
  }, []);

  if (!poster || !posterData || !videoUrl) {
    return null;
  }

  const videoElement = (
    <video
      autoPlay
      controls={controls}
      height={posterData.height}
      loop
      muted
      playsInline
      poster={posterData?.src}
      src={videoUrl}
      width={posterData.width}
      {...props}
    />
  );

  if (fetchPriority === "high" && posterData?.src) {
    preload(posterData.src, {
      as: "image",
      fetchPriority: "high",
    });
    return videoElement;
  }

  return (
    <>
      {!appeared ? (
        <SanityImage aspectRatio={aspectRatio} data={poster} />
      ) : (
        videoElement
      )}
    </>
  );
}
