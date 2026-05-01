import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FadeUp, StaggerContainer, staggerItem, SlideIn } from '@/components/ui/AnimatedSection'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/LanguageContext'
import TechMarquee from '@/components/sections/TechMarquee'

const expertise = [
  {
    id: 'storybrand',
    badge: 'Strategy',
    badgeDe: 'Strategie',
    title: 'Storybrand',
    titleDe: 'Storybrand',
    headline: 'Make Your Message Crystal Clear',
    headlineDe: 'Machen Sie Ihre Botschaft glasklar',
    description: 'Most businesses struggle because their message is confusing. We use the proven StoryBrand framework to clarify your message so customers engage and buy.',
    descriptionDe: 'Die meisten Unternehmen kämpfen, weil ihre Botschaft verwirrend ist. Wir nutzen das bewährte StoryBrand-Framework, um Ihre Botschaft zu klären, damit Kunden sich ansprechen lassen und kaufen.',
    gradient: 'from-slate-700 to-blue-700',
    features: [
      'Brand messaging strategy',
      'Website copy & content',
      'Marketing funnel design',
      'Customer journey mapping',
      'Elevator pitch crafting',
    ],
    featuresDe: [
      'Markenbotschaftsstrategie',
      'Website-Texte & Inhalte',
      'Marketing-Trichterdesign',
      'Customer Journey Mapping',
      'Elevator Pitch Entwicklung',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'design',
    badge: 'Creative',
    badgeDe: 'Kreativ',
    title: 'Design',
    titleDe: 'Design',
    headline: 'Unique Identity That Builds Trust',
    headlineDe: 'Einzigartige Identität, die Vertrauen schafft',
    description: 'Your design is your first impression. We create bold, memorable visual identities — from logo and brand systems to UI/UX that converts visitors into clients.',
    descriptionDe: 'Ihr Design ist Ihr erster Eindruck. Wir schaffen kühne, einprägsame visuelle Identitäten – von Logo- und Markensystemen bis hin zu UI/UX, die Besucher in Kunden verwandelt.',
    gradient: 'from-blue-600 to-blue-900',
    features: [
      'Logo & brand identity',
      'UI/UX design',
      'Figma prototyping',
      'Design systems',
      'Marketing materials',
    ],
    featuresDe: [
      'Logo & Markenidentität',
      'UI/UX Design',
      'Figma Prototyping',
      'Designsysteme',
      'Marketingmaterialien',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'web',
    badge: 'Development',
    badgeDe: 'Entwicklung',
    title: 'Website Development',
    titleDe: 'Webentwicklung',
    headline: 'Your Digital Centerpiece, Perfected',
    headlineDe: 'Ihr digitales Herzstück, perfektioniert',
    description: 'We provide custom website development services including React, WordPress, and Shopify solutions optimized for SEO and performance.',
    descriptionDe: 'Wir bieten maßgeschneiderte Webentwicklungsdienstleistungen an, einschließlich React-, WordPress- und Shopify-Lösungen, optimiert für SEO und Leistung.',
    gradient: 'from-slate-800 to-blue-800',
    features: [
      'React / Next.js / Vue',
      'WordPress & Shopify',
      'Performance optimization',
      'SEO & analytics setup',
      'Ongoing maintenance',
    ],
    featuresDe: [
      'React / Next.js / Vue',
      'WordPress & Shopify',
      'Leistungsoptimierung',
      'SEO & Analytics Einrichtung',
      'Laufende Wartung',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'app',
    badge: 'Mobile',
    badgeDe: 'Mobil',
    title: 'App Development',
    titleDe: 'App-Entwicklung',
    headline: 'From Idea to App Store — Ready',
    headlineDe: 'Von der Idee bis in den App Store — bereit',
    description: 'We transform your concept into a fully-featured mobile application for iOS and Android. Scalable architecture, stunning UI, and seamless user experience.',
    descriptionDe: 'Wir verwandeln Ihr Konzept in eine voll ausgestattete mobile Anwendung für iOS und Android. Skalierbare Architektur, beeindruckende Benutzeroberfläche und nahtloses Benutzererlebnis.',
    gradient: 'from-blue-500 to-slate-900',
    features: [
      'React Native & Flutter',
      'iOS & Android native',
      'Backend & API development',
      'App Store submission',
      'Post-launch support',
    ],
    featuresDe: [
      'React Native & Flutter',
      'iOS & Android nativ',
      'Backend & API Entwicklung',
      'App Store Einreichung',
      'Support nach dem Launch',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const stats = [
  { value: '100+', label: 'Projects Delivered', labelDe: 'Abgeschlossene Projekte' },
  { value: '50+', label: 'Happy Clients', labelDe: 'Zufriedene Kunden' },
  { value: '5★', label: 'Average Rating', labelDe: 'Durchschnittsbewertung' },
  { value: '3x', label: 'Avg. Revenue Growth', labelDe: 'Ø Umsatzwachstum' },
]

export default function Expertise() {
  const { t, language } = useI18n()
  const isGerman = language === 'de'
  
  return (
    <>
      <Helmet>
        <title>{t('Expertise – Pixl Develop', 'Leistungen – Pixl Develop')}</title>
        <meta name="description" content={t('Web development, app development, design, and storybrand strategy — everything you need for digital success.', 'Webentwicklung, App-Entwicklung, Design und Storybrand-Strategie — alles für Ihren digitalen Erfolg.')} />
        <link rel="canonical" href="https://pixl-develop.com/expertise/" />
      </Helmet>

      <main className="relative overflow-hidden pb-24 pt-36 md:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-20 h-[520px] w-[min(900px,92vw)] -translate-x-1/2 rounded-full bg-brand-blue/12 blur-[130px]" />
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-cyan-500/12 blur-[110px]" />
          <div className="absolute -right-20 bottom-24 h-64 w-64 rounded-full bg-indigo-500/12 blur-[100px]" />
        </div>

        <section className="relative">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <FadeUp className="mx-auto max-w-4xl text-center">
              <span className="mb-5 inline-block rounded-full border border-brand-blue/25 bg-brand-blue/[0.08] px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-brand-blue-light">
                {t('Our Expertise', 'Unsere Leistungen')}
              </span>
              <h1 className="font-display text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
                {t('Everything You Need to ', 'Alles, was Sie brauchen, um ')}<span className="gradient-text">{t('Succeed Online', 'online erfolgreich zu sein')}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50">
                {t('Four core digital services including web development, mobile apps, branding, and design.', 'Vier Kernbereiche. Ein engagiertes Team. Unbegrenztes Potenzial für Ihr digitales Wachstum.')}
              </p>
            </FadeUp>

            <StaggerContainer className="relative mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 text-center shadow-[0_16px_42px_-26px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:border-brand-blue/35 hover:shadow-[0_22px_54px_-24px_rgba(37,99,235,0.32)] md:p-6"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent opacity-70" />
                  <div className="mb-1 font-display text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-white/45">{isGerman ? stat.labelDe : stat.label}</div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="relative mt-20">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 lg:space-y-10">
              {expertise.map((item) => {
                const badge = isGerman ? item.badgeDe : item.badge
                const title = isGerman ? item.titleDe : item.title
                const headline = isGerman ? item.headlineDe : item.headline
                const description = isGerman ? item.descriptionDe : item.description
                const features = isGerman ? item.featuresDe : item.features
                
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_28px_70px_-36px_rgba(0,0,0,0.85)] backdrop-blur-xl"
                  >
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      style={{ background: 'radial-gradient(circle at 5% 50%, rgba(37,99,235,0.1) 0%, transparent 65%)' }}
                    />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/70 to-transparent" />

                    <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
                      <div className="p-8 sm:p-10 lg:p-12">
                        <div className="mb-5 flex items-center gap-3">
                          <span className="rounded-full border border-brand-blue/25 bg-brand-blue/[0.1] px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.18em] text-brand-blue-light/90">
                            {badge}
                          </span>
                        </div>
                        <h2 className="font-display text-3xl font-bold text-white transition-colors duration-300 group-hover:text-brand-blue-light sm:text-4xl">
                          {title}
                        </h2>
                        <p className="mt-3 font-display text-lg font-medium text-brand-blue-light/85">{headline}</p>
                        <p className="mt-5 max-w-2xl leading-relaxed text-white/55">{description}</p>
                        <Link
                          to="/contact-us"
                          onClick={() => {
                            window.dataLayer = window.dataLayer || []
                            window.dataLayer.push({ event: 'initiate_booking' })
                          }}
                          className="btn-primary mt-8 inline-flex text-sm"
                        >
                          <span>{t('Get Free Consultation', 'Kostenlose Beratung anfragen')}</span>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>

                      <div className="flex flex-col justify-center border-t border-white/[0.08] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                        <div className={`mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-[0_0_32px_rgba(59,130,246,0.35)]`}>
                          {item.icon}
                        </div>
                        <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-white/75">{t("Services Included", 'Inklusive Dienste')}</h3>
                        <ul className="space-y-3.5">
                          {features.map((f) => (
                            <li key={f} className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-brand" />
                              <span className="text-sm leading-relaxed text-white/65">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        <TechMarquee />

        <section className="relative mt-20">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-brand-blue/[0.12] via-white/[0.02] to-slate-800/20 p-10 text-center shadow-[0_28px_70px_-32px_rgba(0,0,0,0.75)] sm:p-12">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/70 to-transparent" />
                <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand-blue/25 blur-3xl" />
                <div className="relative">
                  <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">{t('Ready to Start Your Project?', 'Bereit, Ihr Projekt zu starten?')}</h2>
                  <p className="mx-auto mb-8 max-w-xl text-white/55">
                    {t("Book a free 30-minute consultation. We'll discuss your goals and how we can help.", 'Buchen Sie eine kostenlose 30-minütige Beratung. Wir besprechen Ihre Ziele und wie wir helfen können.')}
                  </p>
                  <Link
                    to="/contact-us"
                    onClick={() => {
                      window.dataLayer = window.dataLayer || []
                      window.dataLayer.push({ event: 'initiate_booking' })
                    }}
                    className="btn-primary text-base"
                  >
                    <span>{t('Book Free Consultation', 'Kostenlose Beratung buchen')}</span>
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
    </>
  )
}