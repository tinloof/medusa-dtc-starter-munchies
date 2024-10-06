import {cx} from "cva";
import React from "react";

import type {ModularPageSection} from "./types";

import {SanityImage} from "../shared/sanity-image";
import Body from "../shared/typography/body";
import Label from "../shared/typography/label";

export default function MediaText(
  props: ModularPageSection<"section.mediaText">,
) {
  return (
    <section
      {...props.rootHtmlAttributes}
      className={cx(
        "mx-auto flex w-full max-w-max-screen flex-col items-stretch justify-center gap-2 px-m py-xl lg:px-xl lg:py-2xl",
        {
          "lg:flex-row": props.imagePosition === "left",
          "lg:flex-row-reverse": props.imagePosition === "right",
        },
      )}
    >
      <div className="lg:py-7xl relative flex min-h-[390px] flex-col items-center justify-start gap-11 rounded-lg border border-accent px-xl py-xl sm:justify-center lg:w-1/2">
        <Label
          className="whitespace-nowrap sm:absolute sm:left-1/2 sm:top-xl sm:-translate-x-1/2"
          desktopSize="base"
          font="display"
          mobileSize="sm"
        >
          {props.title}
        </Label>
        <Body
          className="max-w-[580px] text-pretty text-center"
          desktopSize="6xl"
          font="serif"
          mobileSize="4xl"
        >
          {props.description}
        </Body>
      </div>
      {props.image ? (
        <div className="aspect-square rounded-lg lg:w-1/2">
          <SanityImage
            alt="arrow-right"
            className="aspect-square"
            data={props.image}
          />
        </div>
      ) : (
        <div className="aspect-square rounded-lg bg-accent lg:w-1/2" />
      )}
    </section>
  );
}
