import {cx} from "cva";
import {stegaClean} from "next-sanity";
import React from "react";

import type {ModularPageSection} from "./types";

import {SanityImage} from "../shared/sanity-image";
import Body from "../shared/typography/body";
import Label from "../shared/typography/label";

export default function MediaText(
  props: ModularPageSection<"section.mediaText">,
) {
  const position = stegaClean(props.imagePosition);
  return (
    <section
      {...props.rootHtmlAttributes}
      className={cx(
        "mx-auto flex w-full max-w-max-screen flex-col items-stretch justify-center gap-2 px-m py-xl lg:px-xl lg:py-2xl",
        {
          "lg:flex-row": position === "right",
          "lg:flex-row-reverse": position === "left",
        },
      )}
    >
      <div className="relative flex min-h-[390px] flex-col items-center justify-start gap-11 rounded-lg border border-accent p-s sm:justify-center lg:w-1/2 lg:py-7xl">
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
