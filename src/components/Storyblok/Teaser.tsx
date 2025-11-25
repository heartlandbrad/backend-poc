// src/components/Storyblok/Teaser.tsx
'use client'; 

import { storyblokEditable } from "@storyblok/react";
import React from 'react';

// 1. Define the props structure for a Storyblok 'Teaser' component
interface TeaserProps {
  blok: {
    _uid: string;
    headline: string; // The field you pull from Storyblok
    component: string; // Should be 'teaser'
  };
}

/**
 * The Teaser component displays a compelling headline.
 */
// 2. Use React.FC and the TeaserProps interface for proper typing
const Teaser: React.FC<TeaserProps> = ({ blok }) => {
  return (
    // 3. Include storyblokEditable for Visual Editor compatibility
    <div 
      {...storyblokEditable(blok)} 
      className="teaser"
      style={{
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: '#fff'
      }}
    >
      <h2>{blok.headline}</h2>
    </div>
  );
};

export default Teaser;