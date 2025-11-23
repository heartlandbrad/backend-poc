// src/lib/storyblok.ts

import {
  apiPlugin,
  storyblokInit,
  StoryblokServerComponent,
  type StoryblokBridgeLoader,
} from '@storyblok/react/rsc'; // This import is now correctly resolved by tsconfig

// --- Import all your Storyblok Components Here ---
// These imports are now resolved by the "@/components..." path alias.
import Page from "@/components/storyblok/Page";
import Feature from "@/components/storyblok/Feature";
import Grid from "@/components/storyblok/Grid";
import Teaser from "@/components/storyblok/Teaser";

/**
 * Maps Storyblok's schema component names (keys) to their corresponding 
 * Next.js/React component imports (values).
 */
const StoryblokComponents = {
  page: Page,
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
};

// Check if we are running in the browser (client-side)
const isBrowser = typeof window !== 'undefined';

/**
 * Initializes the Storyblok SDK and returns the API instance.
 */
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  components: StoryblokComponents,
  bridge: isBrowser, // Load bridge only in browser for Visual Editor
}) as ReturnType<typeof storyblokInit> & {
    bridge: StoryblokBridgeLoader;
};

// --- Export the core component for dynamic rendering ---
export const StoryblokServerRenderer = StoryblokServerComponent;