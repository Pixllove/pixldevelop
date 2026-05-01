import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FadeUp } from '@/components/ui/AnimatedSection'
import { useI18n } from '@/i18n/LanguageContext'
import logoImg from '../../../images/testnew.png'

/** 3D-style book: float + cover opens to show inner “Storybrand Secret Report” */
function StorybrandBookMockup() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="flex h-44 w-32 shrink-0 items-center justify-center [perspective:900px] sm:h-52 sm:w-36"
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full"
        animate={reduceMotion ? { y: 0 } : { y: [0, -10, 0] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {/* Inner spread (visible when cover opens) */}
          <div
            className="absolute left-1.5 right-0 top-0.5 bottom-0.5 rounded-r-md border border-slate-900/15 bg-gradient-to-br from-[#faf7f0] via-[#f3ede3] to-[#e8e0d4] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-8px_24px_rgba(0,0,0,0.06)]"
            style={{ transform: 'translateZ(-1px)' }}
          >
            <div className="flex h-full flex-col items-center justify-center px-2.5 text-center">
              <p className="font-display text-[8px] font-bold uppercase leading-snug tracking-wide text-slate-800 sm:text-[9px]">
                Storybrand
                <br />
                Secret Report
              </p>
              <div className="mt-2.5 w-4/5 space-y-1">
                <div className="h-px bg-slate-800/12" />
                <div className="h-px bg-slate-800/8" />
                <div className="h-px bg-slate-800/6" />
              </div>
            </div>
          </div>

          {/* Spine */}
          <div
            className="absolute left-0 top-0 z-10 h-full w-2 rounded-l-md bg-gradient-to-r from-black/50 via-black/25 to-transparent"
            style={{ transform: 'translateZ(2px)' }}
          />

          {/* Front cover (hinged left) */}
          <motion.div
            className="absolute inset-0 z-20 overflow-hidden rounded-md shadow-[0_20px_50px_rgba(37,99,235,0.45)]"
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
            animate={reduceMotion ? { rotateY: 0 } : { rotateY: [0, -54, -54, 0] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 5.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.48, 1] }
            }
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-accent to-slate-800" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-black p-1 shadow-[0_6px_24px_rgba(0,0,0,0.4)] sm:h-14 sm:w-14 sm:p-1.5">
                <img
                  src={logoImg}
                  alt=""
                  className="h-[2.35rem] w-[2.35rem] object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] sm:h-[2.85rem] sm:w-[2.85rem]"
                />
              </div>
              <p className="font-display text-[10px] font-bold leading-tight text-white/95 sm:text-[11px]">
                Storybrand Secret
              </p>
              <p className="mt-1 text-[8px] text-white/45">Free Report 2026</p>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/35" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function FreeReport() {
  const { t } = useI18n()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | submitted
  const formRootRef = useRef(null)

  const pushTrackingEvent = (eventName) => {
    if (!eventName) return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName })
  }

  useEffect(() => {
    if (!isModalOpen) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  useEffect(() => {
    if (!isModalOpen || !formRootRef.current) return undefined

    let cancelled = false
    setStatus('loading')
    formRootRef.current.innerHTML = ''

    const mountForm = () => {
      if (cancelled || !window.hbspt || !formRootRef.current) return
      window.hbspt.forms.create({
        region: 'eu1',
        portalId: '143989272',
        formId: '9dda8eae-6e3f-4b2f-aebe-725c02fbb4af',
        target: '#hubspot-free-report-form',
        onFormReady: () => {
          if (!cancelled) setStatus('idle')
        },
        onFormSubmitted: () => {
          if (cancelled) return
          pushTrackingEvent('report_download')
          setStatus('submitted')
          window.setTimeout(() => {
            if (!cancelled) setIsModalOpen(false)
          }, 3500)
        },
      })
    }

    if (window.hbspt) {
      mountForm()
    } else {
      const existing = document.querySelector('script[data-hubspot-forms="true"]')
      if (existing) {
        existing.addEventListener('load', mountForm, { once: true })
      } else {
        const script = document.createElement('script')
        script.src = 'https://js-eu1.hsforms.net/forms/embed/v2.js'
        script.async = true
        script.defer = true
        script.dataset.hubspotForms = 'true'
        script.addEventListener('load', mountForm, { once: true })
        document.body.appendChild(script)
      }
    }

    return () => {
      cancelled = true
    }
  }, [isModalOpen])

  return (
    <>
      <section className="section-padding relative overflow-hidden">
        <div className="container-max">
          <FadeUp>
            <div className="relative overflow-hidden rounded-3xl">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-brand-bg to-slate-800/15" />
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-brand opacity-40" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-brand opacity-20" />

              {/* Orbs */}
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-blue/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl" />

              <div className="relative flex min-h-0 flex-col items-center justify-between gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:gap-10 lg:px-16 lg:py-14">
                {/* Left */}
                <div className="flex-1 max-w-lg">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 mb-5">
                    <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs font-mono text-brand-accent">{t('free marketing strategy report', 'Kostenloser Marketing-Strategie-Report')}</span>
                  </div>

                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">
                    {t('The Secret of Storybranding', 'Das Geheimnis von Storybranding')}{' '}
                    <span className="gradient-text">{t('Revealed', 'Enthüllt')}</span>
                  </h2>
                  <p className="text-white/50 text-base leading-relaxed">
                    {t(
                      'Discover the exact framework top brands use to clarify their message, connect with customers, and multiply their revenue — completely free.',
                      'Entdecken Sie das Framework, mit dem Top-Marken ihre Botschaft klären, Kunden gewinnen und ihren Umsatz steigern — komplett kostenlos.',
                    )}
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-5">
                  {/* Animated 3D book mockup */}
                  <StorybrandBookMockup />

                  <div className="flex flex-col gap-3 items-center lg:items-start">
                    {[t('Proven brand frameworks', 'Bewährte Marken-Frameworks'), t('Real case studies', 'Reale Fallstudien'), t('Actionable strategies', 'Umsetzbare Strategien')].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-brand-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/60 text-sm">{item}</span>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        pushTrackingEvent('initiate_report_download')
                        setIsModalOpen(true)
                      }}
                      className="btn-primary text-sm mt-2"
                    >
                      <span>{t('Download Free Report', 'Kostenlosen Report herunterladen')}</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[120] overflow-y-auto overscroll-contain bg-brand-bg/85 px-4 py-6 backdrop-blur-md sm:px-6 sm:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <div className="flex min-h-[calc(100dvh-3rem)] items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative my-auto flex min-h-0 w-full max-w-3xl max-h-[min(88dvh,calc(100dvh-4rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-bgAlt via-brand-bg to-slate-900 shadow-[0_30px_80px_-35px_rgba(37,99,235,0.45)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
                <div className="pointer-events-none absolute left-1/3 top-0 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-1/4 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />

                <button
                  type="button"
                  aria-label="Close report form"
                  className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/40 p-1.5 text-white/90 backdrop-blur-sm transition hover:border-brand-blue/50 hover:text-white sm:right-4 sm:top-4"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="relative flex-shrink-0 border-b border-white/5 px-5 pb-4 pt-12 sm:px-8 sm:pb-5 sm:pt-14">
                  <h3 className="pr-8 font-display text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                    {t('Download Free Report', 'Kostenlosen Report herunterladen')}
                  </h3>
                </div>

                <div className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 pb-6 pt-4 sm:px-8 sm:pb-8">
                  {status === 'submitted' ? (
                    <div className="rounded-xl border border-emerald-300/35 bg-emerald-500/15 p-4 text-sm font-medium text-white backdrop-blur-sm">
                      {t(
                        'Successful download. Check your email or spam folder for the message.',
                        'Download erfolgreich. Bitte prüfen Sie Ihr E-Mail-Postfach oder den Spam-Ordner.',
                      )}
                    </div>
                  ) : (
                    <>
                      {status === 'loading' && (
                        <p className="mb-4 text-sm text-white/80">{t('Loading form...', 'Formular wird geladen...')}</p>
                      )}
                      <div
                        id="hubspot-free-report-form"
                        ref={formRootRef}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4"
                      />
                    </>
                  )}
                </div>

                <style>{`
                #hubspot-free-report-form .hs-form-field > label,
                #hubspot-free-report-form .hs-form-field > label span,
                #hubspot-free-report-form .hs-richtext,
                #hubspot-free-report-form .hs-richtext p,
                #hubspot-free-report-form .hs-richtext span,
                #hubspot-free-report-form .hs-error-msgs label,
                #hubspot-free-report-form .legal-consent-container,
                #hubspot-free-report-form .legal-consent-container * {
                  color: rgba(255, 255, 255, 0.95) !important;
                }

                #hubspot-free-report-form .hs-form-required {
                  color: #f87171 !important;
                }

                #hubspot-free-report-form input,
                #hubspot-free-report-form textarea,
                #hubspot-free-report-form select {
                  background: rgba(255, 255, 255, 0.95) !important;
                  color: #0f172a !important;
                  border: 1px solid rgba(255, 255, 255, 0.65) !important;
                  border-radius: 0.55rem !important;
                }

                #hubspot-free-report-form .hs-button,
                #hubspot-free-report-form input[type='submit'] {
                  background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
                  border: 0 !important;
                  color: #fff !important;
                  border-radius: 0.7rem !important;
                  font-weight: 600 !important;
                  padding: 0.7rem 1.2rem !important;
                }

                #hubspot-free-report-form .hs-form-field {
                  margin-bottom: 0.95rem !important;
                }

                #hubspot-free-report-form {
                  max-width: 100%;
                  overflow-x: hidden;
                }
              `}</style>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
