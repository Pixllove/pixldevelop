import { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FadeUp } from '@/components/ui/AnimatedSection'
import { CALENDLY_BOOKING_URL, buildCalendlyEmbedSrc, parseCalendlyFrameHeight } from '@/config/calendly'
import { useI18n } from '@/i18n/LanguageContext'

const CALENDLY_FRAME_MIN = 620
const CALENDLY_FRAME_MAX = 900
const CALENDLY_FRAME_DEFAULT = 700

const CALENDLY_URL = CALENDLY_BOOKING_URL.trim()

/**
 * @param {object} props
 * @param {boolean} [props.embedded] When true, renders only the inner block (for Contact page inside existing layout).
 */
export default function CalendlyBookingSection({ embedded = false }) {
  const { t } = useI18n()
  const calendlyEmbedSrc = useMemo(() => buildCalendlyEmbedSrc(CALENDLY_BOOKING_URL), [])
  const [calendlyFramePx, setCalendlyFramePx] = useState(CALENDLY_FRAME_DEFAULT)

  const onCalendlyMessage = useCallback((event) => {
    if (event.origin !== 'https://calendly.com') return

    const h = parseCalendlyFrameHeight(event.data)
    if (h != null && h >= 320) {
      const padded = Math.ceil(h + 8)
      setCalendlyFramePx(Math.min(CALENDLY_FRAME_MAX, Math.max(CALENDLY_FRAME_MIN, padded)))
    }

    const calendlyEvent = event?.data?.event
    if (!calendlyEvent || typeof calendlyEvent !== 'string') return

    window.dataLayer = window.dataLayer || []

    if (calendlyEvent === 'calendly.profile_page_viewed') {
      window.dataLayer.push({
        event: 'booking_started',
      })
    }

    if (calendlyEvent === 'calendly.event_scheduled') {
      window.dataLayer.push({
        event: 'booking_completed',
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', onCalendlyMessage)
    return () => window.removeEventListener('message', onCalendlyMessage)
  }, [onCalendlyMessage])

  const block = (
    <FadeUp className={`max-w-4xl mx-auto ${embedded ? 'mb-16 md:mb-20' : ''}`}>
      <div className="text-center mb-8">
        {!embedded && (
          <span className="inline-block text-xs font-mono text-brand-blue-light tracking-widest uppercase mb-4 px-3 py-1 rounded-full border border-brand-blue/20 bg-brand-blue/5">
            {t('Free Consultation', 'Kostenlose Beratung')}
          </span>
        )}
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">{t('Book a Free Consultation', 'Kostenlose Beratung buchen')}</h2>
        {/* <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {t(
            'Choose a time that works for you. If your Calendly event uses Google Meet, the confirmation email includes the Meet link. Connect Google Calendar in Calendly so bookings appear on your calendar automatically.',
            'Wählen Sie einen Termin, der passt. Wenn Ihr Calendly-Event Google Meet nutzt, enthält die Bestätigungs E-Mail den Meet-Link. Verbinden Sie Google Kalender mit Calendly für automatische Termineinträge.',
          )}
        </p> */}
      </div>

      <div className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-white/[0.06] to-transparent p-px shadow-[0_0_48px_-16px_rgba(16,185,129,0.35)]">
        <div className="relative rounded-[0.9rem] bg-brand-bg/80 backdrop-blur-sm p-3 sm:p-4">
          <div className="absolute -top-3 left-4 sm:left-7 z-10">
            <span className="inline-block text-[11px] font-mono font-semibold uppercase tracking-widest text-emerald-400/95 bg-brand-bg px-3 py-1 rounded-md border border-emerald-500/35 shadow-lg shadow-black/20">
              {t('Select a Time Slot', 'Zeitslot auswählen')}
            </span>
          </div>
          <div className="mt-5 rounded-xl overflow-hidden ring-1 ring-white/10 bg-zinc-950">
            {CALENDLY_URL ? (
              <iframe
                title="Book a consultation — Calendly"
                src={calendlyEmbedSrc}
                className="w-full min-w-[320px] border-0 bg-zinc-950 block"
                style={{
                  height: calendlyFramePx,
                  maxHeight: 'min(900px, 92dvh)',
                  transition: 'height 0.25s ease-out',
                }}
                loading="lazy"
              />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] px-8 text-center bg-zinc-950 border border-white/10">
                <p className="text-white font-display font-semibold mb-2">{t('Calendly link not set yet', 'Calendly-Link noch nicht gesetzt')}</p>
                <p className="text-white/50 text-sm max-w-md mb-6">
                  {t('Open ', 'Öffnen Sie ')}<code className="text-emerald-400/90 text-xs">src/config/calendly.js</code>{' '}{t('and set ', 'und setzen Sie ')}
                  <code className="text-white/40 text-xs">CALENDLY_BOOKING_URL</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {CALENDLY_URL ? (
        <p className="mt-5 text-center text-xs text-white/40">
          {t('Calendar not loading?', 'Kalender lädt nicht?')}{' '}
          <a
            href={CALENDLY_URL}
            className="text-emerald-400/90 hover:text-emerald-300 underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {t('Open booking in a new tab', 'Buchung in neuem Tab öffnen')}
          </a>
          {!embedded && (
            <>
              {' '}
              ·{' '}
              <Link to="/contact-us" className="text-white/50 hover:text-brand-blue-light underline-offset-2 hover:underline">
                {t('Full contact form', 'Vollständiges Kontaktformular')}
              </Link>
            </>
          )}
        </p>
      ) : null}
    </FadeUp>
  )

  if (embedded) return block

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute left-1/4 bottom-1/3 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 top-1/4 w-80 h-80 bg-brand-blue/8 rounded-full blur-3xl pointer-events-none" />
      <div className="container-max px-4 sm:px-6 lg:px-8 relative">{block}</div>
    </section>
  )
}
