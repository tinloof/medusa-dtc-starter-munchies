import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FAQS_PAGE_QUERYResult, FaqEntry } from "@packages/sanity/types";
import FaqContent from "./FaqContent";
import SearchBar from "./SearchBar";

type FaqEntryWithCategory = { categorySlug: string } & FaqEntry;

interface Props {
  data: NonNullable<FAQS_PAGE_QUERYResult>;
}

export default function FaqPage({ data }: Props) {
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const categories = data.category ?? [];
  const queryRef = useRef("");
  const questionToScrollTo = useRef<string | null>(null);
  const initialCategory = categories[0]?.slug?.current || "";

  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<FaqEntryWithCategory[]>([]);
  const [openAnswer, setOpenAnswer] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory ?? "");

  const categoriesMemo = useMemo(() => data.category ?? [], [data.category]);

  const onSearch = useCallback(
    (_query: string) => {
      const search = _query?.toLowerCase().trim();
      queryRef.current = search;
      if (search === "" || !categoriesMemo) {
        setSearchResults([]);
        return;
      }

      const uniqueQuestions = new Set<string>();
      const entries = categoriesMemo.flatMap(
        (category) =>
          category.questions?.map((entry) => ({
            ...entry,
            categorySlug: category.slug?.current || "",
          })) ?? []
      );

      const results = entries.filter((entry) => {
        if (!entry?.question) {
          return false;
        }
        const question = entry.question.toLowerCase().trim();
        if (uniqueQuestions.has(question)) {
          return false;
        }
        uniqueQuestions.add(question);
        return question.includes(search);
      }) as FaqEntryWithCategory[];

      setSearchResults(results);
    },
    [categoriesMemo]
  );

  const scrollToQuestion = (id: string) => {
    const top = document.getElementById(id)?.getBoundingClientRect()?.top;
    if (top) {
      setOpenAnswer(id);
      window.scroll({ behavior: "smooth", top: top - 200 });
    }
  };

  const onClickSearchResult = (result: FaqEntryWithCategory) => {
    setQuery("");
    if (selectedCategory !== result.categorySlug) {
      questionToScrollTo.current = result._id;
      setSelectedCategory(result.categorySlug ?? "");
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
    switch (event.key) {
      case "Escape":
        setQuery("");
        break;
      case "Enter": {
        const activeElement = document.activeElement as HTMLElement;
        const id = activeElement?.id;
        const index = parseInt(id?.split("-").pop() ?? "0", 10);
        onClickSearchResult(searchResults[index]);
        break;
      }
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        const sibling =
          event.key === "ArrowDown" ? "nextElementSibling" : "previousElementSibling";
        const element = document.activeElement?.[sibling] as HTMLElement;
        element?.focus();
        break;
      }
      default:
        return;
    }
  };

  const searchbarKeydownHandler = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const first = searchResultsRef.current?.firstElementChild as HTMLElement;
      first?.focus();

      searchResultsRef.current?.addEventListener("keydown", keydownHandler as any);
      return () => {
        searchResultsRef.current?.removeEventListener("keydown", keydownHandler as any);
      };
    }
  };

  return (
    <div className="scroll-mt-header-height flex-col items-center justify-center">
      <section className="flex w-full flex-col items-center justify-center gap-1 bg-accent px-xl py-8xl text-center text-background">
        <h1 className="heading-l mx-auto w-fit font-serif font-normal leading-[120%] text-heading-xl tracking-[-0.96px] lg:text-heading-5xl lg:tracking-[-1.6px]">
          {data?.title}
        </h1>
        <div className="max-w-[280px] text-balance font-medium font-sans leading-[150%] text-body-base lg:max-w-[320px]">
          {data.description}
        </div>
        <div className="relative flex w-full max-w-[420px] justify-center">
          <SearchBar
            keydownHandler={searchbarKeydownHandler}
            onSearch={onSearch}
            placeholder={data.textTranslations?.searchPlaceholder}
            query={query}
            setQuery={setQuery}
          />
          {queryRef.current.trim() &&
            (searchResults.length > 0 ? (
              <div className="absolute top-full left-0 z-10 mt-[5px] w-full max-w-[420px] rounded-lg border-[1.5px] border-accent bg-background p-2 text-accent">
                <div className="max-h-64 overflow-y-auto outline-none" ref={searchResultsRef}>
                  {searchResults.map((result, index) => (
                    <button
                      className="w-full rounded-lg px-4 py-2 text-start outline-none hover:bg-secondary focus:bg-secondary"
                      id={`search-${result._id}-${index}`}
                      key={`search-${result._id}-${index}`}
                      onClick={() => onClickSearchResult(result)}
                      tabIndex={index + 1}
                      type="button"
                    >
                      <div className="font-medium font-sans leading-[150%] text-body-base">
                        {result.question ? (
                          <HighlightedText query={query} question={result.question} />
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="absolute top-full left-0 z-10 mt-[5px] w-full max-w-[420px] rounded-lg border-[1.5px] border-accent bg-background p-2">
                <div className="w-full px-4 py-2 text-start text-accent opacity-60">
                  {data.textTranslations?.searchNoResults}
                </div>
              </div>
            ))}
        </div>
      </section>
      <section className="relative mx-auto flex h-full w-full max-w-max-screen flex-col items-start justify-start gap-xl px-m py-2xl lg:flex-row lg:justify-center lg:py-8xl">
        <FaqContent
          category={data.category}
          openAnswer={openAnswer}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>
    </div>
  );
}

const HighlightedText = ({ query, question }: { query: string; question: string }) => (
  <>
    {question?.split(new RegExp(`(${query})`, "gi"))?.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span className="bg-accent text-background" key={index.toString()}>
          {part}
        </span>
      ) : (
        part
      )
    )}
  </>
);
