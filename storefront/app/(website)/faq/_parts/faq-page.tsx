import type {FAQ_PAGE_QUERYResult} from "@/types/sanity.generated";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";

import FaqContent from "./faq-content";
import SearchBar from "./search-bar";

export default function Faq({data}: {data: NonNullable<FAQ_PAGE_QUERYResult>}) {
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
        <SearchBar placeholder={data.textTranslations?.searchPlaceholder} />
      </section>
      <section className="relative mx-auto flex h-full w-full max-w-max-screen flex-col items-start justify-start gap-xl px-m py-2xl lg:flex-row lg:justify-center lg:py-8xl">
        <FaqContent category={data.category} />
      </section>
    </div>
  );
}
