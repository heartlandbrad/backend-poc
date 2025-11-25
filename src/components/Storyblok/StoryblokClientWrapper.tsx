// src/components/Storyblok/StoryblokClientWrapper.tsx
'use client';

import StoryblokProvider from './StoryblokProvider';
import { StoryblokComponent } from '@storyblok/react';

// This component receives the server-fetched story and renders the client provider.
export default function StoryblokClientWrapper({ story }: { story: any }) {
  // It's client-side code now, so rendering the provider is safe.
  if (!story) return null;

  return (
    <StoryblokProvider story={story}>
      <StoryblokComponent blok={story.content} />
    </StoryblokProvider>
  );
}