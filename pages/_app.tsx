import { createStoryblokClient } from '@storyblok/nuxt';

const storyblok = createStoryblokClient({
  accessToken: 'zHQ6VfYm6cGAXPsHmQp87Qtt',
  space: '288684548399962',
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;