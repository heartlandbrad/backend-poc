// src/app/page.tsx

import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";

// Function to fetch the story data for the home page
async function fetchData() {
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    // This check is important as getStoryblokApi() can return null before initialization finishes
    throw new Error("Storyblok API not initialized."); 
  }

  const options = {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
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

// Next.js Root Page Component (Server Component)
export default async function Home() {
  const story = await fetchData();
  
  if (!story) {
    return <h1>Home Page Content Error: Check your Storyblok connection or 'home' slug.</h1>;
  }

  return (
    <main>
      {/* This dynamically renders the correct React component based on the Storyblok block type 
        (which should be mapped to the 'page' component defined in layout.tsx). 
      */}
      <StoryblokComponent blok={story.content} />
    </main>
  );
}