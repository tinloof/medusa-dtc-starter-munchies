import {Link} from "@/components/shared/button";
import {SanityImage} from "@/components/shared/sanity-image";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {stegaClean} from "next-sanity";

import type {ModularPageSection} from "../types";

export default function SimpleHero(props: ModularPageSection<"section.hero">) {
  const image = stegaClean(props.image);
  return (
    <div className="flex flex-col items-stretch justify-center gap-xs lg:flex-row-reverse">
      <div className="flex min-h-[470px] w-full flex-col items-center justify-center gap-s rounded-lg bg-secondary px-m py-4xl text-center lg:w-1/2 lg:py-m">
        <Heading
          className="!leading-[100%]"
          desktopSize="5xl"
          font="serif"
          mobileSize="3xl"
          tag="h1"
        >
          {props.title}
        </Heading>
        <Body
          className="max-w-[580px] text-balance text-center"
          desktopSize="xl"
          font="sans"
          mobileSize="lg"
        >
          {props.subtitle}
        </Body>
        {props.cta?.link && (
          <Link
            className="mt-lg"
            href={props.cta.link}
            prefetch
            size="md"
            variant="primary"
          >
            {props.cta.label}
          </Link>
        )}
      </div>
      {image ? (
        <div className="aspect-square rounded-lg lg:w-1/2">
          <SanityImage
            alt="arrow-right"
            className="aspect-square object-cover object-center"
            data={image}
            fetchPriority="high"
          />
        </div>
      ) : (
        <div className="aspect-square rounded-lg bg-accent lg:w-1/2" />
      )}
    </div>
  );
}
