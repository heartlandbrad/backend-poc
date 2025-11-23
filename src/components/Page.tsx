// src/components/Page.tsx

import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import { type StoryblokComponent } from "@storyblok/react/rsc"; // For TypeScript type safety

// Define the expected block type from Storyblok
type PageStoryblok = StoryblokComponent<"page"> & {
  // Define any custom fields on your page content type here
  body: StoryblokComponent<string>[];
};

interface PageProps {
  blok: PageStoryblok;
}

export default function Page({ blok }: PageProps) {
  return (
    <main {...storyblokEditable(blok)}>
      <h1>My Next.js Storyblok Page</h1>
      {/* Renders nested blocks dynamically */}
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}