import { useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '@/i18n/LanguageContext'

const stack = [
  {
    name: 'React',
    cat: 'UI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  },
  {
    name: 'Next.js',
    cat: 'Framework',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'Vue.js',
    cat: 'UI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  },
  {
    name: 'Node.js',
    cat: 'Runtime',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'TypeScript',
    cat: 'Language',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  },
  {
    name: 'Tailwind CSS',
    cat: 'Styling',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'Figma',
    cat: 'Design',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
  },
  {
    name: 'Framer',
    cat: 'Motion',
    logo: 'https://cdn.simpleicons.org/framer/0055FF',
  },
  {
    name: 'WordPress',
    cat: 'CMS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg',
  },
  {
    name: 'Shopify',
    cat: 'Commerce',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/shopify/shopify-original.svg',
  },
  {
    name: 'React Native',
    cat: 'Mobile',
    logo: 'https://reactnative.dev/img/header_logo.svg',
  },
  {
    name: 'Flutter',
    cat: 'Mobile',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  },
  {
    name: 'AWS',
    cat: 'Cloud',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  {
    name: 'Vercel',
    cat: 'Edge',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
  },
  {
    name: 'MongoDB',
    cat: 'Data',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  },
]

function TechLogo({ name, src, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue/30 to-brand-blue-dark/40 font-mono text-sm font-bold text-white/90 sm:h-12 sm:w-12 ${className}`}
        aria-hidden
      >
        {name
          .split(/[\s.]/)
          .map((w) => w[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={`${name} logo`}
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`max-h-full max-w-full object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  )
}

function TechDeckLines({ reduceMotion }) {
  if (reduceMotion) return null
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-brand-blue-light/[0.14]"
      preserveAspectRatio="none"
      viewBox="0 0 1200 500"
    >
      <defs>
        <linearGradient id="tech-stack-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {['M0,220 C280,120 520,320 780,200 S1080,160 1200,240', 'M0,320 C400,420 720,180 1200,300'].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#tech-stack-line)"
          strokeWidth="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.15 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  )
}

const headerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
}

const headerItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
}

const gridItem = {
  hidden: { opacity: 0, y: 26, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function TechMarquee() {
  const { t } = useI18n()
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const [headRef, headInView] = useInView({ triggerOnce: true, threshold: 0.12 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.06 })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-brand-blue/15 py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-15%,rgba(37,99,235,0.18),transparent_55%),radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(79,70,229,0.06),transparent_50%)]" />
      <div
        className={`pointer-events-none absolute inset-0 grid-bg opacity-50 ${reduceMotion ? '' : 'tech-grid-drift'}`}
      />
      <TechDeckLines reduceMotion={reduceMotion} />

      <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-blue/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-48 w-48 rounded-full bg-indigo-600/10 blur-[80px]" />

      <div className="container-max relative z-[1] px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headInView ? 'show' : 'hidden'}
          variants={headerContainer}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <motion.div variants={headerItem} className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/35 bg-brand-blue/[0.1] px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.26em] text-brand-blue-light shadow-[0_0_36px_rgba(37,99,235,0.18)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-35" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
              </span>
              {t('Technologies We Use', 'Technologien, die wir verwenden')}
            </div>
          </motion.div>

          <motion.h2
            variants={headerItem}
            className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            {t('Build faster ', 'Schnellere Entwicklung ')}
            <span className="bg-gradient-to-r from-brand-blue-light via-white to-brand-blue-light bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift">
              {t('with modern,', 'mit modernen,')}
            </span>{' '}
            {t(' reliable technologies.', ' zuverlässigen Technologien.')}
          </motion.h2>

          <motion.p
            variants={headerItem}
            className="mx-auto mt-5 max-w-2xl font-mono text-sm leading-relaxed text-brand-blue-light/50 sm:text-[0.95rem]"
          >
            {t(
              "We use modern technologies like React, Node.js, and AWS to build scalable web and mobile applications.",
              'Wir verwenden moderne Technologien wie React, Node.js und AWS, um skalierbare Web- und Mobilanwendungen zu entwickeln.',
            )}
          </motion.p>

          <motion.div
            variants={headerItem}
            className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <div className="rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-center backdrop-blur-sm">
              <div className="font-display text-2xl font-bold tabular-nums text-white sm:text-3xl">15+</div>
              <div className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brand-blue-light/45">
                {t('technologies', 'Technologien')}
              </div>
            </div>
            <div className="max-w-xs rounded-xl border border-brand-blue/25 bg-brand-blue/[0.08] px-5 py-3 text-center font-mono text-xs leading-snug text-brand-blue-light/75 sm:text-[0.8rem]">
              {t('Always up-to-date with a strong focus on security and performance.', 'Immer aktuell mit einem starken Fokus auf Sicherheit und Performance.')}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? 'show' : 'hidden'}
          variants={gridContainer}
          className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
        >
          {stack.map((item) => (
            <motion.article
              key={item.name}
              variants={gridItem}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 shadow-[0_0_0_1px_rgba(37,99,235,0.05)_inset,0_20px_48px_-20px_rgba(0,0,0,0.65)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-brand-blue/30 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.2)_inset,0_24px_56px_-16px_rgba(37,99,235,0.2)]"
              whileHover={
                reduceMotion
                  ? {}
                  : { y: -6, transition: { type: 'spring', stiffness: 400, damping: 24 } }
              }
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(120% 80% at 50% 0%, rgba(59,130,246,0.12), transparent 55%)',
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-10deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition duration-500 ease-out group-hover:translate-x-full group-hover:opacity-100"
              />

              <div className="relative mb-3 flex h-16 items-center justify-center rounded-xl bg-white/[0.07] ring-1 ring-white/[0.08] transition-colors duration-300 group-hover:bg-white/[0.1]">
                <TechLogo name={item.name} src={item.logo} className="h-11 w-11 sm:h-12 sm:w-12" />
              </div>

              <div className="relative text-center">
                <h3 className="font-display text-sm font-semibold leading-snug text-white sm:text-[0.95rem]">
                  {item.name}
                </h3>
                <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-blue-light/40 sm:text-[0.65rem]">
                  {item.cat}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
