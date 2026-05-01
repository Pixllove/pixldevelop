import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '@/i18n/LanguageContext'

const d = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`

const services = [
  {
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Storybrand marketing strategy',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'StoryBrand',
    titleDe: 'Storybrand',
    tagline: 'Clarify. Connect. Convert.',
    taglineDe: 'Klären. Verbinden. Konvertieren.',
    description:
      'Transform your message with powerful storytelling for clear, compelling online marketing that converts visitors into loyal customers.',
    descriptionDe:
      'Verwandeln Sie Ihre Botschaft mit starkem Storytelling in klares, überzeugendes Online-Marketing, das Besucher in loyale Kunden verwandelt.',
    iconGradient: 'from-slate-600 to-blue-800',
    accentColor: '#60a5fa',
    topBarColor: 'from-blue-400',
    topBarGlow: 'rgba(96,165,250,0.55)',
  },
  {
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Creative design work',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Design',
    titleDe: 'Design',
    tagline: 'Unique. Memorable. Impactful.',
    taglineDe: 'Einzigartig. Merkbar. Wirkungsvoll.',
    description:
      'Unique and impressive digital presence. Our design team creates a trust-building identity that sets your brand apart from the competition.',
    descriptionDe:
      'Ein einzigartiger und beeindruckender digitaler Auftritt. Unser Design-Team schafft eine vertrauensbildende Identität, die Ihre Marke vom Wettbewerb abhebt.',
    iconGradient: 'from-blue-600 to-indigo-700',
    accentColor: '#818cf8',
    topBarColor: 'from-indigo-400',
    topBarGlow: 'rgba(129,140,248,0.55)',
  },
  {
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Website development coding',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Website Development',
    titleDe: 'Webentwicklung',
    tagline: 'Fast. SEO. Scalable.',
    taglineDe: 'Schnell. SEO. Skalierbar.',
    description:
      'Your website is the centerpiece of your digital success story. We design, maintain and optimize your digital presence for maximum impact.',
    descriptionDe:
      'Ihre Website ist das Zentrum Ihrer digitalen Erfolgsgeschichte. Wir gestalten, betreuen und optimieren Ihre digitale Präsenz für maximale Wirkung.',
    iconGradient: 'from-slate-900 to-blue-800',
    accentColor: '#3b82f6',
    topBarColor: 'from-blue-500',
    topBarGlow: 'rgba(37,99,235,0.55)',
    techLogos: [
      { src: d('nextjs/nextjs-original.svg'), alt: 'Next.js', invert: true },
      { src: d('react/react-original.svg'), alt: 'React' },
      { src: d('typescript/typescript-original.svg'), alt: 'TypeScript' },
      { src: d('tailwindcss/tailwindcss-original.svg'), alt: 'Tailwind' },
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Mobile app development',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'App Development',
    titleDe: 'App-Entwicklung',
    tagline: 'iOS. Android. Cross-platform.',
    taglineDe: 'iOS. Android. Plattformübergreifend.',
    description:
      'Our app development services empower you to transform your idea into innovative applications. We ensure your vision becomes a reality.',
    descriptionDe:
      'Unsere App-Entwicklung hilft Ihnen, Ihre Idee in innovative Anwendungen umzusetzen. Wir sorgen dafür, dass Ihre Vision Realität wird.',
    iconGradient: 'from-indigo-950 to-indigo-700',
    accentColor: '#6366f1',
    topBarColor: 'from-indigo-500',
    topBarGlow: 'rgba(99,102,241,0.55)',
    techLogos: [
      { src: d('flutter/flutter-original.svg'), alt: 'Flutter' },
      { src: d('react/react-original.svg'), alt: 'React' },
      { src: d('typescript/typescript-original.svg'), alt: 'TypeScript' },
      { src: d('swift/swift-original.svg'), alt: 'Swift' },
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Cloud infrastructure and server operations',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 15a4 4 0 014-4h.28A6 6 0 1118 12h1a3 3 0 010 6H7a4 4 0 01-4-3z"
        />
      </svg>
    ),
    title: 'Infrastructure',
    titleDe: 'Infrastruktur',
    tagline: 'Cloud. Security. Reliability.',
    taglineDe: 'Cloud. Sicherheit. Zuverlässigkeit.',
    description:
      'We design and manage scalable infrastructure with secure deployments, monitoring, backups, and high-availability architecture for stable growth.',
    descriptionDe:
      'Wir entwickeln und betreuen skalierbare Infrastruktur mit sicheren Deployments, Monitoring, Backups und hochverfügbarer Architektur für stabiles Wachstum.',
    iconGradient: 'from-cyan-700 to-blue-900',
    accentColor: '#22d3ee',
    topBarColor: 'from-cyan-400',
    topBarGlow: 'rgba(34,211,238,0.55)',
    techLogos: [
      { src: d('amazonwebservices/amazonwebservices-original-wordmark.svg'), alt: 'AWS' },
      { src: d('docker/docker-original.svg'), alt: 'Docker' },
      { src: d('kubernetes/kubernetes-plain.svg'), alt: 'Kubernetes' },
      { src: d('nginx/nginx-original.svg'), alt: 'Nginx' },
    ],
  },
]

function TechLogo({ src, alt, invert = false, index, reduceMotion }) {
  const [bad, setBad] = useState(false)
  if (bad) return null
  return (
    <motion.div
      animate={reduceMotion ? {} : { y: [0, -4, 0] }}
      transition={{ duration: 3.2 + index * 0.28, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-2 shadow-[0_4px_16px_rgba(0,0,0,0.3)] ring-1 ring-inset ring-white/[0.04] transition-all duration-300 group-hover:border-brand-blue/30 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.14)]"
    >
      <img
        src={src}
        alt={alt}
        width={22}
        height={22}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setBad(true)}
        className={[
          'h-[22px] w-[22px] object-contain transition duration-300 group-hover:scale-110',
          invert ? 'dark:invert' : '',
        ].join(' ')}
      />
    </motion.div>
  )
}

const headerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const headerChild = {
  hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.95, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/** Tailwind `md` breakpoint — mobile-only alternating card entrance */
const MOBILE_MAX = '(max-width: 767px)'

function useIsNarrowMobile() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MAX).matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MAX)
    const onChange = () => setNarrow(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return narrow
}

export default function Services() {
  const { t } = useI18n()
  const reduceMotion = useReducedMotion()
  const isMobile = useIsNarrowMobile()
  const [headRef, headInView] = useInView({ triggerOnce: true, threshold: 0.12 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.06 })

  return (
    <section className="section-padding relative overflow-hidden bg-[#05070f]">

      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.13),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-80 w-[min(100%,56rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />

      {/* Subtle animated grid */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
          animate={{ backgroundPosition: ['0px 0px', '44px 44px'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      )}

      <div className="container-max relative z-[1]">

        {/* Section header */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headInView ? 'show' : 'hidden'}
          variants={headerVariants}
          className="mb-16 text-center"
        >
          <motion.div variants={headerChild} className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/[0.1] px-4 py-1.5 font-mono text-xs tracking-[0.22em] text-brand-blue-light shadow-[0_0_36px_rgba(37,99,235,0.14)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
              </span>
              {t('What We Do', 'Was wir tun')}
            </span>
          </motion.div>
          <motion.h2
            variants={headerChild}
            className="mb-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {t('Our Core ', 'Unsere ')}<span className="gradient-text">{t('Services', 'Leistungen')}</span>
          </motion.h2>
          <motion.p variants={headerChild} className="mx-auto max-w-xl text-lg leading-relaxed text-white/45">
            {t(
              'Everything you need to build and grow a powerful digital presence — under one roof.',
              'Alles, was Sie brauchen, um eine starke digitale Präsenz aufzubauen und zu skalieren — aus einer Hand.',
            )}
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={gridRef}
          {...(isMobile
            ? { initial: false }
            : { initial: 'hidden', animate: gridInView ? 'show' : 'hidden', variants: gridVariants })}
          className="grid grid-cols-1 gap-7 md:grid-cols-6 md:gap-8"
        >
          {services.map((service, i) => {
            const fromLeft = i % 2 === 0
            const mobileMotion =
              isMobile && !reduceMotion
                ? {
                    initial: { opacity: 0, x: fromLeft ? -48 : 48 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true, amount: 0.22, margin: '0px 0px -12% 0px' },
                    transition: {
                      duration: 1.15,
                      ease: [0.32, 0.72, 0, 1],
                    },
                  }
                : isMobile && reduceMotion
                  ? { initial: false }
                  : { variants: cardVariants }

            return (
            <motion.article
              key={`${service.title}-${i}`}
              {...mobileMotion}
              className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0f1e] shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset ${
                i < 2 ? 'md:col-span-3' : 'md:col-span-2'
              }`}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      y: -10,
                      scale: 1.012,
                      transition: { type: 'spring', stiffness: 280, damping: 22 },
                    }
              }
            >
              {/* Shine sweep on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 -translate-x-full skew-x-[-14deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition duration-700 ease-out group-hover:translate-x-full"
              />

              {/* Hover glow border */}
              <div
                aria-hidden
                className="absolute -inset-[1px] rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `linear-gradient(135deg, ${service.accentColor}44, transparent 40%, rgba(99,102,241,0.2))` }}
              />

              {/* Top accent bar */}
              <div
                aria-hidden
                className={`absolute left-6 top-0 z-20 h-[3px] w-16 rounded-b-full bg-gradient-to-r ${service.topBarColor} to-transparent transition-all duration-500 group-hover:w-24`}
                style={{ boxShadow: `0 0 20px ${service.topBarGlow}` }}
              />

              {/* Image with zoom */}
              <div className="relative h-48 overflow-hidden sm:h-52">
                <motion.img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover brightness-[0.6] saturate-110 transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                {/* Image fade to card bg */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0f1e]" />

                {/* Large number watermark */}
                <span
                  aria-hidden
                  className="absolute right-5 top-4 select-none font-mono text-[5rem] font-black leading-none tracking-tighter text-white/[0.08] transition-colors duration-500 group-hover:text-white/[0.15]"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.07)' }}
                >
                  0{i + 1}
                </span>

              </div>

              {/* Card body */}
              <div className="relative px-7 pb-7 pt-9">
                {/* Background glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(70% 50% at 15% 0%, rgba(${hexToRgb(service.accentColor)},0.12), transparent 60%)`,
                  }}
                />

                <span className="mb-3 inline-flex rounded-full border border-brand-blue/20 bg-brand-blue/[0.07] px-3 py-1 font-mono text-[0.68rem] leading-none tracking-wide text-brand-blue-light/90">
                  {t(service.tagline, service.taglineDe)}
                </span>

                <h3 className="mb-3 font-display text-[1.6rem] font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-blue-light">
                  {t(service.title, service.titleDe)}
                </h3>

                <p className="mb-7 text-[0.92rem] leading-relaxed text-white/50">
                  {t(service.description, service.descriptionDe)}
                </p>

                {service.techLogos?.length > 0 && (
                  <>
                    {/* Stack divider */}
                    <div className="mb-3 flex items-center gap-2.5">
                      <span className="h-px w-12 flex-none bg-gradient-to-r from-brand-blue-light/40 to-transparent" />
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/30">{t('Stack', 'Technologien')}</span>
                      <span className="h-px flex-1 bg-gradient-to-l from-brand-blue-light/20 to-transparent" />
                    </div>

                    <div className="mb-7 flex flex-wrap gap-2.5">
                      {service.techLogos.map((logo, idx) => (
                        <TechLogo
                          key={`${service.title}-${idx}`}
                          src={logo.src}
                          alt={logo.alt}
                          invert={logo.invert}
                          index={idx}
                          reduceMotion={!!reduceMotion}
                        />
                      ))}
                    </div>
                  </>
                )}

                <Link
                  to="/contact-us"
                  onClick={() => {
                    window.dataLayer = window.dataLayer || []
                    window.dataLayer.push({ event: 'initiate_booking' })
                  }}
                  className="group/cta inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/[0.09] px-5 py-2.5 text-[0.85rem] font-semibold text-brand-blue-light shadow-[0_0_20px_rgba(37,99,235,0.1)] transition-all duration-300 hover:border-brand-blue/50 hover:bg-brand-blue/[0.17] hover:shadow-[0_0_30px_rgba(37,99,235,0.22)]"
                >
                  <span>{t('Get Free Consultation', 'Kostenlose Beratung anfragen')}</span>
                  <svg
                    className="h-[15px] w-[15px] transition-transform duration-300 group-hover/cta:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Helper – converts hex to "r,g,b" string for rgba() use
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}