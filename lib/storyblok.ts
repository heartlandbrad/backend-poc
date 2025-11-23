// src/lib/storyblok.ts

import {
  apiPlugin,
  storyblokInit,
  StoryblokServerComponent,
  type StoryblokBridgeLoader,
} from '@storyblok/react/rsc';

// --- Import all your Storyblok Components Here ---
// We use a Page and a Feature component as examples.
import Page from "@/components/storyblok/Page";

/**
 * Maps Storyblok's schema component names (keys) to their corresponding 
 * Next.js/React component imports (values).
 */
const StoryblokComponents = {
  page: Page,
};

// Check if we are running in the browser (client-side)
const isBrowser = typeof window !== 'undefined';

/**
 * Initializes the Storyblok SDK and returns the API instance.
 * This should be called in your root `layout.tsx`.
 * * We use the 'rsc' (React Server Component) version of the SDK, which 
 * is required for the App Router structure.
 */
export const getStoryblokApi = storyblokInit({
  // The Preview Access Token from .env.local
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  
  // Use the API plugin for advanced features
  use: [apiPlugin],
  
  // Register the map of component names to React components
  components: StoryblokComponents,

  // Configuration for the Storyblok Bridge (Visual Editor)
  // The Storyblok Bridge is only needed on the client side (browser)
  bridge: isBrowser,

}) as ReturnType<typeof storyblokInit> & {
    // Add the StoryblokBridgeLoader type for the bridge function
    bridge: StoryblokBridgeLoader;
};

// --- Export the core component for dynamic rendering ---
/**
 * A utility component that renders the correct React component 
 * based on the Storyblok block type.
 */
export const StoryblokServerRenderer = StoryblokServerComponent;

// --- Export the component map for type safety (optional but helpful) ---
export type ComponentKeys = keyof typeof StoryblokComponents;