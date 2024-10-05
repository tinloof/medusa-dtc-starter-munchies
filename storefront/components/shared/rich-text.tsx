import type {
  PortableTextComponents,
  PortableTextProps,
} from "@portabletext/react";
import type {
  ArbitraryTypedObject,
  PortableTextBlock,
} from "@portabletext/types";

import {PortableText} from "@portabletext/react";

import ImageBlock from "../pt.blocks/image";

export const RichText = ({
  value = [],
}: PortableTextProps<ArbitraryTypedObject | PortableTextBlock>) => {
  return (
    <div className="flex flex-col gap-4">
      <PortableText value={value} />
    </div>
  );
};

export const BlogRichText = ({
  value = [],
}: PortableTextProps<ArbitraryTypedObject | PortableTextBlock>) => {
  const components: PortableTextComponents = {
    types: {
      imageBlock: ({value}) => <ImageBlock data={value.image} />,
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <PortableText components={components} value={value} />
    </div>
  );
};
