import { defineConfig, passthroughImageService } from "astro/config";
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator'

// https://astro.build/config
export default defineConfig({
  site: 'https://moonbeam.ing',
  image: {
    service: passthroughImageService(),
  },
  server: { host: true },
  integrations: [
    starlight({
      plugins: [starlightLinksValidator()],
      title: 'Moonbeam',
      logo: {
        src: './src/assets/moonbeam-logo.png'
      },
      social: {
        github: 'https://github.com/simonwjackson/elevate/tree/main/packages/moonbeam',
        linkedin: 'https://www.linkedin.com/in/simonwjackson',
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Core Settings',
          autogenerate: { directory: 'core-settings' },
        },
        {
          label: 'Advanced Usage',
          autogenerate: { directory: 'advanced-usage' },
        },
        {
          label: 'Troubleshooting',
          autogenerate: { directory: 'troubleshooting' },
        },
        {
          label: 'Support',
          autogenerate: { directory: 'support' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
