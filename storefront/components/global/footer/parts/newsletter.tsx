"use client";
import type {Footer} from "@/types/sanity.generated";

import {newsletterForm} from "@/actions/newsletter";
import {Cta} from "@/components/shared/button";
import {RichText} from "@/components/shared/rich-text";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {useActionState} from "react";
import {useFormStatus} from "react-dom";

export default function Newsletter(props: NonNullable<Footer>) {
  const [state, action] = useActionState(newsletterForm, "idle");

  return (
    <section className="mx-auto flex w-full max-w-max-screen flex-col gap-s px-m py-2xl lg:px-xl">
      {state === "success" && (
        <Body desktopSize="8xl" font="serif" mobileSize="5xl">
          {props.signup_success && <RichText value={props.signup_success} />}
        </Body>
      )}
      {state !== "success" && (
        <>
          <Heading desktopSize="5xl" font="serif" mobileSize="2xl" tag="h2">
            {props.copy && <RichText value={props.copy} />}
          </Heading>
          <form action={action} className="flex flex-col gap-s lg:flex-row">
            <input
              className="newletter-text h-20 w-full max-w-[960px] rounded-lg border-[1.5px] border-accent bg-transparent px-lg py-[7.5px] font-sans text-body-4xl leading-[140%] tracking-[-0.64px] outline-none placeholder:text-body-4xl placeholder:text-accent placeholder:opacity-60 lg:px-2xl lg:py-[6.5px] lg:text-body-8xl lg:tracking-[-0.96px] lg:placeholder:text-body-8xl"
              name="email"
              placeholder={props.placeholder}
              required
              type="email"
            />
            <SubmitButton text={props.button} />
          </form>
          <Body font="sans" mobileSize="sm">
            {props.footnote && <RichText value={props.footnote} />}
          </Body>
        </>
      )}
      {state === "error" && (
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

function SubmitButton({text}: {text?: string}) {
  const {pending} = useFormStatus();

  return (
    <Cta
      className="w-full lg:flex-1"
      loading={pending}
      size="xl"
      type="submit"
      variant="outline"
    >
      {text || "Submit"}
    </Cta>
  );
}
