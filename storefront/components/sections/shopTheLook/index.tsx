import Heading from "@/components/shared/typography/heading";
import {Suspense} from "react";

import type {ModularPageSection} from "../types";

import Hotspots from "./hotspots";
import HotspotsLoading from "./hotspots-loading";

export default async function ShopTheLook(
  props: ModularPageSection<"section.shopTheLook">,
) {
  return (
    <section
      {...props.rootHtmlAttributes}
      className="mx-auto flex w-full max-w-max-screen flex-col items-start gap-xs px-m py-2xl lg:px-xl"
    >
      <Heading desktopSize="3xl" font="serif" mobileSize="xl" tag="h3">
        {props.title}
      </Heading>
      <Suspense fallback={<HotspotsLoading image={props.image} />}>
        <Hotspots
          countryCode={props.countryCode}
          image={props.image}
          productHotSpots={props.productHotSpots}
        />
      </Suspense>
    </section>
  );
}
