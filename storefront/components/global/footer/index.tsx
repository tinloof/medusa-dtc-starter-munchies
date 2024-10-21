import type {Footer} from "@/types/sanity.generated";

import {RichText} from "@/components/shared/rich-text";
import {SanityImage} from "@/components/shared/sanity-image";

import BottomLinks from "./parts/bottom-links";
import Newsletter from "./parts/newsletter";
import TopLinks from "./parts/top-links";

interface FooterProps extends NonNullable<Footer> {
  variant?: "default" | "simple";
}

export default function Footer({variant = "default", ...props}: FooterProps) {
  if (variant === "simple") {
    return (
      <footer className="w-full bg-accent" id="footer">
        <div className="mx-auto flex w-full max-w-max-screen flex-col gap-xl px-m py-xl text-background lg:px-xl">
          {props.image && (
            <SanityImage className="lg:mt-2xl" data={props.image} />
          )}
          <div className="flex w-full justify-between lg:justify-start lg:gap-6xl">
            {props.information?.map((column) => {
              if (!column.text) return null;
              return (
                <div
                  className="flex w-[170px] flex-col gap-xl"
                  key={column._key}
                >
                  <RichText value={column.text} />
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <>
      <Newsletter {...props} />
      <footer className="w-full bg-accent" id="footer">
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
