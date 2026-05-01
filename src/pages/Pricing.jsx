import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { FadeUp } from '@/components/ui/AnimatedSection'
import { useI18n } from '@/i18n/LanguageContext'

const websitePackages = [
  {
    name: 'Basic',
    nameDe: 'Basis',
    subtitle: 'Launch a credible site fast — ideal for small teams and first websites.',
    subtitleDe: 'Starten Sie schnell mit einer glaubwürdigen Website — ideal für kleine Teams und erste Websites.',
    badge: null,
    recommended: false,
    features: [
      { line: 'Roadmap', lineDe: 'Roadmap' },
      { line: 'Web Development', lineDe: 'Webentwicklung' },
      { line: 'Responsive Design', lineDe: 'Responsives Design' },
      { line: 'Social Media Integration', lineDe: 'Social-Media-Integration' },
    ],
  },
  {
    name: 'Premium',
    nameDe: 'Premium',
    subtitle: 'More pages, design polish, and SEO — best for brands that want to grow online.',
    subtitleDe: 'Mehr Seiten, hochwertiges Design und SEO — ideal für Marken, die online wachsen möchten.',
    badge: 'recommended',
    recommended: true,
    features: [
      { line: 'Roadmap', lineDe: 'Roadmap' },
      { line: 'Web Development', lineDe: 'Webentwicklung' },
      { line: 'Responsive Design', lineDe: 'Responsives Design' },
      { line: 'Social Media Integration', lineDe: 'Social-Media-Integration' },
      { line: 'Web Design', lineDe: 'Webdesign' },
      { line: 'Storybranding', lineDe: 'Storybranding' },
      { line: 'SEO Optimization', lineDe: 'SEO-Optimierung' },
      { line: '1 Month Free Maintenance', lineDe: '1 Monat kostenlose Wartung' },
    ],
  },
  {
    name: 'E-Commerce',
    nameDe: 'E-Commerce',
    subtitle: 'Sell online with performance tracking, shop setup, and integrations.',
    subtitleDe: 'Verkaufen Sie online mit Performance-Tracking, Shop-Einrichtung und Integrationen.',
    badge: 'store',
    recommended: false,
    features: [
      { line: 'Roadmap', lineDe: 'Roadmap' },
      { line: 'Web Development', lineDe: 'Webentwicklung' },
      { line: 'Responsive Design', lineDe: 'Responsives Design' },
      { line: 'Web Design', lineDe: 'Webdesign' },
      { line: 'Storybranding', lineDe: 'Storybranding' },
      { line: 'SEO Optimization', lineDe: 'SEO-Optimierung' },
      { line: 'Performance Tracking', lineDe: 'Performance-Tracking' },
      { line: 'E-Commerce Shop', lineDe: 'E-Commerce-Shop' },
      { line: 'Integration', lineDe: 'Integration' },
      { line: '1 Month Free Maintenance', lineDe: '1 Monat kostenlose Wartung' },
    ],
  },
]

