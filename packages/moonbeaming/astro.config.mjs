import { defineConfig, passthroughImageService } from "astro/config";
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://moonbeam.ing',
  image: {
    service: passthroughImageService(),
  },
  server: { host: true },
  integrations: [
    starlight({
      title: 'Moonbeam',
      logo: {
        src: './src/assets/moonbeam-logo.png'
      },
      social: {
        github: 'https://github.com/elevate/packages/moonbeam',
        linkedin: 'https://www.linkedin.com/in/simonwjackson',
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
