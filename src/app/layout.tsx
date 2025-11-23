// src/app/layout.tsx

import { getStoryblokApi } from "@/lib/storyblok"; // Adjust path as needed

// Call the initialization function at the top level
getStoryblokApi();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}