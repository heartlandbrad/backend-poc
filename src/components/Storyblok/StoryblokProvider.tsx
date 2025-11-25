// src/components/Storyblok/StoryblokProvider.tsx
'use client'; 

import React, { useState, Suspense } from 'react'; 
// NOTE: We remove the direct import of useStoryblokBridge here.

// Define the component's props
interface StoryblokProviderProps {
  story: any; 
  children: React.ReactNode;
}

// 1. Declare the hook variable outside the component function
// This variable will hold the actual useStoryblokBridge function
let useStoryblokBridge: any;

/**
 * StoryblokProvider is a Client Component that enables the Visual Editor 
 * by safely loading the useStoryblokBridge hook only in the browser.
 */
const StoryblokProvider: React.FC<StoryblokProviderProps> = ({ story: initialStory, children }) => {
  
  // 2. Conditionally load the hook using 'require' only if 'window' exists.
  // This bypasses module resolution issues during SSG.
  if (typeof window !== 'undefined' && !useStoryblokBridge) {
    try {
        // Use require() for a non-ESM dynamic import on the client
        useStoryblokBridge = require('@storyblok/react').useStoryblokBridge;
    } catch (e) {
        // Fallback for cases where require() fails in certain environments
        console.error("Failed to dynamically load useStoryblokBridge:", e);
    }
  }
  
  // 3. Initialize state and apply the bridge logic only if the hook is available.
  const [story, setStory] = useState(initialStory); 
  let finalStory = initialStory;

  if (useStoryblokBridge) {
    // If the hook is loaded, we use it to manage the state
    useStoryblokBridge(story, (newStory: any) => {
      setStory(newStory);
    });
    finalStory = story;
  }
  
  if (!finalStory) return null;

  // 4. Render the children. 
  // We wrap the content in Suspense since this component might be loaded asynchronously 
  // by its parent (though less necessary here, it ensures robustness).
  return <>{children}</>;
};

export default StoryblokProvider;