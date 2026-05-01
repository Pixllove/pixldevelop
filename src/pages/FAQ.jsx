import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeUp } from '@/components/ui/AnimatedSection'
import { useI18n } from '@/i18n/LanguageContext'

const faqs = [
  {
    q: 'How can I communicate with Pixl Develop during my project?',
    qDe: 'Wie kann ich während meines Projekts mit Pixl Develop kommunizieren?',
    a: 'You can communicate with Pixl Develop through WhatsApp, Skype, Telegram, or Google Meet. Choose the platform that suits you best and exchange information there.',
    aDe:
      'Sie können mit Pixl Develop über WhatsApp, Skype, Telegram oder Google Meet kommunizieren. Wählen Sie die Plattform, die zu Ihnen passt, und tauschen Sie sich dort aus.',
  },
  {
    q: 'How long does it take until my desired website is created?',
    qDe: 'Wie lange dauert es, bis meine Website fertig ist?',
    a: 'The duration for each website project varies based on the number of required pages and other project details. Typically, we deliver websites within 3 to 20 business days.',
    aDe:
      'Die Dauer hängt von der Seitenzahl und weiteren Projektdetails ab. In der Regel liefern wir Websites innerhalb von 3 bis 20 Werktagen.',
  },
  {
    q: 'What happens after I submit a request for a free consultation?',
    qDe: 'Was passiert, nachdem ich eine kostenlose Beratung angefragt habe?',
    a: 'After receiving your inquiry, our team confirms it and contacts you at the earliest opportunity. We conduct a detailed discussion via Google Meet covering requirements, business objectives, timeline, package, and technology. Once all details are clarified, we create a comprehensive proposal outlining services, turnaround time, and terms. Upon your approval, we commence with web development.',
    aDe:
      'Nach Ihrer Anfrage bestätigt unser Team diese und meldet sich schnellstmöglich. Wir führen ein ausführliches Gespräch per Google Meet zu Anforderungen, Geschäftszielen, Zeitplan, Paket und Technologie. Sind alle Punkte geklärt, erstellen wir ein Angebot mit Leistungen, Bearbeitungszeit und Konditionen. Nach Ihrer Freigabe starten wir die Webentwicklung.',
  },
  {
    q: 'What payment options do we offer?',
    qDe: 'Welche Zahlungsoptionen bieten Sie?',
    a: (
      <>
        <p className="mb-3">We offer various payment options, including:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-white/55">Credit and Debit Cards:</span> Acceptance of payments via credit and debit cards.
          </li>
          <li>
            <span className="font-medium text-white/55">Online Banking:</span> Option for payment through online banking.
          </li>
          <li>
            <span className="font-medium text-white/55">PayPal:</span> Use of PayPal for secure and convenient transactions.
          </li>
        </ul>
        <p className="mt-3">
          The specific payment details and conditions will be outlined in the proposal or contract, depending on the size and duration of the project.
        </p>
      </>
    ),
    aDe: (
      <>
        <p className="mb-3">Wir bieten verschiedene Zahlungsoptionen, unter anderem:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-white/55">Kredit- und Debitkarten:</span> Zahlung per Karte.
          </li>
          <li>
            <span className="font-medium text-white/55">Online-Banking:</span> Zahlung über Online-Banking.
          </li>
          <li>
            <span className="font-medium text-white/55">PayPal:</span> Sichere und bequeme Transaktionen über PayPal.
          </li>
        </ul>
        <p className="mt-3">
          Konkrete Zahlungsmodalitäten legen wir im Angebot oder Vertrag fest — abhängig von Umfang und Laufzeit des Projekts.
        </p>
      </>
    ),
  },
  {
    q: 'How is maintenance and support handled after the project is completed?',
    qDe: 'Wie läuft Wartung und Support nach Projektabschluss?',
    a: (
      <>
        <p className="mb-3">
          After the project&apos;s completion, we provide a 1-month warranty against technical problems or bugs for your website. For ongoing maintenance, we offer two plans:
        </p>
        <ul className="space-y-4">
          <li>
            <p className="font-medium text-white/55">Basic Maintenance (€50 per month)</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Regular plugins and WordPress updates.</li>
              <li>Excludes content changes.</li>
            </ul>
          </li>
          <li>
            <p className="font-medium text-white/55">Premium Maintenance (€400 per month)</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Regular plugins and WordPress updates.</li>
              <li>Includes content changes.</li>
              <li>Monthly SEO report for performance insights.</li>
            </ul>
          </li>
        </ul>
        <p className="mt-3">
          Additionally, we offer on-demand support services tailored to your needs, available at an extra cost. Feel free to contact us for further assistance or customization of maintenance and support plans.
        </p>
      </>
    ),
    aDe: (
      <>
        <p className="mb-3">
          Nach Projektabschluss gewähren wir eine einmonatige Gewährleistung gegen technische Mängel oder Bugs Ihrer Website. Für laufende Wartung bieten wir zwei Pakete:
        </p>
        <ul className="space-y-4">
          <li>
            <p className="font-medium text-white/55">Basic-Wartung (50 € pro Monat)</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Regelmäßige Plugin- und WordPress-Updates.</li>
              <li>Ohne inhaltliche Änderungen.</li>
            </ul>
          </li>
          <li>
            <p className="font-medium text-white/55">Premium-Wartung (400 € pro Monat)</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Regelmäßige Plugin- und WordPress-Updates.</li>
              <li>Inklusive inhaltlicher Anpassungen.</li>
              <li>Monatlicher SEO-Report mit Kennzahlen.</li>
            </ul>
          </li>
        </ul>
        <p className="mt-3">
          Zusätzlich bieten wir bedarfsgerechten Support — sprechen Sie uns an, wenn Sie Wartungs- und Supportpläne anpassen möchten.
        </p>
      </>
    ),
  },
  {
    q: 'In which languages can you speak with us?',
    qDe: 'In welchen Sprachen können wir sprechen?',
    a: 'We speak German, English, and Russian.',
    aDe: 'Wir sprechen Deutsch, Englisch und Russisch.',
  },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const contentId = `faq-answer-${index}`
  const triggerId = `faq-trigger-${index}`

  return (
    <div className="group border-b border-white/5">
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <h3 className="font-display text-sm font-medium text-white/80 transition-colors group-hover:text-white sm:text-base">{q}</h3>
        <motion.div animate={{ rotate: open ? 45 : 0 }} className="h-5 w-5 flex-shrink-0 text-brand-blue-light" aria-hidden>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-relaxed text-white/40">{typeof a === 'string' ? <p>{a}</p> : a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const { t, isGerman } = useI18n()
  return (
    <>
      <Helmet>
        <title>{t('FAQ – Pixl Develop', 'FAQ – Pixl Develop')}</title>
        <meta
          name="description"
          content={t(
            'Answers about communicating during your project, timelines, consultations, payments, maintenance, and languages — Pixl Develop.',
            'Antworten zu Kommunikation während Ihres Projekts, Zeitrahmen, Beratung, Zahlung, Wartung und Sprachen — Pixl Develop.',
          )}
        />
        <link rel="canonical" href="https://pixl-develop.com/faq/" />
      </Helmet>

      <section className="relative overflow-hidden pb-10 pt-32 md:pt-36">
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[min(100%,560px)] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[100px]" />

        <div className="container-max px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-brand-blue/25 bg-brand-blue/[0.08] px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-brand-blue-light">
              {t('Help center', 'Hilfezentrum')}
            </span>
            <h1 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {t('Frequently Asked ', 'Häufig gestellte ')}<span className="gradient-text">{t('Questions', 'Fragen')}</span>
            </h1>
            <p className="text-lg text-white/50">
              {t(
                'Straight answers about working with us, timelines, billing, and support.',
                'Klare Antworten zur Zusammenarbeit, Zeitplänen, Abrechnung und Support.',
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding border-t border-white/5 pb-24">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.q}
                index={index}
                q={isGerman && faq.qDe ? faq.qDe : faq.q}
                a={isGerman && faq.aDe !== undefined ? faq.aDe : faq.a}
              />
            ))}
          </div>
          <FadeUp className="mt-14 text-center">
            <p className="text-sm text-white/35">
              {t('Still have questions?', 'Noch Fragen?')}{' '}
              <Link to="/contact-us" className="text-brand-blue-light transition-colors hover:text-white">
                {t('Book a free consultation', 'Kostenlose Beratung buchen')}
              </Link>
              .
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
