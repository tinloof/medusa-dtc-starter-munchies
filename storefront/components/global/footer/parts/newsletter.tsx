import type {Footer} from "@/types/sanity.generated";

import {Cta} from "@/components/shared/button";
import {RichText} from "@/components/shared/rich-text";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {cx} from "cva";

export default function Newsletter(props: NonNullable<Footer>) {
  const error = false;
  const loading = false;
  return (
    <section className="mx-auto flex w-full max-w-max-screen flex-col gap-s px-m py-2xl lg:px-xl">
      <Heading desktopSize="5xl" font="serif" mobileSize="2xl" tag="h2">
        {props.copy && <RichText value={props.copy} />}
      </Heading>
      <form className="flex flex-col gap-s lg:flex-row">
        <input
          className={cx(
            "sans-body-8xl newletter-text placeholder:sans-body-8xl h-20 w-full max-w-[960px] rounded-lg border-[1.5px] border-accent bg-transparent px-2xl py-[6.5px] outline-none placeholder:text-accent placeholder:opacity-60",
            {
              "pointer-events-none opacity-40": loading,
            },
          )}
          name="email"
          placeholder={props.placeholder}
          required
          type="email"
        />
        <Cta
          className="w-full lg:flex-1"
          loading={loading}
          size="xl"
          variant="outline"
        >
          {props.button}
        </Cta>
      </form>
      <Body font="sans" mobileSize="sm">
        {props.footnote && <RichText value={props.footnote} />}
      </Body>
      {error && (
        <div className="rounded-lg bg-error bg-opacity-20 p-s">
          <Body
            className="text-error"
            desktopSize="2xl"
            font="sans"
            mobileSize="lg"
          >
            {props.signup_error && <RichText value={props.signup_error} />}
          </Body>
        </div>
      )}
    </section>
  );
}
