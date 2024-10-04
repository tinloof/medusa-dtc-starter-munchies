import type {Footer} from "@/types/sanity.generated";

import {SanityImage} from "@/components/shared/sanity-image";
import React from "react";

import BottomLinks from "./parts/bottom-links";
import Newsletter from "./parts/newsletter";
import TopLinks from "./parts/top-links";

export default function Footer(props: NonNullable<Footer>) {
  console.log(props);
  return (
    <>
      <Newsletter {...props} />
      <section className="bg-accent">
        <div className="mx-auto flex max-w-max-screen flex-col gap-2xl px-m pb-m pt-6xl text-background lg:px-xl lg:pb-xl">
          <TopLinks {...props} />
          {props.image && (
            <SanityImage className="lg:mt-2xl" data={props.image} />
          )}
          <BottomLinks {...props} />
        </div>
      </section>
    </>
  );
}
