import type { ImgHTMLAttributes } from "react";

interface CloudflareImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Original image URL (can be absolute or relative) */
  src: string;
  /** Intrinsic width (required) */
  width: number;
  /** Intrinsic height (required) */
  height: number;

  /**
   * Aspect ratio in the form "width/height" (e.g. "16/9")
   * If provided, height will be recalculated per srcset entry
   */
  aspectRatio?: string;

  /**
   * Cloudflare-specific options
   */
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";
  quality?: number;
  format?: "auto" | "avif" | "webp" | "jpeg" | "png";
}

const DEFAULT_SRCSET_WIDTHS = [
  50, 100, 200, 450, 600, 750, 900, 1000, 1250, 1500, 1750, 2000,
];

export function Image({
  src,
  width,
  height,
  loading = "lazy",
  aspectRatio,
  fit = "cover",
  quality = 75,
  format = "avif",
  style,
  alt,
  ...rest
}: CloudflareImageProps) {
  // Parse aspect ratio if provided
  const aspectRatioValues = aspectRatio?.split("/");
  const aspectRatioWidth =
    aspectRatioValues?.[0] != null
      ? Number.parseFloat(aspectRatioValues[0])
      : undefined;
  const aspectRatioHeight =
    aspectRatioValues?.[1] != null
      ? Number.parseFloat(aspectRatioValues[1])
      : undefined;

  const computedHeight =
    aspectRatioWidth && aspectRatioHeight
      ? Math.round((width / aspectRatioWidth) * aspectRatioHeight)
      : height;

  function buildUrl(w: number) {
    const h =
      aspectRatioWidth && aspectRatioHeight
        ? Math.round((w / aspectRatioWidth) * aspectRatioHeight)
        : Math.round((w / width) * height);

    const options = [
      `width=${w}`,
      `height=${h}`,
      `fit=${fit}`,
      `quality=${quality}`,
      `format=${format}`,
    ].join(",");

    return `https://munchies.million-tinloof.com/cdn-cgi/image/${options}/${src}`;
  }

  const srcSet = DEFAULT_SRCSET_WIDTHS.map((w) => `${buildUrl(w)} ${w}w`).join(
    ", "
  );

  const finalSrc = buildUrl(width);

  return (
    <img
      alt={alt}
      height={computedHeight}
      loading={loading}
      src={finalSrc}
      srcSet={srcSet}
      style={{ ...style, ...(aspectRatio ? { aspectRatio } : undefined) }}
      width={width}
      {...rest}
    />
  );
}
