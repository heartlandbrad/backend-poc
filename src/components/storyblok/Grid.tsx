// src/components/storyblok/Grid.tsx

import React from 'react';
import { storyblokEditable, StoryblokServerComponent, type StoryblokComponent } from "@storyblok/react/rsc";

// Define the expected block type for a 'grid' block
type GridStoryblok = StoryblokComponent<"grid"> & {
  columns?: StoryblokComponent<string>[]; // Array of nested blocks
};

interface GridProps {
  blok: GridStoryblok;
}

export default function Grid({ blok }: GridProps) {
  return (
    <div className="py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900" {...storyblokEditable(blok)}>
            Grid Container
        </h2>
        
        {/* Iterate over and render nested components (like Feature blocks) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blok.columns?.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </div>

        {blok.columns?.length === 0 ? (
            <p className="text-center text-gray-500 italic mt-4">
                Add content blocks (like Feature) to this Grid in Storyblok.
            </p>
        ) : null}
    </div>
  );
}