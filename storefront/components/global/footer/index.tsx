import type {Footer} from "@/types/sanity.generated";

import {SanityImage} from "@/components/shared/sanity-image";

import BottomLinks from "./parts/bottom-links";
import Newsletter from "./parts/newsletter";
import TopLinks from "./parts/top-links";

export default function Footer(props: NonNullable<Footer>) {
  return (
    <>
      <Newsletter {...props} />
      <footer className="w-full bg-accent">
        <div className="mx-auto flex w-full max-w-max-screen flex-col gap-2xl px-m pb-m pt-6xl text-background lg:px-xl lg:pb-xl">
          <TopLinks {...props} />
          {props.image && (
            <SanityImage className="lg:mt-2xl" data={props.image} />
          )}
          <BottomLinks {...props} />
        </div>
      </footer>
    </>
  );
}
