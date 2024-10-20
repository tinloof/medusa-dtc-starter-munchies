"use client";

import type {Video as VideoType} from "@/types/sanity.generated";

import {SanityImage, resolveImageData} from "@/components/shared/sanity-image";
import useInView from "@/hooks/use-in-view";
import {cx} from "cva";
import React, {useEffect, useState} from "react";

export type VideoProps = {
  aspectRatio?: string;
  controls?: boolean;
  fetchPriority?: "default" | "high";
  poster?: VideoType["poster"];
  videoUrl?: null | string;
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "poster" | "src">;

export default function Video({
  aspectRatio,
  className,
  controls,
  fetchPriority = "default",
  poster,
  videoUrl,
  ...props
}: VideoProps) {
  const {inView, ref} = useInView();

  const [appeared, setAppeared] = useState(fetchPriority === "high" || inView);

  const posterData = !poster ? null : resolveImageData({data: poster});

  useEffect(() => {
    if (inView) {
      setAppeared(true);
    }
  }, [inView]);

  if (!poster || !posterData || !videoUrl) {
    return null;
  }

  return (
    <div className="relative" ref={ref} style={{aspectRatio}}>
      <SanityImage
        aspectRatio={aspectRatio}
        className="absolute inset-0 z-0"
        data={poster}
        fetchPriority={fetchPriority}
      />
      {!appeared ? null : (
        <video
          autoPlay
          className={cx("absolute inset-0", className)}
          controls={controls}
          height={posterData.height}
          loop
          muted
          playsInline
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          src={videoUrl}
          style={{aspectRatio}}
          width={posterData.width}
          {...props}
        />
      )}
    </div>
  );
}
