import Page from "@/components/Storyblok/Page";
import Feature from "@/components/Storyblok/Feature";
import Grid from "@/components/Storyblok/Grid";
import Teaser from "@/components/Storyblok/Teaser";

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    feature: Feature,
    grid: Grid,
    teaser: Teaser
  },
  apiOptions: {
    endpoint: "https://api.storyblok.com",
  },
});