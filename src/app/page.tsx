// src/app/page.tsx - MUST be .tsx for JSX support

import { StoryblokStory, getStoryblokApi } from "@storyblok/react/rsc";

// Function to fetch the story data
export async function fetchData() {
  const storyblokApi = getStoryblokApi();

  // Fetch the story with the slug 'home' in draft version
  try {
    const response = await storyblokApi.get(`cdn/stories/home`, { version: "draft" });
    return response.data;
  } catch (error) {
    console.error("Error fetching Storyblok data:", error);
    return { story: null };
  }
}

export default async function Home() {
  const { story } = await fetchData();
  
  if (!story) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 p-8">
        <div className="p-6 bg-white rounded-lg shadow-xl text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Story Not Found</h2>
          <p className="text-gray-700">
            Please ensure you have a published story with the slug 
            <code className="bg-gray-200 p-1 rounded mx-1">home</code> 
            in your Storyblok space, and your access token is correct in 
            <code className="bg-gray-200 p-1 rounded mx-1">.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* StoryblokStory automatically resolves the root component (Page.tsx) */}
      <StoryblokStory story={story} />
    </div>
  );
}