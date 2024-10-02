import type {
  ArbitraryTypedObject,
  PortableTextBlock,
} from "@portabletext/types";

import {getDeepLinkId} from "@/utils/ids";

import {sectionsList} from ".";

const SectionsRenderer = ({
  fieldName,
  sections,
}: {
  fieldName: string;
  sections?: (ArbitraryTypedObject | PortableTextBlock)[];
}) => {
  if (!sections?.length) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) => {
        if (!section) {
          return null;
        }

        const Component = sectionsList[section._type];

        if (!Component) {
          return <MissingSection key={section._key} type={section._type} />;
        }

        return (
          <Component
            key={section._key}
            {...section}
            _sectionIndex={index}
            _sections={sections}
            rootHtmlAttributes={{
              "data-section": section._type,
              id: getDeepLinkId({blockKey: section._key, fieldName}),
            }}
          />
        );
      })}
    </>
  );
};

export default SectionsRenderer;

function MissingSection(props: {type?: string}) {
  return (
    <section className="w-full bg-black text-white">
      <div className="container py-10 text-center">
        <div className="rounded-md border-2 border-dashed border-gray-400 px-5 py-10">
          <div>
            The section component of type{" "}
            {props.type && (
              <strong className="px-2 text-xl">{props.type}</strong>
            )}{" "}
            does not exist yet.
          </div>
        </div>
      </div>
    </section>
  );
}
