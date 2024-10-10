"use client";
import type {FAQS_PAGE_QUERYResult} from "@/types/sanity.generated";

import Accordion from "@/components/shared/accordion";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import React, {useState} from "react";

export default function FaqContent({
  category,
}: {
  category: NonNullable<FAQS_PAGE_QUERYResult>["category"];
}) {
  const [selectedCategory, setSelectedCategory] = useState(category?.[0]);
  return (
    <>
      <div className="sticky top-[calc(var(--header-height)+2rem)] hidden h-full w-[300px] flex-col items-start lg:flex">
        {category?.map((group) => {
          return (
            <button
              className="border-l-[1.5px] border-accent-40 p-xs transition-all duration-300 first:pt-1 last:pb-1 hover:border-accent"
              key={group._id}
              onClick={() => setSelectedCategory(group)}
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
          {selectedCategory?.title}
        </Heading>
        <div className="flex flex-col gap-m">
          <Accordion
            border={false}
            items={
              selectedCategory?.questions
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
          />
        </div>
      </div>
    </>
  );
}
