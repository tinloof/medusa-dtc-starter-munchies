import type {ArrayOfObjectsInputProps} from "sanity";

import {CogIcon} from "@sanity/icons";
import {TextInput} from "@sanity/ui";
import React from "react";
import {defineType} from "sanity";

export const settings = defineType({
  __experimental_formPreviewTitle: false,
  fields: [
    {
      hidden: true,
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      description:
        "Will be used as the sharing image of all pages that don't define a custom one in their SEO fields.",
      name: "fallbackOgImage",
      title: "Fallback sharing image",
      type: "ogImage",
      validation: (Rule) => Rule.required(),
    },
    {
      components: {
        input: ArrayInput,
      },
      name: "redirects",
      of: [
        {
          fields: [
            {
              name: "source",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "destination",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              description:
                "Turn this off if the redirect is temporary and you intend on reverting it in the near future.",
              initialValue: true,
              name: "permanent",
              type: "boolean",
            },
          ],
          name: "redirect",
          preview: {
            prepare(data) {
              return {
                media: () => (data.permanent ? "308" : "307"),
                subtitle: `To: "${data.destination}"`,
                title: `From: "${data.source}"`,
              };
            },
            select: {
              destination: "destination",
              parent: "^",
              permanent: "permanent",
              source: "source",
            },
          },
          title: "Redirect",
          type: "object",
        },
      ],
      options: {
        layout: "list",
      },
      title: "Redirects",
      type: "array",
    },
  ],
  groups: [
    {
      icon: CogIcon,
      name: "integrations",
      title: "Integrations",
    },
  ],
  icon: CogIcon,
  name: "settings",
  options: {
    disableCreation: true,
  },
  preview: {
    prepare: () => ({
      title: "Settings",
    }),
  },
  title: "Settings",
  type: "document",
});

function ArrayInput({members, ...props}: ArrayOfObjectsInputProps) {
  const [search, setSearch] = React.useState("");

  const filteredMembers = !search
    ? members
    : members?.filter(
        (member: any) =>
          !member?.item?.value?.source ||
          !member?.item?.value?.destination ||
          member?.item?.value?.source?.includes(search) ||
          member?.item?.value?.destination?.includes(search),
      );
  return (
    <div style={{display: "grid", gap: 8}}>
      <TextInput
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Filter by source or destination"
        type="text"
        value={search}
      />
      {props.renderDefault({...props, members: filteredMembers})}
    </div>
  );
}
