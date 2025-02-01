import {createClient} from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'jpt8guat',
  dataset: 'production',
  apiVersion: '2022-03-07',
  useCdn: false,
  ignoreBrowserTokenWarning: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
});

export default sanityClient;