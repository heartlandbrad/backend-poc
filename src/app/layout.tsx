// src/app/layout.tsx - MUST be .tsx for JSX support

import React from 'react'; // Explicit import of React for types and JSX
import { getStoryblokApi } from "@/lib/storyblok"; // Resolved by tsconfig

// Call the initialization function at the top level (Server Component)
getStoryblokApi();

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Next.js + Storyblok CMS</title>
      </head>
      <body>{children}</body>
    </html>
  );
}