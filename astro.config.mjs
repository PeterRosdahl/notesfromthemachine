// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import critters from 'astro-critters';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://notesfromthemachine.com',
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
			wrap: true,
		},
	},
	integrations: [mdx(), sitemap(), critters()],
	adapter: vercel(),
});
