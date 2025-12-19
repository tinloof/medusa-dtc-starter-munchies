const config = {
  sanity: {
    apiVersion: process.env.SANITY_API_VERSION || "2023-06-21",
    dataset: process.env.SANITY_STUDIO_DATASET || "",
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
    studioUrl: "/cms",
  },
  siteName: "Munchies",
};

export default config;
