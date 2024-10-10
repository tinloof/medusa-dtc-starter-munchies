import type {PortableTextMarkComponentProps} from "@portabletext/react";

import Link from "next/link";

type linkData = {
  _key: string;
  _type: "link";
  href: string;
};
export function PtLink(props: PortableTextMarkComponentProps<linkData>) {
  if (!props.value) return <>{props.children}</>;
  return (
    <Link className="break-words underline" href={props.value.href}>
      {props.children}
    </Link>
  );
}
