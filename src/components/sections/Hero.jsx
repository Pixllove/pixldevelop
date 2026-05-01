import { useRef, useCallback, useLayoutEffect, useMemo, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/LanguageContext'
import { projects } from '@/data/projects'
import { getProjectCoverImage } from '@/data/projectCovers'

const wordReveal = {
  hidden: { opacity: 0, y: 36, filter: 'blur(14px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const lineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const statStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 1 } },
}

const statItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const heroBadges = [
  {
    key: 'web',
    labelEn: 'Web Dev',
    labelDe: 'Web-Entw.',
    pos: '-top-8 -left-8',
    delay: 0,
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l-3 3 3 3m8-6l3 3-3 3M13 7l-2 10" />
      </svg>
    ),
  },
  {
    key: 'app',
    labelEn: 'App Dev',
    labelDe: 'App-Entw.',
    pos: '-top-8 -right-8',
    delay: 0.15,
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: 'brand',
    labelEn: 'Branding',
    labelDe: 'Branding',
    pos: '-bottom-4 -left-8',
    delay: 0.3,
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16l-4 4m0 0l4-4m-4 4h18M10 4l10 10M14 4l6 6M4 10l6 6" />
      </svg>
    ),
  },
  {
    key: 'market',
    labelEn: 'Marketing',
    labelDe: 'Marketing',
    pos: '-bottom-4 -right-8',
    delay: 0.45,
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
  },
]

