"use client";

import type {FAQS_PAGE_QUERYResult, FaqEntry} from "@/types/sanity.generated";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {useEffect, useRef, useState} from "react";

import FaqContent from "./faq-content";
import SearchBar from "./search-bar";

type FaqEntryWithCategory = {categorySlug: string} & FaqEntry;

export default function Faq({
  data,
}: {
  data: NonNullable<FAQS_PAGE_QUERYResult>;
}) {
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const categories = data.category ?? [];

  const queryRef = useRef("");
  const [query, setQuery] = useState<string>("");
  const questionToScrollTo = useRef<null | string>(null);
  const [searchResults, setSearchResults] = useState<FaqEntryWithCategory[]>(
    [],
  );
  const initialCategory = categories[0]?.slug?.current || "";
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory ?? "",
  );

  const onSearch = (query: string) => {
    const search = query?.toLowerCase().trim();
    queryRef.current = search;
    if (search === "" || !data.category) {
      setSearchResults([]);
    } else {
      const uniqueQuestions = new Set<string>();
      const entries = categories.flatMap((category) => {
        return category.questions?.map((entry) => {
          return {
            ...entry,
            categorySlug: category.slug?.current,
          };
        });
      });
      const results = entries
        .filter((entry) => {
          if (entry?.question) {
            const question = entry.question.toLowerCase().trim();
            if (!uniqueQuestions.has(question)) {
              uniqueQuestions.add(question);
              return entry.question.toLowerCase().includes(search);
            }
          }
          return false;
        })
        .filter(Boolean) as unknown as FaqEntryWithCategory[];
      setSearchResults(results);
    }
  };

  const selectCategory = (category: string) => {
    console.log(category);
    setSelectedCategory(category);
  };

  const scrollToQuestion = (id: string) => {
    const top = document.getElementById(id)?.getBoundingClientRect()?.top;
    if (top) {
      setOpenStates((prev) => ({...prev, [id]: true}));
      window.scroll({behavior: "smooth", top: top - 200});
    }
  };

  const onClickSearchResult = (result: FaqEntryWithCategory) => {
    setQuery("");

    if (selectedCategory !== result.categorySlug) {
      questionToScrollTo.current = result._id;
      selectCategory(result.categorySlug ?? "");
    } else {
      scrollToQuestion(result._id);
    }
  };

  useEffect(() => {
    if (questionToScrollTo.current) {
      scrollToQuestion(questionToScrollTo.current);
      questionToScrollTo.current = null;
    }
  }, [selectedCategory]);

  const keydownHandler = (event: KeyboardEvent) => {
    if (!event) return;
    if (event.key === "Escape") {
      setQuery("");
    } else if (event.key === "Enter") {
      const activeElement = document.activeElement as HTMLElement;
      const id = activeElement?.id;
      const index = parseInt(id?.split("-").pop() ?? "0");
      onClickSearchResult(searchResults[index]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();

      const next = document.activeElement?.nextElementSibling as HTMLElement;
      if (next) {
        next.focus();
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = document.activeElement
        ?.previousElementSibling as HTMLElement;
      if (prev) {
        prev.focus();
      }
    }
  };

  const searchbarKeydownHandler = (event: any) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (searchResultsRef.current) {
        const first = searchResultsRef.current
          ?.firstElementChild as HTMLElement;
        first.focus();

        const searchResultsRefCurrent = searchResultsRef.current;
        searchResultsRefCurrent?.addEventListener(
          "keydown",
          keydownHandler as any,
        );

        return () => {
          searchResultsRefCurrent?.removeEventListener(
            "keydown",
            keydownHandler as any,
          );
        };
      }
    }
  };

  return (
    <div className="scroll-mt-header-height flex-col items-center justify-center">
      <section className="flex w-full flex-col items-center justify-center gap-1 bg-accent px-xl py-8xl text-center text-background">
        <Heading
          className="heading-l mx-auto w-fit"
          desktopSize="5xl"
          font="serif"
          mobileSize="xl"
          tag="h1"
        >
          {data?.title}
        </Heading>
        <Body
          className="max-w-[280px] text-balance lg:max-w-[320px]"
          font="sans"
          mobileSize="base"
        >
          {data.description}
        </Body>
        <div className="relative flex w-full max-w-[420px] justify-center">
          <SearchBar
            keydownHandler={searchbarKeydownHandler}
            onSearch={onSearch}
            placeholder={data.textTranslations?.searchPlaceholder}
            query={query}
            setQuery={setQuery}
          />
          {queryRef.current.trim() && (
            <>
              {searchResults.length > 0 ? (
                <div className="absolute left-0 top-full z-10 mt-[5px] w-full max-w-[420px] rounded-lg border-[1.5px] border-accent bg-background p-2 text-accent">
                  <div
                    className="max-h-[16rem] overflow-y-auto outline-none"
                    ref={searchResultsRef}
                    tabIndex={0}
                  >
                    {searchResults.map((result, index) => (
                      <button
                        className="w-full rounded-lg px-4 py-2 text-start outline-none hover:bg-secondary focus:bg-secondary"
                        id={`search-${result._id}-${index}`}
                        key={`search-${result._id}-${index}`}
                        onClick={() => onClickSearchResult(result)}
                        tabIndex={index + 1}
                      >
                        <Body font="sans" mobileSize="base">
                          {result.question && (
                            <HighlitedText
                              query={query}
                              question={result.question}
                            />
                          )}
                        </Body>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="absolute left-0 top-full z-10 mt-[5px] w-full max-w-[420px] rounded-lg border-[1.5px] border-accent bg-background p-2">
                  <div className="w-full px-4 py-2 text-start text-accent">
                    {data.textTranslations?.searchNoResults}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <section className="relative mx-auto flex h-full w-full max-w-max-screen flex-col items-start justify-start gap-xl px-m py-2xl lg:flex-row lg:justify-center lg:py-8xl">
        <FaqContent
          category={data.category}
          openStates={openStates}
          selectCategory={selectCategory}
          selectedCategory={selectedCategory}
          setOpenStates={setOpenStates}
        />
      </section>
    </div>
  );
}

const HighlitedText = ({query, question}: {query: string; question: string}) =>
  question?.split(new RegExp(`(${query})`, "gi"))?.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span className="bg-accent text-background" key={index}>
        {part}
      </span>
    ) : (
      part
    ),
  );
