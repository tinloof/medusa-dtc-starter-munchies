import type {Product} from "@/types/sanity.generated";

import Accordion from "@/components/shared/accordion";

type Props = Pick<Product, "specs">;

export default function ProductSpecs({specs}: Props) {
  return (
    (specs?.length || 0) > 0 && (
      <Accordion
        initialOpen={null}
        items={
          specs
            ?.map(({_key, content, title}) => {
              if (!title || !content) return null;
              return {content, id: _key, title};
            })
            .filter(
              (item): item is {content: string; id: string; title: string} =>
                item !== null,
            ) || []
        }
        type="product"
      />
    )
  );
}
