import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '@/i18n/LanguageContext'

const testimonials = [
  {
    quote:
      'Despite my demanding requests, I was excellently taken care of. The team not only implemented my desires but also contributed creative ideas intelligently.',
    quoteDe:
      'Trotz meiner anspruchsvollen Wünsche wurde ich hervorragend betreut. Das Team hat meine Vorstellungen nicht nur umgesetzt, sondern auch kreative Ideen intelligent eingebracht.',
    name: 'Nico G.',
    role: 'CEO, Digital Ventures',
    roleDe: 'CEO, Digital Ventures',
    rating: 5,
    avatar: 'NG',
    color: 'from-slate-600 via-blue-600 to-blue-800',
    accent: '#60a5fa',
    featured: false,
  },
  {
    quote:
      'The guidance from the experts was a decision without regret. My revenue tripled after the development of the branding.',
    quoteDe:
      'Die Beratung durch die Experten war eine Entscheidung, die ich nicht bereue. Mein Umsatz hat sich nach der Entwicklung des Brandings verdreifacht.',
    name: 'Francy A.',
    role: 'Founder, Growth Studio',
    roleDe: 'Gründerin, Growth Studio',
    rating: 5,
    avatar: 'FA',
    color: 'from-blue-500 via-blue-600 to-indigo-900',
    accent: '#3b82f6',
    featured: true,
  },
  {
    quote:
      'Your seriousness in protecting our ideas through the NDA was impressive. The satisfaction guarantee was not just promised but actually delivered.',
    quoteDe:
      'Ihre Ernsthaftigkeit beim Schutz unserer Ideen durch die NDA war beeindruckend. Die Zufriedenheitsgarantie wurde nicht nur versprochen, sondern tatsächlich eingehalten.',
    name: 'Angelina B.',
    role: 'Director, TechStart',
    roleDe: 'Direktorin, TechStart',
    rating: 5,
    avatar: 'AB',
    color: 'from-indigo-600 via-blue-700 to-slate-900',
    accent: '#818cf8',
    featured: false,
  },
]