const appPackages = [
  {
    name: 'App Mockup',
    nameDe: 'App-Mockup',
    subtitle: 'See your idea as a clear visual before any heavy build work.',
    subtitleDe: 'Sehen Sie Ihre Idee als klare Visualisierung, bevor die aufwendige Entwicklung beginnt.',
    features: [
      { line: 'Roadmap', lineDe: 'Roadmap' },
      { line: 'Visualization of Your Idea', lineDe: 'Visualisierung Ihrer Idee' },
      { line: 'Structuring', lineDe: 'Strukturierung' },
      { line: 'Story Branding', lineDe: 'Storybranding' },
    ],
  },
  {
    name: 'Prototype',
    nameDe: 'Prototyp',
    subtitle: 'Clickable flows and specs so stakeholders can react before code.',
    subtitleDe: 'Klickbare Abläufe und Spezifikationen, damit Stakeholder vor der Entwicklung Feedback geben können.',
    features: [
      { line: 'Roadmap', lineDe: 'Roadmap' },
      { line: 'Implementation of Existing Design', lineDe: 'Umsetzung eines bestehenden Designs' },
      { line: 'Technical Specification', lineDe: 'Technische Spezifikation' },
      { line: 'Interactive Prototype', lineDe: 'Interaktiver Prototyp' },
      { line: 'User Feedback Session', lineDe: 'Nutzerfeedback-Session' },
      { line: 'Adjustments Based on Feedback', lineDe: 'Anpassungen auf Basis des Feedbacks' },
    ],
  },
  {
    name: 'Finalized Product',
    nameDe: 'Fertiges Produkt',
    subtitle: 'Production build, QA, and release to the App Store and Play Store.',
    subtitleDe: 'Produktionsreife Entwicklung, Qualitätssicherung und Veröffentlichung im App Store und Play Store.',
    features: [
      { line: 'Roadmap', lineDe: 'Roadmap' },
      { line: 'Complete App', lineDe: 'Vollständige App' },
      { line: 'Development', lineDe: 'Entwicklung' },
      { line: 'User Interface (UI)', lineDe: 'Benutzeroberfläche (UI)' },
      { line: 'Refinement Functionality', lineDe: 'Verfeinerung der Funktionen' },
      { line: 'Implementation Testing and Quality Assurance', lineDe: 'Implementierung, Tests und Qualitätssicherung' },
      { line: 'Deployment to App Store/Play Store', lineDe: 'Veröffentlichung im App Store/Play Store' },
    ],
  },
]

const documentPackages = [
  {
    name: 'Pitchdeck',
    nameDe: 'Pitchdeck',
    subtitle: 'Slide deck for investors or clients — layout, story, and visuals included.',
    subtitleDe: 'Präsentation für Investoren oder Kunden — inklusive Layout, Story und Visuals.',
    accent: 'emerald',
    features: [
      { line: 'Professional layout', lineDe: 'Professionelles Layout' },
      { line: 'Min. 10 Pages', lineDe: 'Mind. 10 Seiten', emphasize: true },
      { line: 'Strategic Positioning of Key Information', lineDe: 'Strategische Platzierung wichtiger Informationen' },
      { line: 'Clear Problem-Solution', lineDe: 'Klare Problem-Lösung-Darstellung' },
      { line: 'High-Quality Images and Infographics', lineDe: 'Hochwertige Bilder und Infografiken' },
      { line: 'Thoughtful Typography', lineDe: 'Durchdachte Typografie' },
      { line: 'Copywriting', lineDe: 'Copywriting' },
    ],
  },
  {
    name: 'Businessplan',
    nameDe: 'Businessplan',
    subtitle: 'Long-form strategy document for funding, partners, or internal alignment.',
    subtitleDe: 'Ausführliches Strategiedokument für Finanzierung, Partner oder interne Abstimmung.',
    accent: 'amber',
    features: [
      { line: 'Min. 20 Pages', lineDe: 'Mind. 20 Seiten', emphasize: true },
      { line: 'Compelling Storybranding', lineDe: 'Überzeugendes Storybranding' },
      { line: 'Strategic Information Positioning', lineDe: 'Strategische Informationsplatzierung' },
      { line: 'In-depth Coverage of Vision and Mission', lineDe: 'Ausführliche Darstellung von Vision und Mission' },
      { line: 'Market Analysis', lineDe: 'Marktanalyse' },
      { line: 'Thoughtful Typography', lineDe: 'Durchdachte Typografie' },
      { line: 'Copywriting', lineDe: 'Copywriting' },
    ],
  },
]

