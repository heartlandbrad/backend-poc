// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
import { storyblokInit } from "@storyblok/react";

// Import all Storyblok components
import StoryblokPage from "@/components/Storyblok/Page"; 
import StoryblokFeature from "@/components/Storyblok/Feature";
import StoryblokGrid from "@/components/Storyblok/Grid";
import StoryblokTeaser from "@/components/Storyblok/Teaser";

const inter = Inter({ subsets: ["latin"] });

// 1. Component Registration
const components = {
  // Maps the Storyblok block name (key) to the React component (value)
  page: StoryblokPage,
  feature: StoryblokFeature, 
  grid: StoryblokGrid,
  teaser: StoryblokTeaser,
};

// 2. Storyblok Initialization
storyblokInit({
  // IMPORTANT: Ensure STORYBLOK_TOKEN is set in your environment variables (.env.local and Vercel)
  accessToken: process.env.STORYBLOK_TOKEN, 
  use: [], 
  components, // Pass the components map
});

// Next.js metadata for SEO
export const metadata: Metadata = {
  title: "Storyblok Next.js App",
  description: "A dynamic site powered by Storyblok and Next.js App Router.",
};

// Root Layout Component (Server Component)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header style={{ padding: '20px', borderBottom: '1px solid #ccc', backgroundColor: '#eee' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Storyblok Next.js Demo Header</p>
        </header>

        {/* The 'children' prop is where all your page content will be rendered. */}
        {children} 
        
        <footer style={{ padding: '20px', borderTop: '1px solid #ccc', marginTop: '40px', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '0.8em' }}>Powered by Next.js and Storyblok | &copy; {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}