function Stars({ count = 5, reduceMotion, delay = 0 }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${count} out of 5 stars`}>
      {[...Array(count)].map((_, i) => (
        <motion.span
          key={i}
          initial={reduceMotion ? false : { opacity: 0, scale: 0, rotate: -45 }}
          animate={reduceMotion ? {} : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: delay + i * 0.06, type: 'spring', stiffness: 380, damping: 15 }}
        >
          <svg className="h-4 w-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </motion.span>
      ))}
    </div>
  )
}

const headerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const headerChild = {
  hidden: { opacity: 0, y: 26, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.18 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.94, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

function useIsNarrowMobile() {
  const [isNarrowMobile, setIsNarrowMobile] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 767px)').matches,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(max-width: 767px)')
    const handleChange = () => setIsNarrowMobile(media.matches)
    handleChange()
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  return isNarrowMobile
}

export default function Testimonials() {
  const { t } = useI18n()
  const reduceMotion = useReducedMotion()
  const isMobile = useIsNarrowMobile()
  const [activeCard, setActiveCard] = useState(0)
  const cardRefs = useRef([])
  const [headRef, headInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.08 })

  useEffect(() => {
    if (!isMobile || reduceMotion) return
    const elements = cardRefs.current.filter(Boolean)
    if (!elements.length || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number(entry.target.getAttribute('data-testimonial-index') ?? '0')
          setActiveCard(idx)
        })
      },
      {
        threshold: 0.6,
        rootMargin: '-10% 0px -25% 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isMobile, reduceMotion])

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(37,99,235,0.14),transparent_52%),radial-gradient(ellipse_50%_45%_at_0%_100%,rgba(79,70,229,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 translate-x-1/4 rounded-full bg-brand-blue/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 rounded-full bg-indigo-600/10 blur-[90px]" />

      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          animate={{ backgroundPosition: ['0px 0px', '48px 48px'] }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      )}

      <svg
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-24 h-32 w-32 text-brand-blue/15 sm:left-[12%]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M10 50 Q50 10 90 50 T90 90" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="10" cy="50" r="2" fill="currentColor" className="text-brand-blue-light/40" />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-32 right-[6%] h-28 w-28 rotate-180 text-brand-blue/12"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M10 50 Q50 10 90 50 T90 90" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="container-max relative z-[1]">
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headInView ? 'show' : 'hidden'}
          variants={headerVariants}
          className="mx-auto mb-16 max-w-3xl text-center sm:mb-20"
        >
          <motion.div variants={headerChild} className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/35 bg-brand-blue/[0.1] px-4 py-1.5 font-mono text-xs tracking-[0.26em] text-brand-blue-light shadow-[0_0_36px_rgba(37,99,235,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-35" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
              </span>
              {t('Client Testimonials', 'Kundenbewertungen')}
            </span>
          </motion.div>
          <motion.h2
            variants={headerChild}
            className="mb-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {t('What Our ', 'Was unsere ')}<span className="gradient-text">{t('Clients Say', 'Kunden sagen')}</span>
          </motion.h2>
          <motion.p variants={headerChild} className="text-lg text-white/50">
            {t(
              "Real results from real clients. Here's what partnering with Pixl Develop looks like.",
              'Echte Ergebnisse von echten Kunden. So sieht die Zusammenarbeit mit Pixl Develop aus.',
            )}
          </motion.p>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial={isMobile ? false : 'hidden'}
          animate={isMobile ? undefined : gridInView ? 'show' : 'hidden'}
          variants={isMobile ? undefined : gridVariants}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch md:gap-5 lg:gap-6"
        >
          {testimonials.map((item, i) => (
            <motion.article
              key={item.name}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              data-testimonial-index={i}
              variants={isMobile ? undefined : cardVariants}
              initial={
                isMobile && !reduceMotion
                  ? {
                      opacity: i === 0 ? 1 : 0.32,
                      y: i === 0 ? 0 : 54,
                      x: 0,
                      scale: i === 0 ? 1 : 0.95,
                      filter: i === 0 ? 'blur(0px)' : 'blur(3px)',
                    }
                  : undefined
              }
              animate={
                isMobile && !reduceMotion
                  ? i === activeCard
                    ? {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                      }
                    : i < activeCard
                      ? {
                          opacity: 0.56,
                          y: -22,
                          x: i % 2 === 0 ? -70 : 70,
                          scale: 0.965,
                          filter: 'blur(1.5px)',
                        }
                      : {
                          opacity: 0.32,
                          y: 54,
                          x: 0,
                          scale: 0.95,
                          filter: 'blur(3px)',
                        }
                  : undefined
              }
              className={`group relative flex min-h-[280px] flex-col ${item.featured ? 'md:-mt-2 md:mb-2 md:scale-[1.02] lg:scale-105' : ''}`}
              whileHover={reduceMotion ? {} : { y: -8 }}
              transition={
                isMobile && !reduceMotion
                  ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                  : { type: 'spring', stiffness: 340, damping: 22 }
              }
            >
              {item.featured && (
                <div
                  aria-hidden
                  className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-brand-blue-light/50 via-brand-blue/30 to-indigo-600/40 opacity-80 blur-[1px]"
                />
              )}
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-gradient-to-b p-7 sm:p-8 ${
                  item.featured
                    ? 'border-brand-blue/40 from-brand-bgAlt/[0.98] via-brand-bg/95 to-[#050508] shadow-[0_0_0_1px_rgba(59,130,246,0.2)_inset,0_24px_80px_-20px_rgba(37,99,235,0.25)]'
                    : 'border-white/[0.09] from-brand-bgAlt/95 via-brand-bg/92 to-[#06060c] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_64px_-24px_rgba(0,0,0,0.7)]'
                } backdrop-blur-xl transition-[border-color,box-shadow] duration-500 group-hover:border-brand-blue/35 group-hover:shadow-[0_0_0_1px_rgba(59,130,246,0.15)_inset,0_32px_72px_-20px_rgba(37,99,235,0.18)]`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-4 top-6 font-display text-[7rem] font-black leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-brand-blue/[0.06] sm:text-[7.5rem]"
                >
                  ”
                </div>

                <div
                  aria-hidden
                  className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-60"
                />
                <div
                  aria-hidden
                  className="absolute left-8 top-0 h-0.5 w-16 rounded-b-full opacity-90 transition-all duration-500 group-hover:w-24 sm:left-10"
                  style={{
                    background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                    boxShadow: `0 0 20px ${item.accent}55`,
                  }}
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(90% 55% at 50% 0%, ${item.accent}18, transparent 65%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 transition duration-500 ease-out group-hover:translate-x-full group-hover:opacity-100"
                />

                <div className="relative mb-5 flex items-center justify-between gap-3">
                  <Stars count={item.rating} reduceMotion={!!reduceMotion} delay={i * 0.08} />
                  {item.featured && (
                    <span className="shrink-0 rounded-full border border-brand-blue/30 bg-brand-blue/[0.12] px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-brand-blue-light/90">
                      {t('Spotlight', 'Highlight')}
                    </span>
                  )}
                </div>

                <blockquote className="relative flex flex-1 flex-col">
                  <p className="flex-1 font-display text-[0.95rem] font-medium leading-relaxed text-white/75 sm:text-base">
                    <span className="text-brand-blue-light/45" aria-hidden>
                      “
                    </span>
                    {t(item.quote, item.quoteDe)}
                    <span className="text-brand-blue-light/45" aria-hidden>
                      ”
                    </span>
                  </p>

                  <footer className="relative mt-8 flex items-center gap-4 border-t border-white/[0.08] pt-6">
                    <div className="relative shrink-0">
                      <div
                        aria-hidden
                        className="absolute -inset-0.5 rounded-full opacity-60 blur-[6px]"
                        style={{ background: `linear-gradient(135deg, ${item.accent}, transparent)` }}
                      />
                      <div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-sm font-bold text-white ring-2 ring-white/15 transition-transform duration-300 group-hover:scale-105`}
                      >
                        {item.avatar}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <cite className="not-italic">
                        <span className="block font-display text-base font-semibold text-white">{item.name}</span>
                        <span className="mt-0.5 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/40">
                          {t(item.role, item.roleDe)}
                        </span>
                      </cite>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
