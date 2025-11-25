// src/components/Storyblok/StoryblokProvider.tsx
'use client'; 

import React, { useState } from 'react'; // <-- Keep useState

// 🚨 CRITICAL FIX: We are going back to the simplest structure possible.
// We will only use the useStoryblokBridge hook when the component is mounted (client-side).
// We'll use a local state to hold the hook's function.

let useStoryblokBridge: any;
let useStoryblokBridgeLoaded = false;

// Define the component's props
interface StoryblokProviderProps {
  story: any; 
  children: React.ReactNode;
}

const StoryblokProvider: React.FC<StoryblokProviderProps> = ({ story: initialStory, children }) => {
  
  // Initialize state with the story passed from the Server Component
  const [story, setStory] = useState(initialStory); 
  
  // Use useEffect to run the client-side code *only after* mounting
  React.useEffect(() => {
    // Check if the hook is loaded and the bridge is not yet active
    if (!useStoryblokBridgeLoaded) {
      // Use the clean ES Module dynamic import pattern
      import('@storyblok/react').then((module) => {
        useStoryblokBridge = module.useStoryblokBridge;
        useStoryblokBridgeLoaded = true;
        // Trigger the bridge immediately upon loading
        module.useStoryblokBridge(story, (newStory: any) => {
            setStory(newStory);
        });
      }).catch(err => {
          console.error("Failed to load Storyblok Bridge:", err);
      });
    } else if (useStoryblokBridge) {
        // If the hook is already loaded, ensure it runs on subsequent renders (if needed)
        useStoryblokBridge(story, (newStory: any) => {
            setStory(newStory);
        });
    }
  }, [initialStory]); // Re-run effect if initial story changes (rare, but safe)
  
  // Render the most current state of the story
  if (!story) return null;

  return <>{children}</>;
};

export default StoryblokProvider;