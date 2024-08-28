import { defineConfig, passthroughImageService } from "astro/config";
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  server: { host: true },
  integrations: [
    starlight({
      title: 'Moonbeam',
      social: {
        github: 'https://github.com/withastro/starlight',
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
