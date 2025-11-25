// src/components/Storyblok/Page.tsx

import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import React from 'react';

// Define the expected props structure for a Storyblok component
interface PageProps {
  blok: {
    _uid: string;
    body: any[]; // An array of Storyblok content blocks
    component: string; // Should be 'page'
  };
}

/**
 * The Page component is a container that loops through the 'body' array 
 * provided by Storyblok and renders the appropriate child component for each block.
 */
const Page: React.FC<PageProps> = ({ blok }) => {
  // storyblokEditable is essential for the Visual Editor to work.
  // It adds the necessary data attributes to the wrapper element.
  return (
    <div {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Page;