function HeroTechLines({ reduceMotion }) {
  if (reduceMotion) return null
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-brand-blue-light/25"
      preserveAspectRatio="none"
      viewBox="0 0 1200 800"
    >
      <defs>
        <linearGradient id="hero-line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[
        'M0,320 C200,180 400,460 600,320 S1000,200 1200,380',
        'M0,520 C280,640 520,400 780,520 S1080,680 1200,480',
        'M200,0 C320,200 180,420 400,600 S700,720 900,800',
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#hero-line-glow)"
          strokeWidth="1.1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.4 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {/* Nodes */}
      {[
        [180, 300],
        [600, 310],
        [960, 400],
        [420, 560],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={`n-${i}`}
          cx={cx}
          cy={cy}
          r="3"
          className="fill-brand-blue-light"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ delay: 1.2 + i * 0.12, type: 'spring', stiffness: 200, damping: 18 }}
        />
      ))}
    </svg>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [activePreview, setActivePreview] = useState(0)

  const previewSlides = useMemo(
    () =>
      projects
        .slice(0, 3)
        .map((project) => ({
          id: project.id,
          title: project.title,
          image: getProjectCoverImage(project.id),
        }))
        .filter((slide) => Boolean(slide.image)),
    [],
  )

  useEffect(() => {
    if (reduceMotion || previewSlides.length <= 1) return
    const interval = window.setInterval(() => {
      setActivePreview((prev) => (prev + 1) % previewSlides.length)
    }, 2600)
    return () => window.clearInterval(interval)
  }, [previewSlides.length, reduceMotion])

  const mouseX = useMotionValue(-500)
  const mouseY = useMotionValue(-500)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 38, mass: 0.9 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 38, mass: 0.9 })

  const spotlight = useMotionTemplate`radial-gradient(720px circle at ${springX}px ${springY}px, rgba(96,165,250,0.18) 0%, rgba(37,99,235,0.08) 28%, transparent 52%)`

  const handlePointerMove = useCallback(
    (e) => {
      if (!sectionRef.current || reduceMotion) return
      const r = sectionRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - r.left)
      mouseY.set(e.clientY - r.top)
    },
    [mouseX, mouseY, reduceMotion]
  )

  const handlePointerLeave = useCallback(() => {
    if (!sectionRef.current || reduceMotion) return
    const r = sectionRef.current.getBoundingClientRect()
    mouseX.set(r.width * 0.72)
    mouseY.set(r.height * 0.38)
  }, [mouseX, mouseY, reduceMotion])

  useLayoutEffect(() => {
    if (reduceMotion) return
    const el = sectionRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mouseX.set(r.width * 0.72)
    mouseY.set(r.height * 0.38)
  }, [mouseX, mouseY, reduceMotion])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const activePreviewSlide = previewSlides[activePreview] ?? previewSlides[0]

  const trackInitiateBooking = () => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'initiate_booking',
    })
  }

  return (
    <motion.section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-screen flex items-center overflow-hidden grid-bg selection:bg-brand-blue/30"
    >
      {/* Base atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(37,99,235,0.14),transparent_50%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[45vh] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.12),transparent_70%)]" />

      {/* Mouse-follow spotlight (IT / product feel) */}
      {!reduceMotion && (
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[1]" style={{ background: spotlight }} />
      )}

      <HeroTechLines reduceMotion={reduceMotion} />

      {/* Moving scan */}
      {!reduceMotion && (
        <div
          aria-hidden
          className="hero-scan-line pointer-events-none absolute left-0 right-0 z-[2] h-px bg-gradient-to-r from-transparent via-brand-blue-light/45 to-transparent shadow-[0_0_24px_rgba(96,165,250,0.35)]"
        />
      )}

      {/* Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-[520px] w-[520px] rounded-full bg-brand-blue/14 blur-[130px] animate-orb" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[420px] w-[420px] rounded-full bg-indigo-950/80 blur-[120px] animate-orb-reverse" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/10 blur-[90px]" />

      {/* Grid parallax layer (subtle, no scroll-bound text) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.65]"
        animate={reduceMotion ? {} : { backgroundPosition: ['0px 0px', '50px 50px'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Spark dots */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-brand-blue-light/50 shadow-[0_0_12px_rgba(96,165,250,0.6)]"
          style={{
            left: `${8 + (i * 7) % 88}%`,
            top: `${12 + ((i * 13) % 70)}%`,
          }}
          animate={
            reduceMotion
              ? {}
              : {
                  opacity: [0.2, 1, 0.2],
                  scale: [0.85, 1.15, 0.85],
                }
          }
          transition={{
            duration: 2.8 + (i % 5) * 0.4,
            repeat: Infinity,
            delay: i * 0.22,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 pb-20 pt-32 md:pt-36">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Copy */}
          <div>
            {/* <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-blue/35 bg-brand-blue/[0.07] px-4 py-2 shadow-[0_0_32px_rgba(37,99,235,0.12)] backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-300">{t('Digital Product Experts', 'Experten für digitale Produkte')}</span>
            </motion.div> */}

            <motion.h1
              variants={lineContainer}
              initial="hidden"
              animate="show"
              className="font-display mb-10 text-5xl font-bold leading-[1.06] sm:text-6xl lg:text-7xl"
            >
              <span className="block text-white">
                <motion.span variants={wordReveal} className="mr-3 inline-block sm:mr-4">
                  {t('Your', 'Ihre')}
                </motion.span>
                <motion.span variants={wordReveal} className="inline-block text-brand-blue-light">
                  {t('Experts', 'Experten')}
                </motion.span>
              </span>
              <span className="mt-1 block text-white">
                <motion.span variants={wordReveal} className="inline-block">
                  {t('For Your', 'für Ihr')}{' '}
                </motion.span>
                <motion.span variants={wordReveal} className="inline-block gradient-text">
                  {t('Digital Product', 'Digitales Produkt')}
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.55 }}
              className="font-display mb-12 max-w-lg text-xl font-medium text-white sm:text-2xl"
            >
              {t('We Turn Ideas into Reality', 'Wir verwandeln Ideen in Realität')}
            </motion.p>

            {/* <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.62 }}
              className="mb-10 max-w-lg text-lg leading-relaxed text-white/55"
            >
              {t(
                'From storybrand strategy to world-class design and development — we build digital products that grow your business.',
                'Von Storybrand-Strategie bis zu erstklassigem Design und Entwicklung — wir bauen digitale Produkte, die Ihr Unternehmen wachsen lassen.',
              )}
            </motion.p> */}

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.72 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact-us" onClick={trackInitiateBooking} className="btn-primary text-base">
                <span>{t('Book Free Consultation', 'Kostenlose Beratung buchen')}</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              {/* <Link to="/expertise" className="btn-outline text-base">
                <span>{t('Our Services', 'Unsere Services')}</span>
              </Link> */}
            </motion.div>

            <motion.div
              variants={statStagger}
              initial="hidden"
              animate="show"
              className="mt-14 flex gap-10"
            >
              {[
                { value: '100+', label: t('Projects Done', 'Abgeschlossene Projekte') },
                { value: '50+', label: t('Happy Clients', 'Zufriedene Kunden') },
                { value: '5★', label: t('Average Rating', 'Durchschnittsbewertung') },
              ].map((stat) => (
                <motion.div key={stat.label} variants={statItem}>
                  <div className="font-display text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="mt-0.5 font-body text-xs text-white/40">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Visual hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden items-center justify-center lg:-mt-10 lg:flex"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
              className="absolute h-[500px] w-[500px] rounded-full border border-brand-blue/20"
            />
            <motion.div
              animate={reduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
              className="absolute h-[400px] w-[400px] rounded-full border border-white/[0.09] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
            />

            {/* Rotating rim + glass core */}
            <div className="relative">
              {!reduceMotion && (
                <div
                  aria-hidden
                  className="hero-orbit-spin pointer-events-none absolute -inset-[3px] rounded-[1.4rem] opacity-90 [background:conic-gradient(from_0deg_at_50%_50%,#3b82f6,#6366f1,#a855f7,#2563eb,#3b82f6)] blur-[0.5px]"
                />
              )}
              <div className="relative flex h-80 w-72 flex-col items-center justify-center gap-4 rounded-[1.25rem] border border-white/10 bg-[linear-gradient(155deg,rgba(17,24,39,0.96),rgba(2,6,23,0.96))] p-6 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_-12px_rgba(0,0,0,0.75),0_0_60px_-10px_rgba(37,99,235,0.25)] backdrop-blur-xl noise-overlay">
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue-light/45 to-transparent" />
                <Link
                  to={activePreviewSlide ? `/projects/${activePreviewSlide.id}` : '/projects'}
                  aria-label={activePreviewSlide ? `${t('View project', 'Projekt ansehen')}: ${activePreviewSlide.title}` : t('View projects', 'Projekte ansehen')}
                  className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/35 transition-all duration-300 hover:border-brand-blue/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60"
                >
                  {/* Live Preview header removed per request */}
                  <div className="relative h-32">
                    {previewSlides.map((slide, idx) => (
                      <motion.img
                        key={slide.id}
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        animate={idx === activePreview ? { opacity: 1, scale: 1.03 } : { opacity: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                      <span className="line-clamp-1 text-left font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/70">
                        {previewSlides[activePreview]?.title}
                      </span>
                      <span className="rounded-full border border-brand-blue/40 bg-brand-blue/20 px-2 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-brand-blue-light transition-colors group-hover:border-brand-blue-light/70 group-hover:bg-brand-blue/30">
                        {t('Case', 'Case')}
                      </span>
                    </div>
                  </div>
                </Link>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{t('We Turn Ideas', 'Wir verwandeln Ideen')}</h3>
                  <p className="font-display text-xl font-bold text-brand-blue-light">{t('Into Reality', 'in Realität')}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/35">{t('Design • Build • Scale', 'Design • Build • Scale')}</p>
                </div>
                <div className="flex gap-2">
                  {['#60a5fa', '#3b82f6', '#1d4ed8'].map((c) => (
                    <motion.div
                      key={c}
                      className="h-3 w-3 rounded-full"
                      style={{ background: c }}
                      animate={reduceMotion ? {} : { scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    />
                  ))}
                </div>
                {/* Live Product Team badge removed per request */}
              </div>
            </div>

            {heroBadges.map((badge) => (
              <motion.div
                key={badge.key}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + badge.delay, type: 'spring', stiffness: 200, damping: 20 }}
                className={`absolute ${badge.pos} z-10 flex items-center gap-2 rounded-xl border border-white/12 bg-brand-bg/80 px-3 py-2 font-mono text-xs text-white/75 shadow-lg shadow-black/30 backdrop-blur-md`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-blue/15 text-brand-blue-light/90">
                  {badge.icon}
                </span>
                <motion.span
                  animate={reduceMotion ? {} : { y: [0, -5, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: badge.delay }}
                >
                  {t(badge.labelEn, badge.labelDe)}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">{t('Scroll', 'Scrollen')}</span>
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="h-9 w-px bg-gradient-to-b from-brand-blue-light/70 to-transparent"
        />
      </motion.div>
    </motion.section>
  )
}
