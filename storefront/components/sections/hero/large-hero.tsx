import {Link} from "@/components/shared/button";
import Heading from "@/components/shared/typography/heading";
import React from "react";

import type {ModularPageSection} from "../types";

export default function LargeHero({
  children,
  props,
}: {
  children?: React.ReactNode;
  props: ModularPageSection<"section.hero">;
}) {
  return (
    <div className="relative aspect-[16/9]">
      {children}
      <div className="absolute bottom-0 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col items-center justify-center gap-xl text-balance px-s py-2xl text-center lg:max-w-[680px] lg:py-6xl">
        <Heading
          className="!leading-[100%] text-white"
          desktopSize="5xl"
          font="serif"
          mobileSize="3xl"
          tag="h1"
        >
          {props.title}
        </Heading>
        {props.cta?.link && (
          <Link href={props.cta.link} prefetch size="lg" variant="primary">
            {props.cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
