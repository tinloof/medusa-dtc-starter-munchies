import {CiVideoOn} from "react-icons/ci";
import {defineField} from "sanity";

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
  icon: CiVideoOn,
  name: "video",
  title: "Video",
  type: "object",
});
