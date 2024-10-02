import type {BadgeTone} from "@sanity/ui";
import type {TextInputProps, TextOptions} from "sanity";

import {Badge, Flex, Stack} from "@sanity/ui";
import React from "react";
import {useFormValue} from "sanity";

type CountedTextOptions = TextOptions & {
  maxLength?: number;
  minLength?: number;
};

function CharacterCount(props: CountedTextOptions & {value?: string}) {
  if (!props.maxLength && !props.minLength) {
    return null;
  }

  const {value = ""} = props;

  const maxPercentage =
    props.maxLength && (value.length / props.maxLength) * 100;
  let tone: BadgeTone = "primary";
  if (maxPercentage && maxPercentage > 100) {
    tone = "critical";
  } else if (maxPercentage && maxPercentage > 75) {
    tone = "caution";
  }

  if (props.minLength && value.length < props.minLength) {
    tone = "caution";
  }
  return (
    <Badge mode="outline" tone={tone}>
      {value.length} / {props.maxLength}
    </Badge>
  );
}

export function InputWithCharacterCount(props: TextInputProps) {
  const document = useFormValue([]);

  if (!document) {
    return null;
  }

  const {_type, name, title} = document as {
    _type: string;
    name: string;
    title?: string;
  };

  const defaultTitle =
    props.id === "seo.title"
      ? ["organization", "person", "podcastShow"].includes(_type)
        ? name
        : title
      : undefined;

  props.elementProps.placeholder = defaultTitle;

  return (
    <Stack space={2}>
      {props.renderDefault(props)}
      <Flex justify="flex-end">
        <CharacterCount
          value={props.value}
          {...((props.schemaType.options || {}) as CountedTextOptions)}
        />
      </Flex>
    </Stack>
  );
}
