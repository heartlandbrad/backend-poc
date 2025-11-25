import { storyblokInit, getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import React from 'react';

// You must define and register your Storyblok components here
const components = {
  page: React.lazy(() => import('@/components/Storyblok/Page')),
  feature: React.lazy(() => import('@/components/Storyblok/Feature')),
  // Add all your Storyblok block components here
};

// Initialize Storyblok if not done in a global layout/wrapper
storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN, // Use environment variable
  use: [],
  components,
});

// Function to fetch the story data
async function fetchData(slug: string) {
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error("Storyblok API not initialized or API token is missing.");
  }

  // Define options for fetching the content
  const options = {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    cv: Date.now(), // Cache-busting for reliable development fetching
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, options);
    return data.story;
  } catch (error) {
    console.error("Error fetching story:", error);
    // You might want to throw a notFound() error here for Next.js 404 handling
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
    // This is where you would render a 404 or use next/navigation's notFound()
    return <div>Content Not Found (404)</div>;
  }

  // IMPORTANT: Since this is a Server Component, we pass the story data to a
  // Client Component (like StoryblokProvider or a wrapper) if you need the Visual Editor.

  return (
    <main>
      {/* This is where you use the StoryblokComponent, which dynamically renders the 
        correct React component based on the Storyblok block type.
      */}
      <StoryblokComponent blok={story.content} />
    </main>
  );
}

// OPTIONAL: Generate static paths for SSG (Static Site Generation)
// This makes the pages fast by building them at compile time.
export async function generateStaticParams() {
    const storyblokApi = getStoryblokApi();
    
    if (!storyblokApi) {
      return [];
    }

    try {
        const { data } = await storyblokApi.get('cdn/links', {
            version: 'published',
            // You might add filter queries here to only get relevant pages
        });

        // The links data is an object, convert it to an array of slugs
        const links = Object.values(data.links); 

        return links
            .filter((link: any) => link.is_folder === false && link.slug !== 'home')
            .map((link: any) => ({
                // Must return an object with the same name as the dynamic segment folder
                slug: link.slug.split('/'), 
            }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}