// src/app/page.tsx

// FIX: Define the required type locally to avoid package import issues
type ContentVersionKeys = 'draft' | 'published';

import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";

/**
 * Fetches the story data for the home page from Storyblok.
 */
async function fetchData() {
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error("Storyblok API not initialized."); 
  }

  // Determine the version: 'draft' for development, 'published' otherwise
  const storyVersion = process.env.NODE_ENV === "development" ? "draft" : "published";

  // Define options and explicitly cast 'version' to the locally defined type
  const options = {
    // FIX APPLIED HERE: Type cast the version string
    version: storyVersion as ContentVersionKeys, 
    cv: Date.now(), 
  };

  try {
    // Request the story with the slug 'home' (standard for Storyblok root pages)
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
    return <h1>Home Page Content Error: Check your Storyblok connection or 'home' slug.</h1>;
  }

  return (
    <main>
      {/* This dynamically renders the correct React component */}
      <StoryblokComponent blok={story.content} />
    </main>
  );
}