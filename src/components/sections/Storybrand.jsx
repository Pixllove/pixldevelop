import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '@/i18n/LanguageContext'

const withoutItems = [
  {
    title: 'Lower Customer Loyalty',
    titleDe: 'Geringere Kundenloyalität',
    desc: 'Without stories, emotional connection is lacking.',
    descDe: 'Ohne Geschichten fehlt die emotionale Verbindung.',
  },
  {
    title: 'Lower Revenue',
    titleDe: 'Geringerer Umsatz',
    desc: 'Unclear messages can lead to reduced conversions.',
    descDe: 'Unklare Botschaften können zu weniger Conversions führen.',
  },
  {
    title: 'Risk of Interchangeability',
    titleDe: 'Risiko der Austauschbarkeit',
    desc: 'Your brand becomes inconspicuous and forgettable.',
    descDe: 'Ihre Marke wird unauffällig und bleibt weniger im Gedächtnis.',
  },
]

const withItems = [
  {
    title: 'Emotional Connection',
    titleDe: 'Emotionale Verbindung',
    desc: 'Stories create a deeper bond with customers.',
    descDe: 'Geschichten schaffen eine tiefere Bindung zu Ihren Kunden.',
  },
  {
    title: 'Clear Messages',
    titleDe: 'Klare Botschaften',
    desc: 'Stories convey information more understandably.',
    descDe: 'Geschichten vermitteln Informationen verständlicher.',
  },
  {
    title: 'Unique Identity',
    titleDe: 'Einzigartige Identität',
    desc: 'Storytelling sets your brand apart from competition.',
    descDe: 'Storytelling hebt Ihre Marke von der Konkurrenz ab.',
  },
]

const headerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
}

