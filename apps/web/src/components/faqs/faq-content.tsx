import type { FAQS_PAGE_QUERY_RESULT } from "sanity.types";
import { Accordion } from "@/components/shared/accordion";
import { Select } from "@/components/shared/select";
import { Body } from "@/components/shared/typography/body";
import { Heading } from "@/components/shared/typography/heading";

interface FaqContentProps {
  category: NonNullable<FAQS_PAGE_QUERY_RESULT>["category"];
  openAnswer: null | string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function FaqContent({
  category,
  openAnswer,
  selectedCategory,
  setSelectedCategory,
}: FaqContentProps) {
  const currentCategory = category?.find(
    (_category) => _category.slug?.current === selectedCategory
  );
  return (
    <>
      <div className="sticky top-[calc(var(--header-height)+2rem)] hidden h-full w-75 flex-col items-start lg:flex">
        {category?.map((group) => (
          <button
            className="border-accent-40 border-l-[1.5px] p-xs transition-all duration-300 first:pt-1 last:pb-1 hover:border-accent"
            key={group._id}
            onClick={() => setSelectedCategory(group.slug?.current || "")}
            type="button"
          >
            <Body font="sans" mobileSize="sm">
              {group.title}
            </Body>
          </button>
        ))}
      </div>
      <div className="w-full lg:max-w-172.5">
        <Select
          className="mb-m w-full py-4.5 lg:hidden"
          options={
            category?.map((group) => ({
              label: group.title || "",
              value: group.slug?.current || "",
            })) || []
          }
          placeholder={selectedCategory}
          setOption={setSelectedCategory}
          variant="outline"
        />
        <Heading
          className="mb-2 hidden font-normal lg:block"
          font="serif"
          mobileSize="lg"
          tag="h2"
        >
          {currentCategory?.title}
        </Heading>
        <div className="flex flex-col gap-m">
          <Accordion
            border={false}
            initialOpen={openAnswer}
            items={
              currentCategory?.questions
                ?.map((item) => {
                  if (!(item?.question && item?.answer)) {
                    return null;
                  }
                  return {
                    content: item.answer,
                    id: item._id,
                    title: item.question,
                  };
                })
                .filter(
                  (
                    item
                  ): item is { content: string; id: string; title: string } =>
                    item !== null
                ) || []
            }
          />
        </div>
      </div>
    </>
  );
}
