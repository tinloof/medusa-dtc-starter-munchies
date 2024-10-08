import Image from "next/image";

import type {ModularPageSection} from "./types";

import EmblaCarousel from "../shared/carousel";
// import Icon from "../shared/icon";
import Body from "../shared/typography/body";

//TODO: find solution to remove scrol on the desktop
export default function CollectionList(
  props: ModularPageSection<"section.collectionList">,
) {
  console.log(props.cards);

  const collections = [
    {
      id: 1,
      image: "/images/cookie-image.png",
      title: "Signature cookies",
    },
    {
      id: 2,
      image: "/images/cookie-image.png",
      title: "Bake to oven",
    },
    {
      id: 3,
      image: "/images/cookie-image.png",
      title: "Bundles",
    },
  ];
  const slides = collections.map((collection) => (
    <CollectionCard
      image={collection.image}
      key={collection.id}
      title={collection.title}
    />
  ));
  return (
    <EmblaCarousel
      showButtons={false}
      showProgress={true}
      slides={slides}
      title="Shop our cookies"
    />
  );
}

function CollectionCard(props: {image: string; title: string}) {
  return (
    <div className="relative h-full min-h-[562px] w-[380px] cursor-pointer rounded-lg lg:min-h-[604px] lg:w-[453px]">
      <Image
        alt={props.title}
        className="h-full w-full bg-secondary"
        height={604}
        src={props.image}
        width={453}
      />
      <div className="group absolute bottom-lg left-1/2 -translate-x-1/2 rounded-[200px] border-[1.5px] border-accent bg-background px-2xl py-s hover:bg-accent hover:text-background">
        <Body className="whitespace-nowrap" desktopSize="6xl" mobileSize="4xl">
          {props.title}
        </Body>
      </div>
      {/* <div className="absolute bottom-lg left-1/2 -translate-x-1/2">
        <div className="relative h-full w-full overflow-hidden bg-background hover:bg-accent hover:text-background">
          <Icon className="h-full w-full" name="Ellips" />
          <Body
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-2xl py-s"
            desktopSize="6xl"
            mobileSize="4xl"
          >
            {props.title}
          </Body>
        </div>
      </div> */}
    </div>
  );
}
