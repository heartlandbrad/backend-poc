// src/components/storyblok/Teaser.tsx

import React from 'react';
import { storyblokEditable, type StoryblokComponent } from "@storyblok/react/rsc";

// Define the expected block type for a 'teaser' block
type TeaserStoryblok = StoryblokComponent<"teaser"> & {
  tagline?: string;
  intro?: string;
};

interface TeaserProps {
  blok: TeaserStoryblok;
}

export default function Teaser({ blok }: TeaserProps) {
  return (
    <div 
      className="text-center py-16 bg-indigo-50 text-gray-800 rounded-xl mb-12"
      {...storyblokEditable(blok)}
    >
      <p className="text-sm uppercase font-medium text-indigo-600 mb-2">
        {blok.tagline || "Storyblok Powered"}
      </p>
      <h2 className="text-5xl font-extrabold tracking-tight">
        {blok.intro || "Welcome to your Next.js Landing Page"}
      </h2>
    </div>
  );
}