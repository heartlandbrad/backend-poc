// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
// FIX: Import the apiPlugin
import { storyblokInit, apiPlugin } from "@storyblok/react"; 

// Import all Storyblok components
import StoryblokPage from "@/components/Storyblok/Page"; 
import StoryblokFeature from "@/components/Storyblok/Feature";
import StoryblokGrid from "@/components/Storyblok/Grid";
import StoryblokTeaser from "@/components/Storyblok/Teaser";

const inter = Inter({ subsets: ["latin"] });

// 1. Component Registration
const components = {
  page: StoryblokPage,
  feature: StoryblokFeature, 
  grid: StoryblokGrid,
  teaser: StoryblokTeaser,
};

// 2. Storyblok Initialization
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN, 
  // FIX APPLIED HERE: Add apiPlugin to the use array
  use: [apiPlugin], 
  components, 
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

        {children} 
        
        <footer style={{ padding: '20px', borderTop: '1px solid #ccc', marginTop: '40px', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '0.8em' }}>Powered by Next.js and Storyblok | &copy; {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}