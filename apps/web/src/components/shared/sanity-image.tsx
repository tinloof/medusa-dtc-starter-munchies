import { getImageDimensions } from "@sanity/asset-utils";
import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";

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
  sizes?: string;
}

// These are passed from server-side via data attributes or context
// For React components, we use the values from import.meta.env which are available during build
const imageConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID || "",
  dataset: import.meta.env.PUBLIC_SANITY_STUDIO_DATASET || "production",
};

const builder = createImageUrlBuilder(imageConfig);

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
  const aspectRatioWidth = aspectRatioValues
    ? Number.parseFloat(aspectRatioValues[0])
    : undefined;
  const aspectRatioHeight = aspectRatioValues
    ? Number.parseFloat(aspectRatioValues[1])
    : undefined;

  // Calculate new height based on aspect ratio if provided
  const computedHeight =
    aspectRatioWidth && aspectRatioHeight
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
  const srcSetValues = [
    50, 100, 200, 450, 600, 750, 900, 1000, 1250, 1500, 1750, 2000,
  ];

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
      alt={imageAlt}
      className={className}
      height={computedHeight}
      loading={loading}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
      style={aspectRatio ? { aspectRatio } : undefined}
      width={width}
    />
  );
}

export function resolveImageData({ aspectRatio, data }: SanityImageProps) {
  if (!data?.asset) {
    return null;
  }

  const _ref = data.asset._ref;
  const { height, width } = getImageDimensions(_ref);
  const aspectRatioValues = aspectRatio?.split("/");

  if (aspectRatio && aspectRatioValues?.length !== 2 && isDev) {
    console.warn(
      `Invalid aspect ratio: ${aspectRatio}. Using the original aspect ratio. The aspect ratio should be in the format "width/height".`
    );
  }

  const aspectRatioWidth = aspectRatioValues
    ? Number.parseFloat(aspectRatioValues[0])
    : undefined;
  const aspectRatioHeight = aspectRatioValues
    ? Number.parseFloat(aspectRatioValues[1])
    : undefined;

  const urlBuilder = createImageUrlBuilder(imageConfig)
    .image({
      _ref,
      crop: data.crop,
      hotspot: data.hotspot,
    })
    .auto("format");

  // Values used for srcset attribute of image tag (in pixels)
  const srcSetValues = [
    50, 100, 200, 450, 600, 750, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000,
    3500, 4000, 5000,
  ];

  const src = generateImageUrl({
    aspectRatioHeight,
    aspectRatioWidth,
    urlBuilder,
    width,
  });

  // Create srcset attribute
  const srcSet = srcSetValues
    .filter((value) => value < width)
    .map((value) => {
      const imageUrl = generateImageUrl({
        aspectRatioHeight,
        aspectRatioWidth,
        urlBuilder,
        width: value,
      });
      if (width >= value) {
        return `${imageUrl} ${value}w`;
      }
      return "";
    })
    .join(", ")
    .concat(`, ${src} ${width}w`);

  return {
    height,
    src,
    srcSet,
    width,
  };
}

function generateImageUrl(args: {
  aspectRatioHeight?: number;
  aspectRatioWidth?: number;
  blur?: number;
  urlBuilder: ImageUrlBuilder;
  width: number;
}) {
  const {
    aspectRatioHeight,
    aspectRatioWidth,
    blur = 0,
    urlBuilder,
    width,
  } = args;
  let imageUrl = urlBuilder.width(width);
  const imageHeight =
    aspectRatioHeight && aspectRatioWidth
      ? Math.round((width / aspectRatioWidth) * aspectRatioHeight)
      : undefined;

  if (imageHeight) {
    imageUrl = imageUrl.height(imageHeight);
  }

  if (blur && blur > 0) {
    imageUrl = imageUrl.blur(blur);
  }

  return imageUrl.url();
}
