// src/app/[slug]/page.tsx

import { storyblokInit, getStoryblokApi, StoryblokComponent, StoryblokContentVersionKeys } from "@storyblok/react";
import React from 'react';

// Define the components map (must match the map in layout.tsx)
const components = {
  // Using lazy loading for components is a good practice
  page: React.lazy(() => import('@/components/Storyblok/Page')),
  feature: React.lazy(() => import('@/components/Storyblok/Feature')),
  grid: React.lazy(() => import('@/components/Storyblok/Grid')),
  teaser: React.lazy(() => import('@/components/Storyblok/Teaser')),
};

// Initialize Storyblok if not done in a global layout/wrapper
// NOTE: While we initialize here, the root layout.tsx initialization is often sufficient.
storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN, 
  use: [], 
  components,
});

// Function to fetch the story data
async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error("Storyblok API not initialized or API token is missing.");
  }
  
  // 1. Determine the version
  const storyVersion = process.env.NODE_ENV === "development" ? "draft" : "published";

  // 2. Define options and explicitly cast 'version' to resolve Type Error
  const options = {
    version: storyVersion as StoryblokContentVersionKeys, // <-- FIX APPLIED HERE
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

// Next.js Page Component (Server Component)
export default async function SlugRoute({ params }: { params: { slug: string[] } }) {
  // Joins the slug array into a path string (e.g., ['about', 'us'] becomes 'about/us')
  const fullSlug = params.slug.join('/'); 

  // Fetch data for the story. The 'home' path is usually the root slug.
  const story = await fetchData(fullSlug === 'head' ? 'home' : fullSlug);
  
  if (!story) {
    // Render a 404 or use next/navigation's notFound()
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
            // FIX APPLIED HERE: Casting 'published'
            version: 'published' as StoryblokContentVersionKeys, 
        });

        const links = Object.values(data.links); 

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