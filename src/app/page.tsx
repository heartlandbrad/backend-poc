// src/app/page.tsx

// FIX: Define the required type locally
type ContentVersionKeys = 'draft' | 'published';

import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import StoryblokProvider from '@/components/Storyblok/StoryblokProvider'; // <-- NEW IMPORT

/**
 * Fetches the story data for the home page from Storyblok.
 */
async function fetchData() {
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error("Storyblok API not initialized."); 
  }

  // Determine the version: 'draft' for development (for editor), 'published' otherwise
  const storyVersion = process.env.NODE_ENV === "development" ? "draft" : "published";

  const options = {
    version: storyVersion as ContentVersionKeys, 
    cv: Date.now(), 
  };

  try {
    // Request the story with the slug 'home'
    const { data } = await storyblokApi.get(`cdn/stories/home`, options); 
    return data.story;
  } catch (error) {
    console.error("Error fetching home story:", error);
    return null;
  }
}

/**
 * Next.js Root Page Component (Server Component)
 */
export default async function Home() {
  const story = await fetchData();
  
  if (!story) {
    return <h1>Home Page Content Error: Check your Storyblok connection.</h1>;
  }

  return (
    <main>
      {/* WRAPPER APPLIED: Pass the fetched story to the client component provider */}
      <StoryblokProvider story={story}>
        <StoryblokComponent blok={story.content} />
      </StoryblokProvider>
    </main>
  );
}