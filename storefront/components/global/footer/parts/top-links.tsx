import type {Footer} from "@/types/sanity.generated";

import LocalizedLink from "@/components/shared/localized-link";
import {RichText} from "@/components/shared/rich-text";
import Body from "@/components/shared/typography/body";

export default function TopLinks({information, linkList}: NonNullable<Footer>) {
  return (
    <div className="flex flex-col items-start justify-between gap-2xl lg:flex-row">
      <div className="flex w-full justify-between lg:justify-start lg:gap-6xl">
        {information?.map((column) => {
          if (!column.text) return null;
          return (
            <div className="flex w-[170px] flex-col gap-xl" key={column._key}>
              <RichText value={column.text} />
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-between lg:justify-end lg:gap-6xl">
        {linkList?.map((list) => (
          <div
            className="flex min-w-[170px] flex-col gap-xs lg:min-w-[196px]"
            key={list._key}
          >
            {list.links?.map((link) => {
              if (!link.link) return null;
              return (
                <LocalizedLink href={link.link} key={link._key}>
                  <Body desktopSize="base" font="sans" mobileSize="sm">
                    {link.label}
                  </Body>
                </LocalizedLink>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
