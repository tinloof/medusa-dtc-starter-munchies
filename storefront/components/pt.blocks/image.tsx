import {cx} from "cva";

import type {SanityImageProps} from "../shared/sanity-image";

import {SanityImage} from "../shared/sanity-image";

export default function ImageBlock(props: SanityImageProps) {
  return (
    <div className="mt-10 flex flex-col">
      <div className={cx("overflow-hidden rounded-lg")}>
        <SanityImage data={props.data} />
      </div>
    </div>
  );
}
