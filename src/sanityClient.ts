import {createClient} from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'jpt8guat',
  dataset: 'production',
  apiVersion: '2022-03-07',
  useCdn: false,
  ignoreBrowserTokenWarning: true,
  token: 'skyeC0JJkIuWkCD1OrXUncwOQm9z5srY1IrbuobsNzK3EgB6hl6cRQrOWSY8y293dq8lJYhrxkTZsvP2SM0sfpahyW3kZIz0ULxR5SHZcbdZMopJAkIkus4KOrRcQHStixhugrZJvPTathICvIsUa2ZVKb6X3tKzwfECcmGlZry0kekL5vq9',
});

export default sanityClient;