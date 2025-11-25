// src/components/Storyblok/StoryblokProvider.tsx
'use client'; // <-- This directive is CRUCIAL for Next.js App Router

import React, { useEffect } from 'react';
import { useStoryblokBridge } from '@storyblok/react';

// Define the component's props
interface StoryblokProviderProps {
  story: any; // The initial story data passed from the Server Component
  children: React.ReactNode;
}

/**
 * StoryblokProvider is a Client Component that enables the Visual Editor 
 * and handles live changes via the useStoryblokBridge hook.
 */
const StoryblokProvider: React.FC<StoryblokProviderProps> = ({ story: initialStory, children }) => {
  
  // 1. Use the useStoryblokBridge hook
  const [story, setStory] = useStoryblokBridge(initialStory, (newStory) => {
    // This callback runs whenever the content changes in the Visual Editor
    setStory(newStory);
  });

  // 2. Check for the story object before rendering children
  // This ensures we always render the latest version of the story content
  if (!story) return null;

  // 3. Clone and pass the updated story object down to children
  // (In your current setup, this component will wrap the StoryblokComponent)
  // NOTE: If you are wrapping a complex structure, you might adjust how 'children' is used.
  // For now, we simply return the children, which will internally use the story state.
  return <>{children}</>;
};

export default StoryblokProvider;