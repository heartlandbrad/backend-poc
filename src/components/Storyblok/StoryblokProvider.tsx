// src/components/Storyblok/StoryblokProvider.tsx
'use client'; 

import React, { useState } from 'react'; // Import necessary hooks/objects
import { useStoryblokBridge } from '@storyblok/react'; 

// Define the required props structure
interface StoryblokProviderProps {
  story: any; // Story data from the server
  children: React.ReactNode; // The content to wrap
}

/**
 * This component safely loads the Storyblok Visual Editor Bridge and manages 
 * the local state of the story for real-time content updates.
 */
// FIX APPLIED HERE: Use React.FC and the StoryblokProviderProps interface
const StoryblokProvider: React.FC<StoryblokProviderProps> = ({ story: initialStory, children }) => {
  
  // Initialize local state with the story passed from the Server Component
  const [story, setStory] = useState(initialStory); 

  // Use the useStoryblokBridge hook to activate the editor connection.
  useStoryblokBridge(story, (newStory) => {
    // This callback runs whenever the content changes in the Visual Editor
    setStory(newStory);
  });
  
  // Render the most current state of the story
  if (!story) return null;

  return <>{children}</>;
};

export default StoryblokProvider;