// src/components/Storyblok/StoryblokClientWrapper.tsx
'use client';

import { StoryblokComponent } from '@storyblok/react';
import React, { lazy, Suspense } from 'react';

// 🚨 FINAL FIX: Dynamically import the Provider to ensure its dependencies 
// are only resolved in the browser, not during the server-side build phase.
const LazyStoryblokProvider = lazy(() => import('./StoryblokProvider'));

/**
 * CRITICAL FIX: This component is a Client Boundary. 
 * It receives server-fetched data and safely mounts the StoryblokProvider.
 */
export default function StoryblokClientWrapper({ story }: { story: any }) {
  
  // Renders the component chain safely on the client
  if (!story) return null;

  return (
    // Use Suspense to handle the loading state of the dynamically imported provider
    <Suspense fallback={<div>Loading editor...</div>}>
      <LazyStoryblokProvider story={story}>
        <StoryblokComponent blok={story.content} />
      </LazyStoryblokProvider>
    </Suspense>
  );
}