// src/app/page.tsx

import { StoryblokStory, getStoryblokApi } from "@storyblok/react/rsc";

// Function to fetch the story data
export async function fetchData() {
  const storyblokApi = getStoryblokApi();

  // Fetch the story with the slug 'home' in draft version
  return await storyblokApi.get(`cdn/stories/home`, { version: "draft" });
}

export default async function Home() {
  const { data } = await fetchData();
  
  if (!data.story) {
    return <div>Story not found. Check your Storyblok space configuration.</div>;
  }

  return (
    <div className="page">
      {/* StoryblokStory automatically resolves the root component */}
      <StoryblokStory story={data.story} />
    </div>
  );
}