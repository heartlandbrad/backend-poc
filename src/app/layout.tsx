// src/app/layout.tsx

import type { Metadata } from "next";
import React from 'react'; // Ensure React is imported for React.ReactNode
import StoryblokProvider from "@/components/Storyblok/StoryblokProvider";
// Import Storyblok functions needed for server-side initialization
import { storyblokInit, apiPlugin } from "@storyblok/react"; 

// --- Import all components for global registration ---
import StoryblokPage from "@/components/Storyblok/Page"; 
import StoryblokFeature from "@/components/Storyblok/Feature";
import StoryblokGrid from "@/components/Storyblok/Grid";
import StoryblokTeaser from "@/components/Storyblok/Teaser";

// 1. Component Registration
const components = {
  page: StoryblokPage,
  feature: StoryblokFeature, 
  grid: StoryblokGrid,
  teaser: StoryblokTeaser,
};

// 2. Storyblok Initialization (for SSR/API client)
storyblokInit({
  // Access token must be present in Vercel/local environment
  accessToken: process.env.STORYBLOK_TOKEN, 
  // We use apiPlugin to enable server-side fetching via getStoryblokApi
  use: [apiPlugin], 
  components, 
});
// ----------------------------------------------------

// Example Metadata (optional)
export const metadata: Metadata = {
  title: "Storyblok Next.js App",
  description: "A dynamic site.",
};

// Root Layout Component (Server Component)
export default function RootLayout({ 
  children, 
}: { 
  children: React.ReactNode; // <-- FIX: Define the children type here
}) {
  return (
    // NOTE: The StoryblokProvider typically wraps only the children/body content,
    // not the <html> tag, but depending on the SDK version, this structure might be acceptable.
    // However, the cleanest approach is to wrap only the React content.
    <html lang="en">
      <body>
        <header style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
            <p style={{ margin: 0 }}>Global Navigation</p>
        </header>

        {/* The client-side provider wraps the content delivered by the pages */}
        <StoryblokProvider>
            {children}
        </StoryblokProvider>
        
        <footer style={{ padding: '20px', borderTop: '1px solid #ccc' }}>
            <p>&copy; {new Date().getFullYear()} My Storyblok Site</p>
        </footer>
      </body>
    </html>
  );
}