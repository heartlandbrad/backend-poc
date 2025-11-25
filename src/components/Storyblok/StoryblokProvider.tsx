// src/components/Storyblok/StoryblokProvider.tsx
'use client'; 

import React, { useState } from 'react'; // <-- Import useState
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
  
  // FIX APPLIED HERE: Initialize local state with the story passed from the Server Component
  const [story, setStory] = useState(initialStory); 

  // Use the useStoryblokBridge hook for the side effect of live updates
  useStoryblokBridge(story, (newStory) => {
    // This callback runs whenever the content changes in the Visual Editor
    setStory(newStory);
  });

  // Render the updated content
  if (!story) return null;

  // Render the children, which will internally use the updated 'story' state 
  // via the StoryblokComponent render chain.
  return <>{children}</>;
};

export default StoryblokProvider;