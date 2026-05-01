import { Helmet } from 'react-helmet-async'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeUp } from '@/components/ui/AnimatedSection'
import { getPostBySlug, getRelatedPosts, siteUrl } from '@/data/blogPosts'
import { useI18n } from '@/i18n/LanguageContext'

export default function BlogPost() {
  const { t, isGerman } = useI18n()
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : null

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const url = `${siteUrl}/blog/${post.slug}`
  const related = getRelatedPosts(post.slug, 3)
  const title = t(post.title, post.titleDe)
  const metaTitle = t(post.metaTitle, post.metaTitleDe)
  const description = t(post.description, post.descriptionDe)
  const excerpt = t(post.excerpt, post.excerptDe)
  const category = t(post.category, post.categoryDe)
  const keywords = (isGerman && post.keywordsDe ? post.keywordsDe : post.keywords).join(', ')

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Pixl Develop',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pixl Develop',
      url: siteUrl,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    keywords,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('Home', 'Startseite'), item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  }

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:section" content={category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <article className="relative pt-40 md:pt-44 pb-24 overflow-hidden">
        <div className="absolute top-20 right-0 w-[420px] h-[420px] bg-brand-blue/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-80 h-80 bg-slate-900/50 rounded-full blur-3xl pointer-events-none" />

        <div className="container-max px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                <li>
                  <Link to="/" className="hover:text-brand-blue-light transition-colors">
                    {t('Home', 'Startseite')}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/blog" className="hover:text-brand-blue-light transition-colors">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/60 line-clamp-1 max-w-[min(100%,280px)]">{title}</li>
              </ol>
            </nav>
          </FadeUp>

          <header className="max-w-3xl mb-14 md:mb-16">
            <FadeUp delay={0.05}>
              <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono text-white/45 uppercase tracking-wider">
                <span className="px-2.5 py-1 rounded-full border border-brand-blue/25 bg-brand-blue/10 text-brand-blue-light">
                  {category}
                </span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, isGerman)}</time>
                <span aria-hidden="true">·</span>
                <span>{t(post.readTime, post.readTimeDe)}</span>
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-lg sm:text-xl text-white/55 leading-relaxed">{excerpt}</p>
              <p className="mt-6 text-sm text-white/35 font-mono">
                {t('By', 'Von')} <span className="text-white/50">Pixl Develop</span> ·{' '}
                {t(
                  'Technical & growth notes for modern product teams',
                  'Technische und wachstumsorientierte Notizen für moderne Produktteams',
                )}
              </p>
            </FadeUp>
          </header>

          <div className="max-w-3xl">
            <FadeUp delay={0.1}>
              <div className="relative prose-blog card-glass p-8 sm:p-10 md:p-12 rounded-2xl border border-white/[0.07]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-brand opacity-50 rounded-t-2xl pointer-events-none" />
                <div className="relative space-y-6">
                  {post.content.map((block, i) => (
                    <ContentBlock key={i} block={block} />
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {related.length > 0 && (
            <section className="mt-20 md:mt-24 max-w-5xl" aria-labelledby="related-posts-heading">
              <FadeUp>
                <h2
                  id="related-posts-heading"
                  className="font-display font-bold text-2xl text-white mb-8 flex items-center gap-3"
                >
                  <span className="h-px flex-1 max-w-12 bg-gradient-brand rounded" aria-hidden="true" />
                  {t('Continue reading', 'Weiterlesen')}
                </h2>
                <ul className="grid sm:grid-cols-3 gap-5" role="list">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={`/blog/${r.slug}`}
                        className="block h-full card-glass p-6 rounded-xl hover:border-brand-blue/20 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
                      >
                        <p className="text-[10px] font-mono text-brand-blue-light uppercase tracking-widest mb-3">
                          {t(r.category, r.categoryDe)}
                        </p>
                        <p className="font-display font-semibold text-white text-sm leading-snug group-hover:text-brand-blue-light transition-colors line-clamp-2">
                          {t(r.title, r.titleDe)}
                        </p>
                        <p className="mt-3 text-xs text-white/40 line-clamp-2">{t(r.excerpt, r.excerptDe)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </section>
          )}

          <FadeUp className="mt-16 flex flex-wrap gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('All articles', 'Alle Artikel')}
            </Link>
            <Link to="/contact-us" className="btn-primary text-sm inline-flex">
              <span>{t('Work with us', 'Mit uns arbeiten')}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </article>
    </>
  )
}

function ContentBlock({ block }) {
  const { t, isGerman } = useI18n()

  if (block.type === 'p') {
    return (
      <p className="text-white/70 text-base sm:text-lg leading-relaxed font-body">{t(block.text, block.textDe)}</p>
    )
  }
  if (block.type === 'h2') {
    return (
      <h2 className="font-display font-bold text-xl sm:text-2xl text-white pt-2 border-t border-white/10 mt-2">
        {t(block.text, block.textDe)}
      </h2>
    )
  }
  if (block.type === 'h3') {
    return <h3 className="font-display font-semibold text-lg text-brand-blue-light">{t(block.text, block.textDe)}</h3>
  }
  if (block.type === 'ul' && block.items) {
    const items = isGerman && block.itemsDe ? block.itemsDe : block.items

    return (
      <ul className="space-y-3 pl-1">
        {items.map((item, j) => (
          <motion.li
            key={j}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: j * 0.05 }}
            className="flex gap-3 text-white/70 leading-relaxed"
          >
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" aria-hidden="true" />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    )
  }
  return null
}

function formatDate(iso, isGerman) {
  try {
    return new Intl.DateTimeFormat(isGerman ? 'de-DE' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
