import type {TEXT_PAGE_QUERYResult} from "@/types/sanity.generated";
import type {BlocksBody} from "@/utils/content/toc";

import Body from "@/components/shared/typography/body";
import getBlocksToc from "@/utils/content/toc";
import {getPtComponentId} from "@/utils/ids";
import {toPlainText} from "@portabletext/react";
import Link from "next/link";
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
              <Body
                className="border-accent-40 border-l-[1.5px] py-[10px] pl-[9px] transition-all duration-300 first:pt-2 last:pb-2 hover:border-accent"
                font="sans"
                key={index}
                mobileSize="sm"
              >
                <Link href={`#${getPtComponentId(item.block as any)}`} scroll>
                  {toPlainText(item.block)}
                </Link>
              </Body>
            ),
        )}
      </div>
      {/* {!outlines?.length ? null : (
        <Accordion
          placeholder={toPlainText(outlines[0].block)}
          title="On this page"
        >
          <div className="flex flex-col gap-6 pb-6 pt-[13px]">
            {outlines?.slice(1).map((item, index) => {
              const blockId = getPtComponentId(item.block as any);
              return (
                <Link href={`#${blockId}`} key={index}>
                  {toPlainText(item.block)}
                </Link>
              );
            })}
          </div>
        </Accordion>
      )} */}
    </>
  );
}
