// src/components/Storyblok/Page.tsx
'use client'; 

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React from 'react';

// 1. Define the props structure for a Storyblok 'Page' component (Content Type)
interface PageProps {
  blok: {
    _uid: string;
    body: any[]; // The array of nested blocks (features, grids, teasers)
    component: string; // Should be 'page'
  };
}

/**
 * The Page component is the root container for all content blocks.
 * It iterates through the 'body' field and renders the correct component for each block.
 */
// 2. Use React.FC and the PageProps interface for proper typing
const Page: React.FC<PageProps> = ({ blok }) => {
  return (
    // 3. Include storyblokEditable for Visual Editor compatibility
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        // 4. Use the standard StoryblokComponent
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default Page;