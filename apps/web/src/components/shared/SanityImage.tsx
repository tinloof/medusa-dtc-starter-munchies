import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";

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
  sizes?: string;
}

// These are passed from server-side via data attributes or context
// For React components, we use the values from import.meta.env which are available during build
const imageConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID || "",
  dataset: import.meta.env.PUBLIC_SANITY_STUDIO_DATASET || "production",
};

const builder = imageUrlBuilder(imageConfig);

export function SanityImage({
  data,
  className,
  alt,
  aspectRatio,
  loading = "lazy",
  sizes = "100vw",
}: SanityImageProps) {
  if (!data?.asset?._ref) {
    return null;
  }

  const _ref = data.asset._ref;
  const { width, height } = getImageDimensions(_ref);

  // Parse aspect ratio if provided
  const aspectRatioValues = aspectRatio?.split("/");
  const aspectRatioWidth = aspectRatioValues ? parseFloat(aspectRatioValues[0]) : undefined;
  const aspectRatioHeight = aspectRatioValues ? parseFloat(aspectRatioValues[1]) : undefined;

  // Calculate new height based on aspect ratio if provided
  const computedHeight = aspectRatioWidth && aspectRatioHeight
    ? Math.round((width / aspectRatioWidth) * aspectRatioHeight)
    : height;

  // Create base image URL builder
  const urlBuilder = builder
    .image({
      _ref,
      crop: data.crop,
      hotspot: data.hotspot,
    })
    .auto("format");

  // Generate srcset values
  const srcSetValues = [50, 100, 200, 450, 600, 750, 900, 1000, 1250, 1500, 1750, 2000];

  function generateImageUrl(w: number) {
    let img = urlBuilder.width(w);
    if (aspectRatioWidth && aspectRatioHeight) {
      const h = Math.round((w / aspectRatioWidth) * aspectRatioHeight);
      img = img.height(h);
    }
    return img.url();
  }

  const src = generateImageUrl(width);

  const srcSet = srcSetValues
    .filter((value) => value < width)
    .map((value) => `${generateImageUrl(value)} ${value}w`)
    .concat(`${src} ${width}w`)
    .join(", ");

  const imageAlt = alt || data.alt || "";

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={computedHeight}
      alt={imageAlt}
      className={className}
      loading={loading}
      style={aspectRatio ? { aspectRatio } : undefined}
    />
  );
}

export default SanityImage;
