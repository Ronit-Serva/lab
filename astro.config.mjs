import { defineConfig } from 'astro/config';
const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.PUBLIC_SITE_URL || (productionDomain ? `https://${productionDomain}` : 'http://localhost:4321');

export default defineConfig({ site, output: 'static', trailingSlash: 'always', image: { layout: 'constrained' } });
