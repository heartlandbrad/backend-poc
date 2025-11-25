// src/app/page.tsx

type ContentVersionKeys = 'draft' | 'published';

import { getStoryblokApi } from "@storyblok/react";
import StoryblokClientWrapper from '@/components/Storyblok/StoryblokClientWrapper'; 

// CRITICAL FIX: Standard imports for components
import StoryblokPage from '@/components/Storyblok/Page'; 
import StoryblokFeature from '@/components/Storyblok/Feature';
import StoryblokGrid from '@/components/Storyblok/Grid';
import StoryblokTeaser from '@/components/Storyblok/Teaser';


/**
 * Fetches the story data for the home page from Storyblok.
 */
async function fetchData() {
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error("Storyblok API not initialized."); 
  }

  const storyVersion = process.env.NODE_ENV === "development" ? "draft" : "published";

  const options = {
    version: storyVersion as ContentVersionKeys, 
    cv: Date.now(), 
  };

  try {
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
    return <h1>Root Content Not Found (404)</h1>;
  }

  return (
    <main>
      {/* FINAL FIX: Render the Server-Fetched data inside the Client Wrapper */}
      <StoryblokClientWrapper story={story} />
    </main>
  );
}