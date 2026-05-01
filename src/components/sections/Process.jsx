import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FadeUp, StaggerContainer, staggerItem } from '@/components/ui/AnimatedSection'
import { useI18n } from '@/i18n/LanguageContext'

const steps = (t) => [
  {
    num: '01',
    title: t('Discovery Call', 'Erstgespräch'),
    desc: t(
      'We start with a free consultation to understand your goals, audience, and vision. No fluff — just focused strategy.',
      'Wir starten mit einer kostenlosen Beratung, um Ihre Ziele, Zielgruppe und Vision zu verstehen. Keine Floskeln, nur klare Strategie.',
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: t('Strategy & Design', 'Strategie & Design'),
    desc: t(
      'We craft a tailored brand story and design system — wireframes, prototypes, and pixel-perfect UI that resonates.',
      'Wir entwickeln eine maßgeschneiderte Markenstory und ein Designsystem — Wireframes, Prototypen und pixelgenaue UI mit Wirkung.',
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: t('Development', 'Entwicklung'),
    desc: t(
      'Our engineers build your product with clean code, optimized performance, and scalable architecture from day one.',
      'Unsere Entwickler bauen Ihr Produkt mit sauberem Code, optimierter Performance und skalierbarer Architektur ab Tag eins.',
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    num: '04',
    title: t('Launch & Grow', 'Launch & Wachstum'),
    desc: t(
      'We deploy, test, and monitor your product. Then we stay by your side to optimize, scale, and grow your results.',
      'Wir deployen, testen und überwachen Ihr Produkt. Danach optimieren und skalieren wir gemeinsam für messbares Wachstum.',
    ),
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

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

export default function Process() {
  const { t } = useI18n()
  const reduceMotion = useReducedMotion()
  const isMobile = useIsNarrowMobile()
  const processSteps = steps(t)
  const stepCount = processSteps.length

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[130px]" />
        <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="absolute -right-16 bottom-16 h-60 w-60 rounded-full bg-indigo-500/10 blur-[95px]" />
      </div>

      <div className="relative container-max">
        <FadeUp className="text-center mb-20">
          <span className="inline-block text-xs font-mono text-brand-blue-light tracking-widest uppercase mb-4 px-3 py-1 rounded-full border border-brand-blue/20 bg-brand-blue/5">
            {t('How We Work', 'So arbeiten wir')}
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-5">
            {t('Our ', 'Unser ')}<span className="gradient-text">{t('Process', 'Prozess')}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {t(
              'From idea to launch — a clear, collaborative process that delivers results.',
              'Von der Idee bis zum Launch — ein klarer, kollaborativer Prozess mit Ergebnissen.',
            )}
          </p>
        </FadeUp>

        <StaggerContainer className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line */}
          <div className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent lg:block" />
          <div className="absolute left-[12%] right-[12%] top-12 hidden h-[1px] bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent blur-sm lg:block" />

          {processSteps.map((step, i) => (
            (() => {
              const fromLeft = i % 2 === 0
              const mobileMotion =
                isMobile && !reduceMotion
                  ? {
                      initial: { opacity: 0, x: fromLeft ? -48 : 48 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true, amount: 0.24, margin: '0px 0px -10% 0px' },
                      transition: { duration: 1.1, ease: [0.32, 0.72, 0, 1] },
                    }
                  : isMobile && reduceMotion
                    ? { initial: false }
                    : { variants: staggerItem }
              return (
            <motion.div
              key={step.num}
              {...mobileMotion}
              whileHover={reduceMotion || isMobile ? {} : { y: -7 }}
              transition={
                isMobile
                  ? undefined
                  : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
              }
              className="group relative"
            >
              {/* Step card */}
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-6 shadow-[0_26px_56px_-30px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-all duration-400 group-hover:border-brand-blue/35 group-hover:shadow-[0_30px_70px_-28px_rgba(37,99,235,0.32)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/70 to-transparent" />
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-blue/20 blur-2xl opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Number badge */}
                <div className="relative mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-[0_0_28px_rgba(59,130,246,0.4)] transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <span className="rounded-md border border-brand-blue/25 bg-brand-bg/80 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-brand-blue/70">
                    {step.num}
                  </span>
                </div>

                <h3 className="mb-3 font-display text-lg font-semibold text-white transition-all group-hover:gradient-text">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>

                {/* Bottom indicator */}
                <div className="mt-6 h-0.5 w-10 rounded bg-white/20 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-brand" />

                {i < stepCount - 1 && (
                  <div className="absolute -right-3 top-[46px] hidden h-3 w-3 rounded-full border border-brand-blue/35 bg-brand-blue/30 shadow-[0_0_14px_rgba(59,130,246,0.45)] lg:block" />
                )}
              </div>
            </motion.div>
              )
            })()
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
