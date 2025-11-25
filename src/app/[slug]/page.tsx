// src/app/[...slug]/page.tsx

// FIX: Define the required type locally
type ContentVersionKeys = 'draft' | 'published';

import { storyblokInit, getStoryblokApi } from "@storyblok/react";
import React from 'react';
// FINAL FIX: Standard import of the client wrapper component
import StoryblokClientWrapper from '@/components/Storyblok/StoryblokClientWrapper'; 

// CRITICAL FIX: Standard imports for components (stabilizes SSG)
import StoryblokPage from '@/components/Storyblok/Page'; 
import StoryblokFeature from '@/components/Storyblok/Feature';
import StoryblokGrid from '@/components/Storyblok/Grid';
import StoryblokTeaser from '@/components/Storyblok/Teaser';


// Define the components map (must match the map in layout.tsx)
const components = {
  // Use standard imports here
  page: StoryblokPage,
  feature: StoryblokFeature,
  grid: StoryblokGrid,
  teaser: StoryblokTeaser,
};

// Initialize Storyblok 
storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN, 
  // IMPORTANT: Only apiPlugin here (bridge is handled by the client component)
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
  
  const slugArray = params.slug ?? [];
  const fullSlug = slugArray.join('/'); 

  // Handle the root path case
  if (fullSlug.length === 0) {
      const story = await fetchData('home'); 
      if (!story) {
          return <div>Root Content Not Found (404)</div>;
      }
      return <main><StoryblokClientWrapper story={story} /></main>; 
  }

  // Fetch data for the story.
  const story = await fetchData(fullSlug);
  
  if (!story) {
    return <div>Content Not Found (404)</div>;
  }

  return (
    <main>
      {/* Renders the Server-Fetched data inside the Client Wrapper */}
      <StoryblokClientWrapper story={story} /> 
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

        const links = Object.values(data.links ?? {}); 

        return links
            .filter((link: any) => link.is_folder === false && link.slug !== 'home')
            .map((link: any) => ({
                slug: link.slug.split('/'), 
            }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}