import { useEffect, useState, useRef } from "react";
import { cx } from "class-variance-authority";

interface VideoProps {
  aspectRatio?: string;
  controls?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  poster?: {
    asset?: {
      _ref: string;
    };
  } | null;
  videoUrl?: string | null;
  className?: string;
}

export default function Video({
  aspectRatio,
  className,
  controls,
  fetchPriority = "auto",
  poster,
  videoUrl,
}: VideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [appeared, setAppeared] = useState(fetchPriority === "high");

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      setAppeared(true);
    }
  }, [inView]);

  if (!videoUrl) {
    return null;
  }

  // Generate poster URL if we have poster data
  const posterUrl = poster?.asset?._ref
    ? `https://cdn.sanity.io/images/${import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID}/${import.meta.env.PUBLIC_SANITY_STUDIO_DATASET}/${poster.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`
    : undefined;

  return (
    <div className="relative" ref={ref} style={{ aspectRatio }}>
      {posterUrl && (
        <img
          src={posterUrl}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{ aspectRatio }}
        />
      )}
      {appeared && (
        <video
          autoPlay
          className={cx("absolute inset-0", className)}
          controls={controls}
          loop
          muted
          playsInline
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          src={videoUrl}
          style={{ aspectRatio }}
        />
      )}
    </div>
  );
}
