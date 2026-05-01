import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { FadeUp, SlideIn } from '@/components/ui/AnimatedSection'
import CalendlyBookingSection from '@/components/sections/CalendlyBookingSection'
import { useI18n } from '@/i18n/LanguageContext'

const contactMethods = [
  {
    label: 'WhatsApp',
    value: '+971 52 993 7054',
    href: 'https://wa.me/971529937054',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20 hover:border-green-500/40',
  },
  {
    label: 'Telegram',
    value: '@Pixl_develop',
    href: 'https://t.me/Pixl_develop',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20 hover:border-sky-500/40',
  },
  {
    label: 'Instagram',
    value: '@pixl_develop',
    href: 'https://www.instagram.com/pixl_develop/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40',
  },
]

export default function Contact() {
  const { t } = useI18n()
  const formRef = useRef(null)
  const [formState, setFormState] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false

    const mountForm = () => {
      if (cancelled || !window.hbspt || !formRef.current) return
      formRef.current.innerHTML = ''
      window.hbspt.forms.create({
        portalId: '143989272',
        formId: 'f422796f-1b4b-4df1-9707-b9741ef4681d',
        region: 'eu1',
        target: '#hubspot-contact-form',
        onFormReady: () => {
          if (!cancelled) setFormState('ready')
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
        script.addEventListener('error', () => {
          if (!cancelled) setFormState('error')
        })
        document.body.appendChild(script)
      }
    }

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{t('Free Consultation – Pixl Develop', 'Kostenlose Beratung – Pixl Develop')}</title>
        <meta name="description" content={t("Book your free consultation with Pixl Develop — pick a time on our calendar or send a message. We'll discuss your project and how we can help you succeed online.", 'Buchen Sie Ihre kostenlose Beratung mit Pixl Develop — wählen Sie einen Termin im Kalender oder senden Sie eine Nachricht. Wir besprechen Ihr Projekt und wie wir online zum Erfolg beitragen.') } />
        <link rel="canonical" href="https://pixl-develop.com/contact-us" />
      </Helmet>

      <section className="relative pt-40 md:pt-44 pb-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl animate-orb-reverse" />

        <div className="container-max px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-mono text-brand-blue-light tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full border border-brand-blue/20 bg-brand-blue/5">
              {t('Free Consultation', 'Kostenlose Beratung')}
            </span>
            <h1 className="font-display font-bold text-5xl sm:text-6xl text-white mb-5">
              {t("Let's Build Something", 'Lassen Sie uns etwas')} <span className="gradient-text">{t('Amazing', 'Großartiges')}</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              {t(
                'Book a 30-minute discovery call on the calendar below, or send us a message — we typically reply within 24 hours.',
                'Buchen Sie unten ein 30-minütiges Erstgespräch oder senden Sie uns eine Nachricht — wir antworten in der Regel innerhalb von 24 Stunden.',
              )}
            </p>
          </FadeUp>

          <CalendlyBookingSection embedded />

          <p className="text-center text-white/35 text-sm font-mono uppercase tracking-widest mb-10">{t('Or send a message', 'Oder senden Sie eine Nachricht')}</p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Left — contact info */}
            <SlideIn from="left" className="lg:col-span-2 space-y-6">
              <div className="card-glass p-7">
                <h2 className="font-display font-semibold text-white mb-5">{t('Reach Out Directly', 'Direkt kontaktieren')}</h2>
                <div className="space-y-3">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${method.bg}`}
                    >
                      <span className={method.color}>{method.icon}</span>
                      <div>
                        <div className="text-xs text-white/30 font-mono">{method.label}</div>
                        <div className="text-sm text-white/70">{method.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="card-glass p-7">
                <h3 className="font-display font-medium text-white/80 text-sm mb-4">{t('What to expect', 'Was Sie erwartet')}</h3>
                <ul className="space-y-3">
                  {[
                    t('Free 30-min discovery call', 'Kostenloses 30-Min.-Erstgespräch'),
                    t('No commitment required', 'Keine Verpflichtung'),
                    t('Custom project proposal', 'Individuelles Projektangebot'),
                    t('NDA signed on request', 'NDA auf Anfrage'),
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-brand-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/50 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideIn>

            {/* Right — form */}
            <SlideIn from="right" className="lg:col-span-3">
              <div className="card-glass p-8">
                {formState === 'loading' && <p className="mb-4 text-sm text-white/70">{t('Loading contact form...', 'Kontaktformular wird geladen...')}</p>}
                {formState === 'error' && (
                  <p className="mb-4 text-sm text-rose-300">{t('Could not load contact form. Please refresh or contact us directly.', 'Kontaktformular konnte nicht geladen werden. Bitte aktualisieren Sie die Seite oder kontaktieren Sie uns direkt.')}</p>
                )}

                <div id="hubspot-contact-form" ref={formRef} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5" />

                <style>{`
                  #hubspot-contact-form .hs-form-field > label,
                  #hubspot-contact-form .hs-form-field > label span,
                  #hubspot-contact-form .hs-richtext,
                  #hubspot-contact-form .hs-richtext p,
                  #hubspot-contact-form .hs-richtext span,
                  #hubspot-contact-form .legal-consent-container,
                  #hubspot-contact-form .legal-consent-container * {
                    color: rgba(255, 255, 255, 0.94) !important;
                  }

                  #hubspot-contact-form .hs-form-required {
                    color: #f87171 !important;
                  }

                  #hubspot-contact-form .hs-input,
                  #hubspot-contact-form input[type='text'],
                  #hubspot-contact-form input[type='email'],
                  #hubspot-contact-form input[type='tel'],
                  #hubspot-contact-form textarea,
                  #hubspot-contact-form select {
                    width: 100% !important;
                    border-radius: 0.75rem !important;
                    border: 1px solid rgba(255, 255, 255, 0.12) !important;
                    background: rgba(255, 255, 255, 0.06) !important;
                    color: #fff !important;
                    padding: 0.75rem 1rem !important;
                  }

                  #hubspot-contact-form input::placeholder,
                  #hubspot-contact-form textarea::placeholder {
                    color: rgba(255, 255, 255, 0.35) !important;
                  }

                  #hubspot-contact-form textarea {
                    min-height: 140px !important;
                  }

                  #hubspot-contact-form .actions {
                    margin-top: 1rem !important;
                  }

                  #hubspot-contact-form .hs-button,
                  #hubspot-contact-form input[type='submit'] {
                    width: 100% !important;
                    border: 0 !important;
                    border-radius: 999px !important;
                    background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
                    color: #fff !important;
                    font-weight: 600 !important;
                    padding: 0.85rem 1.2rem !important;
                    box-shadow: 0 10px 24px -10px rgba(37, 99, 235, 0.65) !important;
                  }
                `}</style>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  )
}
