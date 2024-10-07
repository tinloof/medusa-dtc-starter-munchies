import {Link} from "@/components/shared/button";
import {SanityImage} from "@/components/shared/sanity-image";
import Heading from "@/components/shared/typography/heading";
import {cx} from "cva";
import React from "react";

import type {ModularPageSection} from "../types";

export default function ShopTheLook(
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
      <div className="flex w-full flex-col items-stretch justify-start gap-xs lg:flex-row lg:gap-s">
        {props.image ? (
          <div className="relative w-full min-w-[63%] rounded-lg">
            <SanityImage className="w-full rounded-lg" data={props.image} />
            {props.productHotSpots?.map((hotSpot) => (
              <div
                className="group relative h-8 w-8 cursor-pointer rounded-full bg-accent hover:bg-secondary"
                key={hotSpot._key}
                style={{
                  left: `${hotSpot.x}%`,
                  position: "absolute",
                  top: `${hotSpot.y}%`,
                }}
              >
                <span className="absolute left-1/2 top-1/2 z-10 h-[1.5px] w-[13px] -translate-x-1/2 -translate-y-1/2 bg-background transition-all duration-300 group-hover:bg-accent" />
                <span
                  className={cx(
                    "absolute left-1/2 top-1/2 h-[13px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-background transition-all duration-300 group-hover:rotate-90 group-hover:bg-accent",
                  )}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full min-w-[63%] rounded-lg bg-secondary" />
        )}
        <div className="flex w-full max-w-[450px] flex-col justify-between gap-2xl rounded-lg">
          <div>hello</div>
          <Link className="w-full" size="xl" variant="outline">
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
}
