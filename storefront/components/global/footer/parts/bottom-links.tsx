import type {Footer} from "@/types/sanity.generated";

import LocalizedLink from "@/components/shared/localized-link";
import Label from "@/components/shared/typography/label";
import React from "react";

export default function BottomLinks({
  bottomLinks,
  socialLinks,
}: NonNullable<Footer>) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="climate-label-xs flex flex-col justify-between gap-lg lg:flex-row lg:items-center">
      <div className="flex flex-col gap-2xl lg:flex-row">
        <Label desktopSize="xs" font="display" mobileSize="2xs">
          © {currentYear}
        </Label>
        <div className="flex flex-wrap gap-2xl">
          {bottomLinks?.map((link) => {
            if (!link.link) return null;
            return (
              <LocalizedLink
                className="whitespace-nowrap"
                href={link.link}
                key={link._key}
              >
                <Label desktopSize="xs" font="display" mobileSize="2xs">
                  {link.label}
                </Label>
              </LocalizedLink>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap gap-2xl">
        {socialLinks?.map((link) => {
          if (!link.link) return null;
          return (
            <LocalizedLink href={link.link} key={link._key}>
              <Label desktopSize="xs" font="display" mobileSize="2xs">
                {link.label}
              </Label>
            </LocalizedLink>
          );
        })}
      </div>
    </div>
  );
}
