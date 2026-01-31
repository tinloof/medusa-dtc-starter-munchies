import { VideoIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default defineField({
  fields: [
    {
      name: "url",
      title: "URL",
      type: "string",
    },
    {
      name: "poster",
      title: "Thumbnail",
      type: "image",
    },
  ],
  icon: VideoIcon,
  name: "video",
  title: "Video",
  type: "object",
});
