// src/app/[slug]/page.tsx

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
  accessToken: process.env.STORYBLOK_TOKEN, 
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
    version: storyVersion as ContentVersionKeys, // <-- FIX APPLIED HERE
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
  // Join the dynamic slug array into a path string (e.g., ['about', 'us'] -> 'about/us')
  const fullSlug = params.slug.join('/'); 

  // The 'head' slug was a placeholder in the initial error, typically 'home' is the root
  const story = await fetchData(fullSlug === 'head' ? 'home' : fullSlug);
  
  if (!story) {
    // Render a 404 or use Next.js's notFound()
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
            version: 'published' as ContentVersionKeys, // <-- FIX APPLIED HERE
        });

        const links = Object.values(data.links); 

        return links
            .filter((link: any) => link.is_folder === false && link.slug !== 'home')
            .map((link: any) => ({
                // Must return an object with the same name as the dynamic segment folder
                slug: link.slug.split('/'), 
            }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}