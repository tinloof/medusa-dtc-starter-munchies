import type {TEXT_PAGE_QUERYResult} from "@/types/sanity.generated";
import type {BlocksBody} from "@/utils/content/toc";

import LocalizedLink from "@/components/shared/localized-link";
import TocSelect from "@/components/shared/toc-select";
import Body from "@/components/shared/typography/body";
import getBlocksToc from "@/utils/content/toc";
import {getPtComponentId} from "@/utils/ids";
import {toPlainText} from "@portabletext/react";
import React from "react";

export default function TableOfContents({
  body,
}: Pick<NonNullable<TEXT_PAGE_QUERYResult>, "body">) {
  const outlines = getBlocksToc(body);
  return (
    <>
      <div className="sticky top-[calc(var(--header-height)+2.5rem)] hidden w-full flex-col lg:flex">
        {outlines?.map(
          (
            item: {
              block: BlocksBody;
              isSub: boolean;
            },
            index,
          ) =>
            !item.isSub && (
              <LocalizedLink
                href={`#${getPtComponentId(item.block as any)}`}
                key={index}
                scroll
              >
                <Body
                  className="border-l-[1.5px] border-accent-40 py-[10px] pl-[9px] transition-all duration-300 first:pt-2 last:pb-2 hover:border-accent"
                  font="sans"
                  mobileSize="sm"
                >
                  {toPlainText(item.block)}
                </Body>
              </LocalizedLink>
            ),
        )}
      </div>
      {!outlines?.length ? null : <TocSelect outlines={outlines} />}
    </>
  );
}
