import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const connection = z.object({
  collection: z.enum(['investigations', 'projects', 'articles']),
  id: z.string(),
  reason: z.string(),
});
const shared = z.object({
  title: z.string(), summary: z.string(), topics: z.array(z.string()).min(1),
  visibility: z.enum(['public', 'unlisted', 'private']).default('private'),
  draft: z.boolean().default(true), featured: z.boolean().default(false), order: z.number().default(99),
  updatedAt: z.iso.date().optional(),
  related: z.array(connection).default([]),
  references: z.array(z.object({ title: z.string(), url: z.url({ protocol: /^https?$/ }) })).default([]),
});
const investigations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/investigations' }),
  schema: shared.extend({ status: z.enum(['Exploring', 'Researching', 'Prototyping', 'Published', 'Paused']), question: z.string(), openQuestions: z.array(z.string()).min(1) }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: shared.extend({ status: z.enum(['Built · self-reported', 'Prototype', 'In development', 'Concept', 'Learning reimplementation', 'Live app']), stack: z.array(z.string()).default([]), demoUrl: z.url({ protocol: /^https?$/ }).optional(), repoUrl: z.url({ protocol: /^https?$/ }).optional() }),
});
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: shared.extend({ type: z.enum(['Research article', 'Essay', 'Field note', 'Build log']), publishedAt: z.iso.date().optional(), externalUrl: z.url({ protocol: /^https?$/ }).optional() }),
});
export const collections = { investigations, projects, articles };
