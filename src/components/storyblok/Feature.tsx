// src/components/storyblok/Feature.tsx

import React from 'react';
import { storyblokEditable, type StoryblokComponent } from "@storyblok/react/rsc";

// Define the expected block type for a 'feature' block
type FeatureStoryblok = StoryblokComponent<"feature"> & {
  headline?: string;
  // You can add more fields here, e.g., icon: string;
};

interface FeatureProps {
  blok: FeatureStoryblok;
}

export default function Feature({ blok }: FeatureProps) {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500 transition hover:shadow-lg"
      {...storyblokEditable(blok)}
    >
      <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
        {blok.headline || "Default Feature Headline"}
      </h3>
      <p className="text-gray-600">
        This is a placeholder for your feature content. Edit the 'headline' field in Storyblok to see live changes.
      </p>
    </div>
  );
}