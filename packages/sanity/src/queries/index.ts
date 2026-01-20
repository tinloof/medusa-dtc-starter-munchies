import { defineQuery } from "groq";

export const HOME_QUERY = defineQuery(`*[_type == "home"][0]`);
