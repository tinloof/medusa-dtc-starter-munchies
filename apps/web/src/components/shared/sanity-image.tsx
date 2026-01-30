import { getImageDimensions } from "@sanity/asset-utils";
import { createImageUrlBuilder } from "@sanity/image-url";

const isDev = process.env.NODE_ENV === "development";

interface SanityImageData {
  asset?: {
    _ref: string;
    _type?: string;
  };
  crop?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  hotspot?: {
    height?: number;
    width?: number;
    x?: number;
    y?: number;
  };
  alt?: string;
}

interface SanityImageProps {
  data: SanityImageData | null | undefined;
  className?: string;
  alt?: string;
  aspectRatio?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}

// These are passed from server-side via data attributes or context
// For React components, we use the values from import.meta.env which are available during build
const imageConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID || "",
  dataset: import.meta.env.PUBLIC_SANITY_STUDIO_DATASET || "production",
};

const builder = createImageUrlBuilder(imageConfig);

const DEFAULT_SRCSET_WIDTHS = [
  50, 100, 200, 450, 600, 750, 900, 1000, 1250, 1500, 1750, 2000,
];

function parseAspectRatio(aspectRatio?: string) {
  const values = aspectRatio?.split("/");
  return {
    width: values ? Number.parseFloat(values[0]) : undefined,
    height: values ? Number.parseFloat(values[1]) : undefined,
  };
}

/**
 * Generate srcSet string for Sanity images
 */
export function generateSanitySrcSet(
  data: SanityImageData | null | undefined,
  aspectRatio?: string
): string | null {
  if (!data?.asset?._ref) {
    return null;
  }

  const _ref = data.asset._ref;
  const { width: intrinsicWidth } = getImageDimensions(_ref);
  const { width: arWidth, height: arHeight } = parseAspectRatio(aspectRatio);

  const urlBuilder = builder
    .image({ _ref, crop: data.crop, hotspot: data.hotspot })
    .auto("format");

  function buildUrl(w: number) {
    let img = urlBuilder.width(w);
    if (arWidth && arHeight) {
      img = img.height(Math.round((w / arWidth) * arHeight));
    }
    return img.url();
  }

  const src = buildUrl(intrinsicWidth);

  return DEFAULT_SRCSET_WIDTHS.filter((w) => w < intrinsicWidth)
    .map((w) => `${buildUrl(w)} ${w}w`)
    .concat(`${src} ${intrinsicWidth}w`)
    .join(", ");
}

export function SanityImage({
  data,
  className,
  alt,
  aspectRatio,
  loading = "lazy",
  fetchPriority = "auto",
  sizes = "100vw",
}: SanityImageProps) {
  if (!data?.asset?._ref) {
    return null;
  }

  const _ref = data.asset._ref;
  const { width, height } = getImageDimensions(_ref);
  const { width: arWidth, height: arHeight } = parseAspectRatio(aspectRatio);

  const computedHeight =
    arWidth && arHeight ? Math.round((width / arWidth) * arHeight) : height;

  const urlBuilder = builder
    .image({ _ref, crop: data.crop, hotspot: data.hotspot })
    .auto("format");

  let srcImg = urlBuilder.width(width);
  if (arWidth && arHeight) {
    srcImg = srcImg.height(computedHeight);
  }
  const src = srcImg.url();

  const srcSet = generateSanitySrcSet(data, aspectRatio);
  const imageAlt = alt || data.alt || "";

  return (
    // biome-ignore assist/source/useSortedAttributes: https://github.com/vercel/next.js/blob/11e295089c5759891b82168c2cf7153731704519/packages/next/src/client/image-component.tsx#L272
    <img
      alt={imageAlt}
      className={className}
      fetchPriority={fetchPriority}
      height={computedHeight}
      loading={loading}
      src={src}
      sizes={sizes}
      srcSet={srcSet ?? undefined}
      style={aspectRatio ? { aspectRatio } : undefined}
      width={width}
    />
  );
}

export function resolveImageData({ aspectRatio, data }: SanityImageProps) {
  if (!data?.asset?._ref) {
    return null;
  }

  const _ref = data.asset._ref;
  const { height, width } = getImageDimensions(_ref);
  const { width: arWidth, height: arHeight } = parseAspectRatio(aspectRatio);

  if (aspectRatio && !(arWidth && arHeight) && isDev) {
    console.warn(
      `Invalid aspect ratio: ${aspectRatio}. Using the original aspect ratio. The aspect ratio should be in the format "width/height".`
    );
  }

  const urlBuilder = builder
    .image({ _ref, crop: data.crop, hotspot: data.hotspot })
    .auto("format");

  let srcImg = urlBuilder.width(width);
  if (arWidth && arHeight) {
    srcImg = srcImg.height(Math.round((width / arWidth) * arHeight));
  }

  return {
    height,
    src: srcImg.url(),
    srcSet: generateSanitySrcSet(data, aspectRatio),
    width,
  };
}
