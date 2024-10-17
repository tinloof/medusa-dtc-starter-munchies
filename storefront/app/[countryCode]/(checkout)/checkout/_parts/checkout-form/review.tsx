"use client";

import {placeOrder} from "@/actions/medusa/order";
import {Cta} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {useFormState, useFormStatus} from "react-dom";

export default function Review({active}: {active: boolean}) {
  const [, action] = useFormState(placeOrder, null);

  return (
    <form
      action={action}
      className="flex w-full flex-col gap-8 border-t border-accent py-8"
    >
      <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
        Review
      </Heading>
      {active && (
        <>
          <Body>
            By clicking the ‘Complete order’ button, you confirm that you have
            read, understand, and accept our Terms of Use, Terms of Sale and
            Returns Policy and acknowledge that you have read Medusa Store’s
            Privacy Policy.
          </Body>
          <SubmitButton />
        </>
      )}
    </form>
  );
}

function SubmitButton() {
  const {pending} = useFormStatus();
  return (
    <Cta loading={pending} size="sm" type="submit">
      Complete order
    </Cta>
  );
}
