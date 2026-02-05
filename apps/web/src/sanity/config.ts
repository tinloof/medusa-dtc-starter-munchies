const isNode = typeof process !== "undefined" && process.env;

const config = {
  sanity: {
    apiVersion: isNode
      ? process.env.SANITY_API_VERSION
      : import.meta.env.SANITY_API_VERSION || "2023-06-21",
    dataset: isNode
      ? process.env.PUBLIC_SANITY_STUDIO_DATASET
      : import.meta.env.PUBLIC_SANITY_STUDIO_DATASET || "",
    projectId: isNode
      ? process.env.PUBLIC_SANITY_STUDIO_PROJECT_ID
      : import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID || "",
    studioUrl: "/",
  },
  siteName: "Munchies",
};

export default config;
