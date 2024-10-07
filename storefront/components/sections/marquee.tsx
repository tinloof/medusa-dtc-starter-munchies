import React from "react";

import type {ModularPageSection} from "./types";

import Label from "../shared/typography/label";

export default function Marquee(props: ModularPageSection<"section.marquee">) {
  const item = (
    <div className="flex shrink-0 animate-marquee items-center justify-start gap-20 [--duration:15s] [--gap:5rem]">
      {props.text?.map((item) => {
        return (
          <Label
            className="whitespace-nowrap"
            font="display"
            key={item}
            mobileSize="6xl"
          >
            {item}
          </Label>
        );
      })}
    </div>
  );
  return (
    <section
      className="mx-auto flex max-w-max-screen items-center gap-20 overflow-hidden px-xl py-2xl"
      {...props.rootHtmlAttributes}
    >
      {item}
      {item}
    </section>
  );
}
