import StoryblokProvider from "@/components/Storyblok/StoryblokProvider";

export default function RootLayout({ children }) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </StoryblokProvider>
  );
}