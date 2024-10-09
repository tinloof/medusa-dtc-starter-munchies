"use client";
import {Cta} from "@/components/shared/button";
import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import React, {useState} from "react";

export default function CoockieBanner() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  return (
    <>
      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 flex w-full max-w-[332px] flex-col rounded-lg border-[1.5px] border-accent bg-background p-s lg:max-w-[390px] lg:p-m">
          <button
            className="absolute right-[6px] top-[6px]"
            onClick={() => setShowCookieBanner(false)}
          >
            <Icon className="size-6" name="Close" />
          </button>
          <Heading desktopSize="base" mobileSize="xs" tag="h3">
            Our website use cookies
          </Heading>
          <Body mobileSize="sm">
            You may opt in or opt out of the use of these technologies as
            detailed in our privacy policy.
          </Body>
          <div className="mt-s flex items-center gap-1">
            <Cta size="sm" variant="outline">
              Deny
            </Cta>
            <Cta size="sm" variant="primary">
              Accept
            </Cta>
          </div>
        </div>
      )}
    </>
  );
}
