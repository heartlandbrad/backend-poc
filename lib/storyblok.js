"use strict";
// src/lib/storyblok.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryblokServerRenderer = exports.getStoryblokApi = void 0;
var rsc_1 = require("@storyblok/react/rsc");
// --- Import all your Storyblok Components Here ---
// We use a Page and a Feature component as examples.
var Page_1 = require("@/components/storyblok/Page");
/**
 * Maps Storyblok's schema component names (keys) to their corresponding
 * Next.js/React component imports (values).
 */
var StoryblokComponents = {
    page: Page_1.default,
};
// Check if we are running in the browser (client-side)
var isBrowser = typeof window !== 'undefined';
/**
 * Initializes the Storyblok SDK and returns the API instance.
 * This should be called in your root `layout.tsx`.
 * * We use the 'rsc' (React Server Component) version of the SDK, which
 * is required for the App Router structure.
 */
exports.getStoryblokApi = (0, rsc_1.storyblokInit)({
    // The Preview Access Token from .env.local
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
    // Use the API plugin for advanced features
    use: [rsc_1.apiPlugin],
    // Register the map of component names to React components
    components: StoryblokComponents,
    // Configuration for the Storyblok Bridge (Visual Editor)
    // The Storyblok Bridge is only needed on the client side (browser)
    bridge: isBrowser,
});
// --- Export the core component for dynamic rendering ---
/**
 * A utility component that renders the correct React component
 * based on the Storyblok block type.
 */
exports.StoryblokServerRenderer = rsc_1.StoryblokServerComponent;
