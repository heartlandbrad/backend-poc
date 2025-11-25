// src/app/layout.tsx

import type { Metadata } from "next";
import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css"; 
// Import Storyblok dependencies for server-side initialization
import { storyblokInit, apiPlugin } from "@storyblok/react"; 

// --- Import all components for global registration ---
import StoryblokPage from "@/components/Storyblok/Page"; 
import StoryblokFeature from "@/components/Storyblok/Feature";
import StoryblokGrid from "@/components/Storyblok/Grid";
import StoryblokTeaser from "@/components/Storyblok/Teaser";


const inter = Inter({ subsets: ["latin"] });

// 1. Component Registration (Used by Storyblok SDK globally)
const components = {
  page: StoryblokPage,
  feature: StoryblokFeature, 
  grid: StoryblokGrid,
  teaser: StoryblokTeaser,
};

// 2. Storyblok Initialization (Runs once on the server/build)
storyblokInit({
  // Access token must be present in environment variables
  accessToken: process.env.STORYBLOK_TOKEN, 
  // Enables server-side fetching via getStoryblokApi
  use: [apiPlugin], 
  components, 
});

// Next.js metadata for SEO
export const metadata: Metadata = {
  title: "Storyblok Next.js App",
  description: "A dynamic site.",
};

// Root Layout Component (Server Component)
export default function RootLayout({ 
  children, 
}: { 
  children: React.ReactNode; // TypeScript Fix
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header style={{ padding: '20px', borderBottom: '1px solid #ccc', backgroundColor: '#eee' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Global Header</p>
        </header>

        {/* CRITICAL FIX: The StoryblokProvider is REMOVED from here. 
           It is wrapped around {children} in the individual route pages (page.tsx). */}
        {children} 
        
        <footer style={{ padding: '20px', borderTop: '1px solid #ccc', marginTop: '40px', textAlign: 'center' }}>
            <p>&copy; {new Date().getFullYear()} My Storyblok Site</p>
        </footer>
      </body>
    </html>
  );
}