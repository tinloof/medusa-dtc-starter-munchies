import CarouselSection from "@/components/shared/CarouselSection";

interface Card {
  _key: string;
  image?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  } | null;
  cta?: {
    link?: string;
    label?: string;
  } | null;
}

interface Props {
  cards?: Card[] | null;
}

// Helper to generate Sanity image URL
function getSanityImageUrl(ref: string | undefined) {
  if (!ref) return null;
  const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_STUDIO_DATASET;
  // Convert ref format: image-abc123-800x600-jpg -> abc123-800x600.jpg
  const parts = ref.replace("image-", "").split("-");
  const extension = parts.pop();
  const id = parts.join("-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}.${extension}`;
}

export default function CollectionListCarousel({ cards }: Props) {
  const slides = cards?.map((card) => (
    <CollectionCard key={card._key} {...card} />
  ));

  return (
    <CarouselSection
      disableDesktopDrag
      showButtons={false}
      showProgress={true}
      slides={slides}
      title={
        <h3 className="text-center font-serif font-normal leading-[120%] text-heading-lg tracking-[-0.8px] lg:text-heading-3xl lg:tracking-[-1.28px]">
          Shop our cookies
        </h3>
      }
    />
  );
}

function CollectionCard({ cta, image }: Card) {
  if (!cta?.link) {
    return null;
  }

  const imageUrl = getSanityImageUrl(image?.asset?._ref);

  return (
    <a
      className="group relative flex aspect-3/4 h-auto w-[88vw] min-w-[320px] max-w-[453px] flex-1 cursor-pointer rounded-lg"
      href={cta.link}
    >
      {imageUrl ? (
        <img
          className="aspect-3/4 h-auto w-[88vw] min-w-[320px] max-w-[453px] rounded-lg object-cover object-center"
          src={imageUrl}
          alt={image?.alt || "Collection"}
        />
      ) : (
        <div className="h-full w-full bg-secondary rounded-lg" />
      )}
      {cta.label && (
        <div className="absolute bottom-lg left-1/2 flex -translate-x-1/2 items-center justify-center">
          <div className="relative flex h-8xl w-fit items-center justify-center px-2xl">
            <svg
              className="absolute top-1/2 left-1/2 h-full w-[280px] -translate-x-1/2 -translate-y-1/2 lg:w-[305px]"
              fill="none"
              height="80"
              viewBox="0 0 305 80"
              width="305"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Arrow right</title>
              <path
                className="fill-background transition-all duration-300 group-hover:fill-accent"
                d="M303.454 39.8975C303.454 44.995 299.503 50.0477 291.856 54.7901C284.25 59.5072 273.193 63.7827 259.464 67.3839C232.017 74.5834 194.059 79.045 152.102 79.045C110.145 79.045 72.1868 74.5834 44.74 67.3839C31.011 63.7827 19.9546 59.5072 12.3482 54.7901C4.70131 50.0477 0.75 44.995 0.75 39.8975C0.75 34.8001 4.70131 29.7473 12.3482 25.005C19.9546 20.2878 31.011 16.0124 44.74 12.4112C72.1868 5.21167 110.145 0.75 152.102 0.75C194.059 0.75 232.017 5.21167 259.464 12.4112C273.193 16.0124 284.25 20.2878 291.856 25.005C299.503 29.7473 303.454 34.8001 303.454 39.8975Z"
                stroke="#FF5227"
                strokeWidth="1.5"
              />
            </svg>
            <span className="relative z-10 whitespace-nowrap text-center font-serif leading-[150%] text-body-3xl transition-all duration-300 group-hover:text-background lg:text-body-6xl">
              {cta.label}
            </span>
          </div>
        </div>
      )}
    </a>
  );
}
