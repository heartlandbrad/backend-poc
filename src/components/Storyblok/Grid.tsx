// src/components/Storyblok/Grid.tsx

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React from 'react';

// 1. Define the props structure for a Storyblok 'Grid' component
interface GridProps {
  blok: {
    _uid: string;
    columns: any[]; // The array of nested blocks
    component: string; // Should be 'grid'
  };
}

/**
 * The Grid component acts as a layout container, mapping over an array of nested blocks ('columns').
 */
// 2. Use React.FC and the GridProps interface for proper typing
const Grid: React.FC<GridProps> = ({ blok }) => {
  return (
    // 3. Use storyblokEditable for the Visual Editor
    <div 
      {...storyblokEditable(blok)} 
      className="grid"
      style={{ display: 'flex', gap: '20px', padding: '30px', border: '1px dashed #999', backgroundColor: '#f9f9f9' }}
    >
      {/* 4. Use the standard StoryblokComponent */}
      {blok.columns?.map((nestedBlok) => (
        <div key={nestedBlok._uid} style={{ flex: 1, minWidth: '200px' }}>
          <StoryblokComponent blok={nestedBlok} />
        </div>
      ))}
    </div>
  );
};

export default Grid;