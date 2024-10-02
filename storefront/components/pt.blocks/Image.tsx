import {cx} from "cva";

import type {SanityImageProps} from "../SanityImage";

import {SanityImage} from "../SanityImage";

export default function ImageBlock(props: SanityImageProps) {
  return (
    <div className="mt-10 flex flex-col">
      <div className={cx("overflow-hidden rounded-lg")}>
        <SanityImage data={props.data} />
      </div>
    </div>
  );
}
