import type { APIRoute } from 'astro';
import { publicContent, href } from '../lib/content';
export const GET: APIRoute = async ({ site }) => {
  const routes = ['/', '/explore/', '/writing/', '/projects/', '/story/', '/contact/', ...(await publicContent()).map(href)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${new URL(route, site).href}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
