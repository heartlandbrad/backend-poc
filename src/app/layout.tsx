import StoryblokProvider from "@/components/StoryblokProvider";

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