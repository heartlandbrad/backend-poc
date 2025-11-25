// src/components/Storyblok/Teaser.tsx
'use client'; // <-- ADD THIS LINE

import { storyblokEditable } from "@storyblok/react";
import React from 'react';

// Define the expected props structure for a Storyblok 'Teaser' component
interface TeaserProps {
  blok: {
    _uid: string;
    headline: string; // A field for a short, enticing headline
    component: string; // Should be 'teaser'
  };
}

/**
 * The Teaser component displays a compelling headline to promote content.
 */
const Teaser: React.FC<TeaserProps> = ({ blok }) => {
  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: '#fff'
      }}
    >
      <h3>{blok.headline}</h3>
    </div>
  );
};

export default Teaser;