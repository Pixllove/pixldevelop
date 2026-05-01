// Simple dynamic sitemap generator
// - Scans content/blog for blog slugs -> /blog/{slug}
// - Scans content/projects for project slugs -> /projects/{slug}
// - Always includes main static pages

import { readdirSync, statSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

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
]

function isDir(p) {
  try {
    return statSync(p).isDirectory()
  } catch (e) {
    return false
  }
}

function slugFromFilename(name) {
  const base = name.split('/').pop()
  const dot = base.lastIndexOf('.')
  return dot > 0 ? base.substring(0, dot) : base
}

const urls = []

// Add static pages
for (const p of staticPages) {
  urls.push(`${baseUrl}${p}`)
}

// Blog posts generation
const blogDir = join(root, 'content', 'blog')
if (existsSync(blogDir) && isDir(blogDir)) {
  for (const f of readdirSync(blogDir)) {
    // Map files to /blog/{slug}; skip directories
    const full = join(blogDir, f)
    try {
      if (statSync(full).isFile()) {
        const slug = slugFromFilename(f)
        urls.push(`${baseUrl}/blog/${slug}`)
      }
    } catch (e) {
      // ignore
    }
  }
}

// Projects generation
const projectsDir = join(root, 'content', 'projects')
if (existsSync(projectsDir) && isDir(projectsDir)) {
  for (const f of readdirSync(projectsDir)) {
    const full = join(projectsDir, f)
    try {
      if (statSync(full).isFile()) {
        const slug = slugFromFilename(f)
        urls.push(`${baseUrl}/projects/${slug}`)
      }
    } catch (e) {
      // ignore
    }
  }
}

// Build XML
const now = new Date().toISOString().slice(0, 10)
const items = urls.map(u => `  <url><loc>${u}</loc><lastmod>${now}</lastmod></url>`).join('\n')
const markup = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`
writeFileSync('sitemap.xml', markup, 'utf8')
console.log('sitemap.xml generated with', urls.length, 'urls')
