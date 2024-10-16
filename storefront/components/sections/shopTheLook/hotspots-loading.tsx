import {Cta} from "@/components/shared/button";
import Icon from "@/components/shared/icon";
import {SanityImage} from "@/components/shared/sanity-image";

import type {ModularPageSection} from "../types";

export default function HotspotsLoading({
  image,
}: Pick<ModularPageSection<"section.shopTheLook">, "image">) {
  return (
    <div className="flex w-full flex-col items-stretch justify-start gap-xs lg:flex-row lg:gap-s">
      {image ? (
        <div className="relative w-full min-w-[63%] rounded-lg">
          <SanityImage className="w-full rounded-lg" data={image} />
        </div>
      ) : (
        <div className="w-full min-w-[63%] rounded-lg bg-secondary" />
      )}
      <div className="hidden w-full max-w-[450px] flex-col justify-between gap-2xl rounded-lg lg:flex">
        <div className="flex w-full max-w-[450px] flex-1 flex-col items-center justify-center rounded-lg">
          <div className="relative aspect-square w-full rounded-lg border border-accent">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Icon
                className="size-10 animate-spin-loading"
                name="LoadingAccent"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-1 px-lg py-s">
            <div className="h-[30px] w-3/4 rounded-s bg-accent opacity-10" />
            <div className="h-6 w-1/2 rounded-s bg-accent opacity-10" />
          </div>
        </div>
        <Cta className="w-full" loading={true} size="xl" variant="outline">
          Shop now
        </Cta>
      </div>

      <div className="flex flex-col gap-xs lg:hidden">
        <div className="flex w-full gap-[10px] rounded-2xl p-xs">
          <div className="relative aspect-square w-full max-w-[100px] rounded-lg border border-accent">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Icon
                className="size-6 animate-spin-loading"
                name="LoadingAccent"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-1 py-xs">
            <div className="h-[27px] w-3/4 rounded-s bg-accent opacity-10" />
            <div className="h-5 w-1/2 rounded-s bg-accent opacity-10" />
          </div>
        </div>
        <Cta className="w-full" loading={true} size="xl" variant="outline">
          Shop now
        </Cta>
      </div>
    </div>
  );
}
