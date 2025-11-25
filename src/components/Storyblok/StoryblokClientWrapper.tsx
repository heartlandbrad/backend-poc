// src/components/Storyblok/StoryblokClientWrapper.tsx
'use client';

import StoryblokProvider from './StoryblokProvider';
import { StoryblokComponent } from '@storyblok/react';
import React from 'react';

/**
 * CRITICAL FIX: This component is a Client Boundary. 
 * It receives server-fetched data and safely mounts the StoryblokProvider
 * (which uses client-only hooks) without crashing the server build.
 */
export default function StoryblokClientWrapper({ story }: { story: any }) {
  
  // Renders the component chain safely on the client
  if (!story) return null;

  return (
    <StoryblokProvider story={story}>
      <StoryblokComponent blok={story.content} />
    </StoryblokProvider>
  );
}