import type {PortableTextMarkComponentProps} from "@portabletext/react";

import LocalizedLink from "../shared/localized-link";

type linkData = {
  _key: string;
  _type: "link";
  href: string;
};
export function PtLink(props: PortableTextMarkComponentProps<linkData>) {
  if (!props.value) return <>{props.children}</>;
  return (
    <LocalizedLink className="break-words underline" href={props.value.href}>
      {props.children}
    </LocalizedLink>
  );
}
