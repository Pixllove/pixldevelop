// Generates sitemap.xml from the routes and data used by the Vite app.
// Vite copies files from public/ into dist/, so the canonical build artifact is
// public/sitemap.xml. A root copy is also written for local/source visibility.

import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { blogPosts } from '../src/data/blogPosts.js'
import { projects } from '../src/data/projects.js'

const baseUrl = 'https://pixl-develop.com'
const root = process.cwd()

const staticPages = [
  '/',
  '/expertise',
  '/prices',
  '/contact-us',
  '/faq',
  '/legal',
  '/jobs',
  '/projects',
  '/blog',
  '/terms-app-PixlTrace',
  '/privacy-policy-pixltrace/',
]

function normalizePath(path) {
  if (path === '/') return '/'
  return `/${path.replace(/^\/+|\/+$/g, '')}`
}

function absoluteUrl(path) {
  const normalized = normalizePath(path)
  return `${baseUrl}${normalized === '/' ? '' : normalized}`
}

function xmlEscape(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

const routes = [
  ...staticPages,
  ...projects.map((project) => `/projects/${project.id}`),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
]

const urls = Array.from(new Set(routes.map(absoluteUrl)))

// Build XML
const now = new Date().toISOString().slice(0, 10)
const items = urls
  .map((url) => [
    '  <url>',
    `    <loc>${xmlEscape(url)}</loc>`,
    `    <lastmod>${now}</lastmod>`,
    '  </url>',
  ].join('\n'))
  .join('\n')
const markup = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`

mkdirSync(join(root, 'public'), { recursive: true })
writeFileSync(join(root, 'public', 'sitemap.xml'), markup, 'utf8')
writeFileSync(join(root, 'sitemap.xml'), markup, 'utf8')
console.log('sitemap.xml generated with', urls.length, 'urls')
