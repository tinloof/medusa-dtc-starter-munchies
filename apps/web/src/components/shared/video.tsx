import { cx } from "class-variance-authority";
import type React from "react";
import { type ImgHTMLAttributes, useEffect, useState } from "react";
import type { Video as VideoType } from "sanity.types";
import {
  resolveImageData,
  SanityImage,
} from "@/components/shared/sanity-image";
import { useInView } from "@/lib/hooks/use-in-view";

export type VideoProps = {
  aspectRatio?: string;
  controls?: boolean;
  fetchPriority?: "default" | "high";
  poster?: VideoType["poster"];
  videoUrl?: null | string;
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "poster" | "src">;

export function Video({
  aspectRatio,
  className,
  controls,
  fetchPriority = "default",
  poster,
  videoUrl,
  imgProps,
  ...props
}: VideoProps) {
  const { inView, ref } = useInView();

  const [appeared, setAppeared] = useState(fetchPriority === "high" || inView);

  const posterData = poster ? resolveImageData({ data: poster }) : null;

  useEffect(() => {
    if (inView) {
      setAppeared(true);
    }
  }, [inView]);

  if (!(poster && posterData && videoUrl)) {
    return null;
  }

  return (
    <div className="relative" ref={ref} style={{ aspectRatio }}>
      <SanityImage
        aspectRatio={aspectRatio}
        className="absolute inset-0 z-0"
        data={poster}
        {...imgProps}
      />
      {appeared ? (
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
          style={{ aspectRatio }}
          width={posterData.width}
          {...props}
        />
      ) : null}
    </div>
  );
}