const faqs = [
  {
    q: 'How long does a typical project take?',
    qDe: 'Wie lange dauert ein typisches Projekt?',
    a: 'A standard 5-page website takes 4–6 weeks. Larger projects with custom apps can take 3–6 months. We provide a detailed timeline after the discovery call.',
    aDe:
      'Eine Standard-Website mit fünf Seiten dauert in der Regel 4–6 Wochen. Größere Projekte mit individuellen Apps können 3–6 Monate in Anspruch nehmen. Nach dem Erstgespräch erhalten Sie einen detaillierten Zeitplan.',
  },
  {
    q: 'Do you sign an NDA to protect our ideas?',
    qDe: 'Unterzeichnen Sie eine NDA zum Schutz unserer Ideen?',
    a: 'Absolutely. We sign NDAs before discussing any project details. Your ideas and business information are fully protected.',
    aDe:
      'Ja. Wir unterzeichnen NDAs, bevor wir Projektdetails besprechen. Ihre Ideen und geschäftlichen Informationen sind vollständig geschützt.',
  },
  {
    q: 'What is your satisfaction guarantee?',
    qDe: 'Wie lautet Ihre Zufriedenheitsgarantie?',
    a: "We work in iterations with your feedback at every stage. We don't stop until you're 100% satisfied with the result.",
    aDe:
      'Wir arbeiten iterativ mit Ihrem Feedback in jeder Phase. Wir sind erst fertig, wenn Sie zu 100 % mit dem Ergebnis zufrieden sind.',
  },
  {
    q: 'Can I upgrade my plan later?',
    qDe: 'Kann ich mein Paket später upgraden?',
    a: 'Yes! Many clients start with a smaller package and grow. We make transitions seamless without losing any existing work.',
    aDe:
      'Ja. Viele Kunden starten mit einem kleineren Paket und wachsen. Wir gestalten Übergänge nahtlos, ohne bestehende Arbeiten zu verlieren.',
  },
  {
    q: 'Do you offer ongoing maintenance?',
    qDe: 'Bieten Sie laufende Wartung an?',
    a: 'Yes. We offer support periods per package, and monthly retainer packages for ongoing updates, SEO, and maintenance.',
    aDe:
      'Ja. Pro Paket gibt es Supportzeiträume; außerdem monatliche Retainer für Updates, SEO und Wartung.',
  },
]

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30" aria-hidden>
      <svg className="h-3 w-3 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

function FeatureLine({ item }) {
  const { t } = useI18n()

  if (typeof item === 'string') {
    return (
      <li className="flex gap-3 text-left text-sm leading-relaxed text-white/75">
        <CheckIcon />
        <span>{item}</span>
      </li>
    )
  }
  return (
    <li className="flex gap-3 text-left text-sm leading-relaxed">
      <CheckIcon />
      <span className={item.emphasize ? 'font-semibold text-white' : 'text-white/75'}>{t(item.line, item.lineDe)}</span>
    </li>
  )
}

function pushTrackingEvent(eventName) {
  if (!eventName) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName })
}

function IconMonitor(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0015 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  )
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  )
}

function IconDoc(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
}

