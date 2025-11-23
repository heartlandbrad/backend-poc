// src/components/storyblok/Page.tsx - MUST be .tsx

import React from 'react';
import { storyblokEditable, StoryblokServerComponent, type StoryblokComponent } from "@storyblok/react/rsc";

// Define the expected block type from Storyblok
type PageStoryblok = StoryblokComponent<"page"> & {
  // Assuming a Page content type has a body field containing other blocks
  body?: StoryblokComponent<string>[]; 
};

interface PageProps {
  blok: PageStoryblok;
}

export default function Page({ blok }: PageProps) {
  // Use Tailwind classes for simple styling
  return (
    <main className="min-h-screen bg-gray-50 p-8" {...storyblokEditable(blok)}>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-2">
        CMS-Driven Page: {blok._uid}
      </h1>
      
      {/* Renders nested blocks dynamically (Feature, Grid, Teaser, etc.) */}
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
      
      {!blok.body || blok.body.length === 0 ? (
        <p className="text-gray-500 italic">
          No components found. Add a component to the 'body' field in Storyblok!
        </p>
      ) : null}
    </main>
  );
}