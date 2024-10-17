import type {
  PortableTextComponents,
  PortableTextProps,
} from "@portabletext/react";
import type {
  ArbitraryTypedObject,
  PortableTextBlock,
} from "@portabletext/types";

import {PortableText} from "@portabletext/react";
import {getPtComponentId} from "@tinloof/sanity-web";

import {PtLink} from "../pt.blocks/link";
import Body from "./typography/body";
import Heading from "./typography/heading";

export const RichText = ({
  value = [],
}: PortableTextProps<ArbitraryTypedObject | PortableTextBlock>) => {
  const components: PortableTextComponents = {
    marks: {
      link: PtLink,
    },
  };
  return (
    <div className="flex flex-col gap-4">
      <PortableText components={components} value={value} />
    </div>
  );
};

export const TextPageRichText = ({
  value = [],
}: PortableTextProps<ArbitraryTypedObject | PortableTextBlock>) => {
  const components: PortableTextComponents = {
    block: {
      h2: (props) => (
        <Heading
          className="mt-4 scroll-mt-[calc(var(--header-height)+2rem)] first:mt-0 lg:scroll-mt-[calc(var(--header-height)+2rem)]"
          desktopSize="xl"
          font="serif"
          id={getPtComponentId(props.value)}
          mobileSize="base"
          tag="h2"
        >
          {props.children}
        </Heading>
      ),
      h3: (props) => (
        <Heading
          className="scroll-mt-header-height mt-4"
          desktopSize="lg"
          font="serif"
          id={getPtComponentId(props.value)}
          mobileSize="xs"
          tag="h3"
        >
          {props.children}
        </Heading>
      ),
      normal: (props) => (
        <Body
          className="font-medium"
          desktopSize="base"
          font="sans"
          mobileSize="sm"
        >
          {props.children}
        </Body>
      ),
    },
    list: {
      bullet: (props) => (
        <ul className="list-disc pl-4 marker:text-base">{props.children}</ul>
      ),
      number: (props) => (
        <ol className="list-decimal pl-4">{props.children}</ol>
      ),
    },
    listItem: {
      bullet: (props) => <li className="">{props.children}</li>,
      number: (props) => (
        <li className="">
          <Body
            className="font-medium"
            desktopSize="base"
            font="sans"
            mobileSize="sm"
          >
            {props.children}
          </Body>
        </li>
      ),
    },
    marks: {
      link: PtLink,
    },
    types: {},
  };

  return (
    <div className="flex flex-col gap-4">
      <PortableText components={components} value={value} />
    </div>
  );
};