/** One clear card pattern: title → short explanation → checklist → primary button */
function PackageTierCard({ name, nameDe, subtitle, subtitleDe, features, badge, recommended }) {
  const { t } = useI18n()

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 shadow-lg transition hover:border-brand-blue/30 hover:shadow-[0_20px_50px_-24px_rgba(37,99,235,0.15)] ${
        recommended
          ? 'border-brand-blue/40 ring-2 ring-brand-blue/25'
          : 'border-white/[0.1]'
      }`}
    >
      {recommended && (
        <div className="absolute right-4 top-4 rounded-full bg-gradient-brand px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-white shadow-md">
          {t('Most popular', 'Am beliebtesten')}
        </div>
      )}
      {badge === 'store' && !recommended && (
        <div className="absolute right-4 top-4 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-200">
          {t('Online store', 'Online-Shop')}
        </div>
      )}

      <div className={`mb-6 h-1 w-14 rounded-full ${recommended ? 'bg-gradient-brand' : 'bg-white/20'}`} aria-hidden />

      <h3 className="font-display text-2xl font-bold text-white">{t(name, nameDe)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/50">{t(subtitle, subtitleDe)}</p>

      <div className="my-6 h-px bg-white/[0.08]" />
      <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/35">{t("What's included", 'Was enthalten ist')}</p>

      <ul className="flex flex-1 flex-col gap-3">
        {features.map((f, i) => (
          <FeatureLine key={i} item={f} />
        ))}
      </ul>

      <div className="mt-8">
        <Link
          to="/contact-us"
          onClick={() => {
            pushTrackingEvent('initiate_booking')
            pushTrackingEvent('request_offer')
          }}
          className="btn-primary flex w-full justify-center text-center text-base"
        >
          <span>{t('Request offer', 'Angebot anfragen')}</span>
        </Link>
        <p className="mt-3 text-center text-xs text-white/35">
          {t("We'll reply with a tailored scope — no obligation.", 'Wir antworten mit einem maßgeschneiderten Umfang — unverbindlich.')}
        </p>
      </div>
    </article>
  )
}

function DocumentPackageCard({ name, nameDe, subtitle, subtitleDe, features, accent }) {
  const { t } = useI18n()
  const ring = accent === 'emerald' ? 'hover:border-emerald-400/35' : 'hover:border-amber-400/35'
  const topBar = accent === 'emerald' ? 'from-emerald-400 to-teal-600' : 'from-amber-400 to-orange-600'

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-lg transition ${ring} hover:shadow-xl`}
    >
      <div className={`mb-6 h-1 w-14 rounded-full bg-gradient-to-r ${topBar}`} aria-hidden />
      <div className="mb-4 flex items-center gap-2 text-white/40">
        <IconDoc className="h-5 w-5" />
        <span className="font-mono text-xs uppercase tracking-wider">{t('Document package', 'Dokumentenpaket')}</span>
      </div>
      <h3 className="font-display text-2xl font-bold text-white">{t(name, nameDe)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/50">{t(subtitle, subtitleDe)}</p>

      <div className="my-6 h-px bg-white/[0.08]" />
      <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/35">{t("What's included", 'Was enthalten ist')}</p>

      <ul className="flex flex-1 flex-col gap-3">
        {features.map((f, i) => (
          <FeatureLine key={i} item={f} />
        ))}
      </ul>

      <div className="mt-8">
        <Link
          to="/contact-us"
          onClick={() => {
            pushTrackingEvent('initiate_booking')
            pushTrackingEvent('request_offer')
          }}
          className="btn-primary flex w-full justify-center text-center text-base"
        >
          <span>{t('Request offer', 'Angebot anfragen')}</span>
        </Link>
        <p className="mt-3 text-center text-xs text-white/35">
          {t("We'll reply with a tailored scope — no obligation.", 'Wir antworten mit einem maßgeschneiderten Umfang — unverbindlich.')}
        </p>
      </div>
    </article>
  )
}

function PricingBlock({ label, title, description, icon: Icon, children }) {
  return (
    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <span className="inline-block rounded-full border border-brand-blue/25 bg-brand-blue/[0.08] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-brand-blue-light">
          {label}
        </span>
        <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-brand-blue/[0.12] text-brand-blue-light">
          <Icon className="h-7 w-7" />
        </div>
        <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mt-3 text-base text-white/45">{description}</p>
      </header>
      {children}
    </div>
  )
}

const gridReveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
}

const cardIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="group cursor-pointer border-b border-white/5" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between gap-4 py-5">
        <h3 className="font-display text-sm font-medium text-white/80 transition-colors group-hover:text-white sm:text-base">
          {q}
        </h3>
        <motion.div animate={{ rotate: open ? 45 : 0 }} className="h-5 w-5 flex-shrink-0 text-brand-blue-light">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-white/40">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Pricing() {
  const { t, isGerman } = useI18n()
  const [packagesRef, packagesInView] = useInView({ triggerOnce: true, threshold: 0.04 })

  return (
    <>
      <Helmet>
        <title>{t('Pricing – Pixl Develop', 'Preise – Pixl Develop')}</title>
        <meta
          name="description"
          content={t(
            'Website Packages, Mobile App Packages, Pitchdeck, and Business Plan Offerings. Request a tailored offer from Pixl Develop.',
            'Website-Pakete, App-Pakete, Pitchdeck und Businessplan — fordern Sie ein maßgeschneidertes Angebot von Pixl Develop an.',
          )}
        />
        <link rel="canonical" href="https://pixl-develop.com/prices/" />
      </Helmet>

      <section className="relative overflow-hidden pb-10 pt-32 md:pt-36">
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[min(100%,560px)] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[100px]" />

        <div className="container-max px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-brand-blue/25 bg-brand-blue/[0.08] px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-brand-blue-light">
              {t('Transparent pricing', 'Transparente Preise')}
            </span>
            <h1 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {t('Simple, Clear ', 'Klare und einfache ')}<span className="gradient-text">{t('Pricing', 'Preise')}</span>
            </h1>
            <p className="text-lg text-white/50">{t('No hidden fees. No surprises. Just results.', 'Keine versteckten Kosten. Keine Überraschungen. Nur Ergebnisse.')}</p>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/40">
              {t(
                "Browse packages by category. When you're ready, tap ",
                'Paket nach Kategorie wählen. Wenn Sie bereit sind, klicken Sie auf ',
              )}
              <strong className="text-white/60">{t('Request offer', 'Angebot anfragen')}</strong>
              {t(
                " — we'll send a custom quote. Prices are not listed because every project is scoped individually.",
                ' — wir senden ein individuelles Angebot. Preise sind nicht fest gelistet, da jedes Projekt individuell kalkuliert wird.',
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      <section ref={packagesRef} className="pb-24">
        <div className="container-max space-y-10 px-4 sm:px-6 lg:space-y-12 lg:px-8">
          <PricingBlock
            label={t('Website', 'Website')}
            title={t('Website Packages', 'Website-Pakete')}
            description={t(
              'Three clear levels for marketing sites and online stores. Compare what’s included, then request an offer.',
              'Drei klare Stufen für Marketing-Websites und Online-Shops. Vergleichen Sie die Leistungen und fordern Sie ein Angebot an.',
            )}
            icon={IconMonitor}
          >
            <motion.div
              initial="hidden"
              animate={packagesInView ? 'show' : 'hidden'}
              variants={gridReveal}
              className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8"
            >
              {websitePackages.map((p) => (
                <motion.div key={p.name} variants={cardIn} className="h-full">
                  <PackageTierCard {...p} />
                </motion.div>
              ))}
            </motion.div>
          </PricingBlock>

          <PricingBlock
            label={t('Apps', 'Apps')}
            title={t('Mobile App Packages', 'Mobile-App-Pakete')}
            description={t(
              'Three stages from visual mockup to App Store and Play Store release — same card layout as websites so it’s easy to scan.',
              'Drei Phasen vom visuellen Mockup bis zur Veröffentlichung im App Store und Play Store — im gleichen Kartenlayout wie Websites, damit alles leicht vergleichbar bleibt.',
            )}
            icon={IconPhone}
          >
            <motion.div
              initial="hidden"
              animate={packagesInView ? 'show' : 'hidden'}
              variants={gridReveal}
              className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8"
            >
              {appPackages.map((p) => (
                <motion.div key={p.name} variants={cardIn} className="h-full">
                  <PackageTierCard {...p} badge={null} recommended={false} />
                </motion.div>
              ))}
            </motion.div>
          </PricingBlock>

          <PricingBlock
            label={t('Documents', 'Dokumente')}
            title={t('Pitchdeck & Business Plans', 'Pitchdeck & Businesspläne')}
            description={t(
              'Professional decks and long-form business plans — structured, written, and designed for your audience.',
              'Professionelle Decks und ausführliche Businesspläne — strukturiert, geschrieben und gestaltet für Ihre Zielgruppe.',
            )}
            icon={IconDoc}
          >
            <motion.div
              initial="hidden"
              animate={packagesInView ? 'show' : 'hidden'}
              variants={gridReveal}
              className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
            >
              {documentPackages.map((p) => (
                <motion.div key={p.name} variants={cardIn} className="h-full">
                  <DocumentPackageCard {...p} />
                </motion.div>
              ))}
            </motion.div>
          </PricingBlock>

          <FadeUp className="text-center">
            <p className="text-sm text-white/35">
              {t('Need help choosing?', 'Hilfe bei der Auswahl?')}{' '}
              <Link
                to="/contact-us"
                onClick={() => pushTrackingEvent('initiate_booking')}
                className="text-brand-blue-light transition-colors hover:text-white"
              >
                {t('Book a free consultation', 'Kostenlose Beratung buchen')}
              </Link>
              .
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding border-t border-white/5">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-14 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">
              {t('Frequently Asked ', 'Häufig gestellte ')}<span className="gradient-text">{t('Questions', 'Fragen')}</span>
            </h2>
          </FadeUp>
          <div className="mx-auto max-w-2xl">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.q}
                q={isGerman && faq.qDe ? faq.qDe : faq.q}
                a={isGerman && faq.aDe ? faq.aDe : faq.a}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
