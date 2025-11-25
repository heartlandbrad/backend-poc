// src/app/[...slug]/page.tsx

// FIX: Define the required type locally to avoid package import issues
type ContentVersionKeys = 'draft' | 'published';

import { storyblokInit, getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import React from 'react';

// Define the components map (must match the map in layout.tsx)
const components = {
  // Using lazy loading for components is a good practice for performance
  page: React.lazy(() => import('@/components/Storyblok/Page')),
  feature: React.lazy(() => import('@/components/Storyblok/Feature')),
  grid: React.lazy(() => import('@/components/Storyblok/Grid')),
  teaser: React.lazy(() => import('@/components/Storyblok/Teaser')),
};

// Initialize Storyblok 
storyblokInit({
  // NOTE: Ensure STORYBLOK_TOKEN is set in Vercel settings and .env.local
  accessToken: process.env.STORYBLOK_TOKEN, 
  // IMPORTANT: apiPlugin must be used in layout.tsx for getStoryblokApi() to work
  use: [], 
  components,
});

/**
 * Fetches the story data from Storyblok based on the provided slug.
 * @param slug The Storyblok slug (e.g., 'home' or 'blog/my-post')
 */
async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error("Storyblok API not initialized or API token is missing.");
  }
  
  // Determine the version: 'draft' for development, 'published' otherwise
  const storyVersion = process.env.NODE_ENV === "development" ? "draft" : "published";

  // Define options and explicitly cast 'version' to the locally defined type
  const options = {
    version: storyVersion as ContentVersionKeys,
    cv: Date.now(), // Cache-busting for reliable development fetching
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, options);
    return data.story;
  } catch (error) {
    console.error("Error fetching story:", error);
    return null;
  }
}

/**
 * Next.js Dynamic Page Component ([...slug]/page.tsx).
 * This component runs on the server to fetch content.
 */
export default async function SlugRoute({ params }: { params: { slug: string[] } }) {
  
  // FIX APPLIED HERE: Use nullish coalescing (??) to ensure params.slug is an array
  const slugArray = params.slug ?? [];
  const fullSlug = slugArray.join('/'); 

  // Handle the root path case: if the slug is empty (which happens if the dynamic
  // router catches the base URL and the /app/page.tsx doesn't run first)
  if (fullSlug.length === 0) {
      // Delegate to the 'home' slug or the root page logic
      const story = await fetchData('home'); 
      if (!story) {
          // If the home story is not found, render a 404
          return <div>Root Content Not Found (404)</div>;
      }
      return <main><StoryblokComponent blok={story.content} /></main>;
  }


  // Fetch data for the story. The 'head' check is removed as it's handled by the new logic.
  const story = await fetchData(fullSlug);
  
  if (!story) {
    // Render a 404 or use next/navigation's notFound()
    return <div>Content Not Found (404)</div>;
  }

  return (
    <main>
      {/* Renders the content structure using the registered components */}
      <StoryblokComponent blok={story.content} />
    </main>
  );
}

// OPTIONAL: Generate static paths for SSG (Static Site Generation)
export async function generateStaticParams() {
    const storyblokApi = getStoryblokApi();
    
    if (!storyblokApi) {
      return [];
    }

    try {
        const { data } = await storyblokApi.get('cdn/links', {
            // Static generation must use the published version
            version: 'published' as ContentVersionKeys,
        });

        // Use nullish coalescing (??) to provide an empty object if data.links is undefined
        const links = Object.values(data.links ?? {}); 

        return links
            // Filter out folders and the default 'home' story
            .filter((link: any) => link.is_folder === false && link.