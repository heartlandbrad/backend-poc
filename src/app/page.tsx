// src/app/page.tsx
// Since you are not using a slug, this page renders the root path '/'.

import { getStoryblokApi, StoryblokComponent } from '@storyblok/react';
import StoryblokClientWrapper from '@/components/Storyblok/StoryblokClientWrapper'; 

// FIX: Define the required type locally
type ContentVersionKeys = 'draft' | 'published';

/**
 * Fetches the story data for the home page.
 * NOTE: The storyblokApi is initialized globally in layout.tsx.
 */
async function fetchData() {
  const storyblokApi = getStoryblokApi();
  
  if (!storyblokApi) {
    throw new Error("Storyblok API not initialized.");
  }

  // Determine the version: 'draft' for dev/editor, 'published' otherwise
  const storyVersion = process.env.NODE_ENV === "development" ? "draft" : "published";

  const options = {
    version: storyVersion as ContentVersionKeys,
    cv: Date.now(),
  };

  // FIX: Access the CDN directly.
  const { data } = await storyblokApi.get(`cdn/stories/home`, options);
  return data.story;
}


export default async function Home() {
  // 1. Fetch data directly within the Server Component
  const story = await fetchData();
  
  if (!story) {
    return (
      <div className="page">
        <h1>Error: Home Story Not Found</h1>
        <p>Please check your Storyblok token and ensure the story with slug 'home' is published.</p>
      </div>
    );
  }

  return (
    <main className="page">
      {/* 2. FIX: Render the story inside the Client Wrapper for the Visual Editor. */}
      {/* The Wrapper receives the entire story object. */}
      <StoryblokClientWrapper story={story}>
        {/* The StoryblokClientWrapper will handle rendering the StoryblokComponent */}
        {/* We do not render the StoryblokComponent directly here. */}
      </StoryblokClientWrapper>
    </main>
  );
}