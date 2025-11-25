// src/components/Storyblok/Grid.tsx
'use client'; // <-- ADD THIS LINE

import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import React from 'react';

// Define the expected props structure for a Storyblok 'Grid' component
interface GridProps {
  blok: {
    _uid: string;
    columns: any[]; // An array of Storyblok content blocks to be placed in the grid
    component: string; // Should be 'grid'
  };
}

/**
 * The Grid component acts as a layout container. It renders its child blocks (columns) 
 * in a row, using basic Flexbox for demonstration.
 */
const Grid: React.FC<GridProps> = ({ blok }) => {
  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        display: 'flex',
        gap: '20px',
        padding: '30px',
        border: '1px dashed #999',
        backgroundColor: '#f9f9f9'
      }}
    >
      {/* Map over the 'columns' array and render the child components */}
      {blok.columns?.map((nestedBlok) => (
        <div key={nestedBlok._uid} style={{ flex: 1, minWidth: '200px' }}>
          <StoryblokComponent blok={nestedBlok} />
        </div>
      ))}
    </div>
  );
};

export default Grid;