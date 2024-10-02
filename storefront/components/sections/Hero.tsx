import type {SectionHero} from "@/types/sanity.generated";

import type {SectionInRenderer} from "./types";

export function Hero(props: SectionHero & SectionInRenderer) {
  return (
    <section
      {...props.rootHtmlAttributes}
      className="px-2 py-16 lg:px-12 lg:py-32"
    >
      <div className="container text-center">
        <h1>{props.title}</h1>
      </div>
    </section>
  );
}
