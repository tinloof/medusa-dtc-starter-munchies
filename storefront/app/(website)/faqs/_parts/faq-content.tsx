"use client";
import type {FAQS_PAGE_QUERYResult} from "@/types/sanity.generated";

import Accordion from "@/components/shared/accordion";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import React from "react";

type FaqContentProps = {
  category: NonNullable<FAQS_PAGE_QUERYResult>["category"];
  openStates: Record<string, boolean>;
  selectCategory: (category: string) => void;
  selectedCategory: string;
  setOpenStates: (openStates: Record<string, boolean>) => void;
};

export default function FaqContent({
  category,
  // openStates,
  selectedCategory,
  // setOpenStates,
}: FaqContentProps) {
  const currentCategory = category?.find(
    (category) => category.slug?.current === selectedCategory,
  );
  return (
    <>
      <div className="sticky top-[calc(var(--header-height)+2rem)] hidden h-full w-[300px] flex-col items-start lg:flex">
        {category?.map((group) => {
          return (
            <button
              className="border-l-[1.5px] border-accent-40 p-xs transition-all duration-300 first:pt-1 last:pb-1 hover:border-accent"
              key={group._id}
              // onClick={() => selectCategory(group)}
            >
              <Body font="sans" mobileSize="sm">
                {group.title}
              </Body>
            </button>
          );
        })}
      </div>
      <div className="w-full lg:max-w-[690px]">
        <Heading
          className="mb-2 font-normal"
          font="serif"
          mobileSize="lg"
          tag="h2"
        >
          {currentCategory?.title}
        </Heading>
        <div className="flex flex-col gap-m">
          <Accordion
            border={false}
            items={
              currentCategory?.questions
                ?.map((item) => {
                  if (!item || !item.question || !item.answer) return null;
                  return {
                    content: item.answer,
                    id: item.question,
                    title: item.question,
                  };
                })
                .filter(
                  (
                    item,
                  ): item is {content: string; id: string; title: string} =>
                    item !== null,
                ) || []
            }
            // openStates={openStates}
            // setOpenStates={setOpenStates}
          />
        </div>
      </div>
    </>
  );
}
