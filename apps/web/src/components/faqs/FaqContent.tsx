import type { FAQS_PAGE_QUERYResult } from "@packages/sanity/types";
import Accordion from "./Accordion";
import Select from "./Select";

type FaqContentProps = {
  category: NonNullable<FAQS_PAGE_QUERYResult>["category"];
  openAnswer: string | null;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export default function FaqContent({
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
      <div className="sticky top-[calc(var(--header-height)+2rem)] hidden h-full w-[300px] flex-col items-start lg:flex">
        {category?.map((group) => (
          <button
            className="border-accent-40 border-l-[1.5px] p-xs transition-all duration-300 first:pt-1 last:pb-1 hover:border-accent"
            key={group._id}
            onClick={() => setSelectedCategory(group.slug?.current || "")}
            type="button"
          >
            <div className="font-medium font-sans leading-[150%] text-body-sm">
              {group.title}
            </div>
          </button>
        ))}
      </div>
      <div className="w-full lg:max-w-[690px]">
        <Select
          className="mb-m w-full py-[18px] lg:hidden"
          options={
            category?.map((group) => ({
              label: group.title || "",
              value: group.slug?.current || "",
            })) || []
          }
          placeholder={selectedCategory}
          setOption={setSelectedCategory}
        />
        <h2 className="mb-2 hidden font-serif font-normal leading-[120%] text-heading-lg tracking-[-0.8px] lg:block">
          {currentCategory?.title}
        </h2>
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
                  (item): item is { content: string; id: string; title: string } =>
                    item !== null
                ) || []
            }
          />
        </div>
      </div>
    </>
  );
}
