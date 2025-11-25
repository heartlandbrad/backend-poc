// src/components/Storyblok/Feature.tsx
'use client'; 

import { storyblokEditable } from "@storyblok/react";
import React from 'react';

// Define the expected props structure for a Storyblok 'Feature' component
interface FeatureProps {
  blok: {
    _uid: string;
    name: string;      // A field you might call 'Headline' or 'Title' in Storyblok
    description: string; // A field for descriptive text
    component: string; // Should be 'feature'
  };
}

/**
 * The Feature component renders a single content block with a headline and description.
 */
// FIX APPLIED HERE: Use React.FC and the FeatureProps interface
const Feature: React.FC<FeatureProps> = ({ blok }) => {
  return (
    <div {...storyblokEditable(blok)} style={{ padding: '20px', margin: '10px 0', border: '1px solid #eee' }}>
      <h2>{blok.name}</h2>
      <p>{blok.description}</p>
    </div>
  );
};

export default Feature;