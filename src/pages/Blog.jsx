import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeUp, StaggerContainer, staggerItem } from '@/components/ui/AnimatedSection'
import { getAllPosts, siteUrl } from '@/data/blogPosts'
import { useI18n } from '@/i18n/LanguageContext'

const pageTitle = 'Digital Product & SEO Insights Blog | Pixl Develop'
const pageTitleDe = 'Blog für digitale Produkte & SEO-Insights | Pixl Develop'
const pageDescription =
  'Expert articles on technical SEO, web development, mobile apps, UI/UX design, and StoryBrand strategy—actionable guidance for growth-focused teams.'
const pageDescriptionDe =
  'Expertenartikel zu technischer SEO, Webentwicklung, Mobile Apps, UI/UX-Design und StoryBrand-Strategie — praxisnahe Impulse für wachstumsorientierte Teams.'
const canonical = `${siteUrl}/blog/`

export default function Blog() {
  const { t, isGerman } = useI18n()
  const posts = getAllPosts()
  const localizedPageTitle = t(pageTitle, pageTitleDe)
  const localizedPageDescription = t(pageDescription, pageDescriptionDe)
  const keywords = t(
    'SEO blog, web development blog, technical SEO, React development, mobile app development, UI UX design, digital marketing, StoryBrand',
    'SEO-Blog, Webentwicklungs-Blog, technische SEO, React-Entwicklung, Mobile-App-Entwicklung, UI UX Design, digitales Marketing, StoryBrand',
  )

  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t('Pixl Develop Insights', 'Pixl Develop Insights'),
    description: localizedPageDescription,
    url: canonical,
    publisher: {
      '@type': 'Organization',
      name: 'Pixl Develop',
      url: siteUrl,
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: t(p.title, p.titleDe),
      description: t(p.description, p.descriptionDe),
      url: `${siteUrl}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      author: { '@type': 'Organization', name: 'Pixl Develop' },
    })),
  }

  return (
    <>
      <Helmet>
        <title>{localizedPageTitle}</title>
        <meta name="description" content={localizedPageDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={localizedPageTitle} />
        <meta property="og:description" content={localizedPageDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={localizedPageTitle} />
        <meta name="twitter:description" content={localizedPageDescription} />
        <script type="application/ld+json">{JSON.stringify(blogListJsonLd)}</script>
      </Helmet>

      <main className="relative pt-40 md:pt-44 pb-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-orb pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-900/60 rounded-full blur-3xl animate-orb-reverse pointer-events-none" />

        <div className="container-max px-4 sm:px-6 lg:px-8 relative">
          <header className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <FadeUp>
              <nav aria-label="Breadcrumb" className="flex justify-center mb-8">
                <ol className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                  <li>
                    <Link to="/" className="hover:text-brand-blue-light transition-colors">
                      {t('Home', 'Startseite')}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-brand-blue-light">Blog</li>
                </ol>
              </nav>
              <span className="inline-block text-xs font-mono text-brand-blue-light tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full border border-brand-blue/20 bg-brand-blue/5">
                {t('Insights & Guides', 'Insights & Leitfäden')}
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
                {t('Ideas for ', 'Ideen für ')}<span className="gradient-text">{t('SEO & Digital Growth', 'SEO & digitales Wachstum')}</span>
              </h1>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed">
                {localizedPageDescription}
              </p>
            </FadeUp>
          </header>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            role="list"
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                variants={staggerItem}
                role="listitem"
                className="group relative"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block h-full card-glass p-8 md:p-9 overflow-hidden transition-all duration-300 hover:border-brand-blue/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg rounded-2xl"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-brand opacity-40 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-wrap items-center gap-3 mb-5 text-xs font-mono text-white/45 uppercase tracking-wider">
                    <span className="px-2.5 py-1 rounded-full border border-brand-blue/25 bg-brand-blue/10 text-brand-blue-light">
                      {t(post.category, post.categoryDe)}
                    </span>
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, isGerman)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{t(post.readTime, post.readTimeDe)}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-4 group-hover:text-brand-blue-light transition-colors leading-snug">
                    {t(post.title, post.titleDe)}
                  </h2>
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                    {t(post.excerpt, post.excerptDe)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue-light group-hover:gap-3 transition-all">
                    {t('Read article', 'Artikel lesen')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  {/* Decorative index */}
                  <span
                    className="absolute bottom-6 right-8 font-display text-7xl font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-colors select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </Link>
              </motion.article>
            ))}
          </StaggerContainer>

          <FadeUp className="mt-16 md:mt-20 text-center">
            <p className="text-white/40 text-sm max-w-xl mx-auto mb-6">
              {t(
                'Want help applying these strategies to your product? Book a free consultation and we will map priorities to your roadmap.',
                'Möchten Sie diese Strategien auf Ihr Produkt anwenden? Buchen Sie eine kostenlose Beratung und wir ordnen die Prioritäten Ihrer Roadmap zu.',
              )}
            </p>
            <Link
              to="/contact-us"
              onClick={() => {
                window.dataLayer = window.dataLayer || []
                window.dataLayer.push({ event: 'initiate_booking' })
              }}
              className="btn-primary text-sm inline-flex"
            >
              <span>{t('Book Free Consultation', 'Kostenlose Beratung buchen')}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </main>
    </>
  )
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