const headerItem = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Storybrand() {
  const { t } = useI18n()
  const [headRef, headInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [compareRef, compareInView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section className="section-padding relative overflow-hidden pt-10 pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.09),transparent_50%)]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-72 w-72 rounded-full bg-rose-600/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-brand-blue/[0.08] blur-[110px]" />

      <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-12 max-w-4xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0c1018] via-brand-bgAlt/95 to-[#060708] p-10 text-center shadow-[0_0_0_1px_rgba(37,99,235,0.08)_inset,0_32px_80px_-32px_rgba(0,0,0,0.75)] sm:p-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.12),transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue-light/35 to-transparent"
          />
          <div className="relative">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {t("Ready to Unleash Your Brand's Full Potential?", 'Bereit, das volle Potenzial Ihrer Marke zu entfalten?')}
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/50">
              {t(
                "Book a free consultation with our experts. Let's craft your success story together.",
                'Buchen Sie eine kostenlose Beratung mit unseren Experten. Lassen Sie uns gemeinsam Ihre Erfolgsstory entwickeln.',
              )}
            </p>
            <Link
              to="/contact-us"
              onClick={() => {
                window.dataLayer = window.dataLayer || []
                window.dataLayer.push({ event: 'initiate_booking' })
              }}
              className="btn-primary mx-auto mt-8 inline-flex text-base"
            >
              <span>{t('Book Free Consultation Now', 'Jetzt kostenlose Beratung buchen')}</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

      <div className="container-max relative z-[1]">
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headInView ? 'show' : 'hidden'}
          variants={headerVariants}
          className="mx-auto mt-24 mb-16 max-w-3xl text-center sm:mb-20"
        >
          <motion.div variants={headerItem} className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/[0.08] px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-brand-blue-light shadow-[0_0_32px_rgba(37,99,235,0.12)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-35" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
              </span>
              {t('Storybrand Method', 'Storybrand-Methode')}
            </span>
          </motion.div>
          <motion.h2 variants={headerItem} className="mb-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {t('Why is Storytelling ', 'Warum ist Storytelling ')}<span className="gradient-text">{t('So Important?', 'so wichtig?')}</span>
          </motion.h2>
          <motion.p variants={headerItem} className="text-lg text-white/50">
            {t(
              "The brands that win are the ones that tell the clearest story. Here's the difference it makes.",
              'Die Marken, die gewinnen, erzählen die klarste Geschichte. Das ist der Unterschied.',
            )}
          </motion.p>
        </motion.div>

        <motion.div
          ref={compareRef}
          initial="hidden"
          animate={compareInView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="relative mx-auto mb-16 max-w-6xl"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/15 bg-[#0a0c12]/95 font-display text-sm font-bold tracking-widest text-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md lg:flex"
          >
            VS
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            <motion.article
              variants={cardReveal}
              className="group relative overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-[0_24px_64px_-28px_rgba(244,63,94,0.12)] backdrop-blur-xl transition hover:border-rose-400/30 hover:shadow-[0_28px_72px_-24px_rgba(244,63,94,0.18)] sm:p-9"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/40 to-transparent"
              />
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-500/10 blur-3xl transition-opacity group-hover:opacity-100"
              />
              <header className="relative mb-8 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-rose-400/25 bg-rose-500/10 shadow-inner ring-1 ring-rose-400/10">
                  <svg className="h-6 w-6 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-rose-300/70">{t('The cost', 'Der Nachteil')}</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-rose-200 sm:text-2xl">{t('Without Storytelling', 'Ohne Storytelling')}</h3>
                </div>
              </header>
              <ul className="relative space-y-6">
                {withoutItems.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.45 }}
                    className="flex gap-4"
                  >
                    <span
                      className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/10"
                      aria-hidden
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
                    </span>
                    <div className="min-w-0 border-l border-white/[0.06] pl-4">
                      <h4 className="font-display font-semibold text-white/90">{t(item.title, item.titleDe)}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-white/45">{t(item.desc, item.descDe)}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              variants={cardReveal}
              className="group relative overflow-hidden rounded-3xl border border-emerald-400/30 bg-gradient-to-b from-emerald-500/[0.08] to-white/[0.02] p-8 shadow-[0_24px_64px_-28px_rgba(16,185,129,0.2)] backdrop-blur-xl transition hover:border-emerald-300/45 hover:shadow-[0_28px_72px_-24px_rgba(16,185,129,0.28)] sm:p-9"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent"
              />
              <div
                aria-hidden
                className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl transition-opacity group-hover:opacity-100"
              />
              <header className="relative mb-8 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/35 bg-emerald-500/15 shadow-[0_0_24px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/20">
                  <svg className="h-6 w-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-emerald-300/80">{t('The upside', 'Der Vorteil')}</p>
                  <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">
                    <span className="text-emerald-300">{t('With Storytelling', 'Mit Storytelling')}</span>
                  </h3>
                </div>
              </header>
              <ul className="relative space-y-6">
                {withItems.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.45 }}
                    className="flex gap-4"
                  >
                    <span
                      className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-500/10"
                      aria-hidden
                    >
                      <svg className="h-3.5 w-3.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div className="min-w-0 border-l border-white/[0.08] pl-4">
                      <h4 className="font-display font-semibold text-white">{t(item.title, item.titleDe)}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-white/50">{t(item.desc, item.descDe)}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0c1018] via-brand-bgAlt/95 to-[#060708] p-10 text-center shadow-[0_0_0_1px_rgba(37,99,235,0.08)_inset,0_32px_80px_-32px_rgba(0,0,0,0.75)] sm:p-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.12),transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue-light/35 to-transparent"
          />
          <div className="relative">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {t("Ready to Unleash Your Brand's Full Potential?", 'Bereit, das volle Potenzial Ihrer Marke zu entfalten?')}
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/50">
              {t(
                "Book a free consultation with our experts. Let's craft your success story together.",
                'Buchen Sie eine kostenlose Beratung mit unseren Experten. Lassen Sie uns gemeinsam Ihre Erfolgsstory entwickeln.',
              )}
            </p>
            <Link
              to="/contact-us"
              className="btn-primary mx-auto mt-8 inline-flex text-base"
            >
              <span>{t('Book Free Consultation Now', 'Jetzt kostenlose Beratung buchen')}</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}
