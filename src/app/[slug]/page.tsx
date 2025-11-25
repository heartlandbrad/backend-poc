// src/app/[...slug]/page.tsx

// FIX: Define the required type locally to avoid package import issues
type ContentVersionKeys = 'draft' | 'published';

import { storyblokInit, getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import React from 'react';

// Define the components map (must match the map in layout.tsx)
const components = {
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
 */
async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error("Storyblok API not initialized or API token is missing.");
  }
  
  const storyVersion = process.env.NODE_ENV === "development" ? "draft" : "published";

  const options = {
    version: storyVersion as ContentVersionKeys,
    cv: Date.now(),
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
 */
export default async function SlugRoute({ params }: { params: { slug: string[] } }) {
  
  // FIX: Use nullish coalescing (??) to ensure params.slug is an array
  const slugArray = params.slug ?? [];
  const fullSlug = slugArray.join('/'); 

  // Handle the root path case
  if (fullSlug.length === 0) {
      const story = await fetchData('home'); 
      if (!story) {
          return <div>Root Content Not Found (404)</div>;
      }
      return <main><StoryblokComponent blok={story.content} /></main>;
  }


  // Fetch data for the story.
  const story = await fetchData(fullSlug);
  
  if (!story) {
    return <div>Content Not Found (404)</div>;
  }

  return (
    <main>
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
            version: 'published' as ContentVersionKeys,
        });

        // Use nullish coalescing (??) to provide an empty object if data.links is undefined
        const links = Object.values(data.links ?? {}); 

        return links
            // FIX APPLIED HERE: The line is now complete
            .filter((link: any) => link.is_folder === false && link.slug !== 'home')
            .map((link: any) => ({
                slug: link.slug.split('/'), 
            }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}