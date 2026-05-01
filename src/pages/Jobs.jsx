import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FadeUp } from '@/components/ui/AnimatedSection'
import { useI18n } from '@/i18n/LanguageContext'

export default function Jobs() {
  const { t } = useI18n()
  return (
    <>
      <Helmet>
        <title>{t('Careers – Pixl Develop', 'Karriere – Pixl Develop')}</title>
        <meta
          name="description"
          content={t(
            'Current job openings at Pixl Develop. We are not hiring at the moment but welcome speculative applications.',
            'Aktuelle Stellenangebote bei Pixl Develop. Momentan stellen wir nicht ein, freuen uns aber über Initiativbewerbungen.',
          )}
        />
        <link rel="canonical" href="https://pixl-develop.com/jobs" />
      </Helmet>

      <section className="relative overflow-hidden pb-10 pt-32 md:pt-36">
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[min(100%,560px)] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[100px]" />

        <div className="container-max px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-brand-blue/25 bg-brand-blue/[0.08] px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-brand-blue-light">
              {t('Careers', 'Karriere')}
            </span>
            <h1 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {t('Current Job ', 'Aktuelle ')}<span className="gradient-text">{t('Openings', 'Stellenangebote')}</span>
            </h1>
            <p className="text-lg text-white/50">{t('Thank you for your interest in joining our team.', 'Vielen Dank für Ihr Interesse, Teil unseres Teams zu werden.')}</p>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding border-t border-white/5 pb-24 pt-6">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10">
            <div className="space-y-5 text-sm leading-relaxed text-white/65 sm:text-base">
              <p>
                {t(
                  'Currently, we do not have any open job opportunities. We appreciate your interest in our organization and encourage you to check back regularly for potential future openings.',
                  'Aktuell haben wir keine offenen Stellen. Wir danken für Ihr Interesse und empfehlen, regelmäßig für künftige Stellen vorbeizuschauen.',
                )}
              </p>
              <p>
                {t(
                  'We are always on the lookout for talented and dedicated professionals. If you believe your skills align with our company, we welcome you to submit your resume and cover letter to ',
                  'Wir sind stets auf der Suche nach talentierten und engagierten Fachkräften. Wenn Ihre Kompetenzen zu unserem Unternehmen passen, senden Sie gerne Lebenslauf und Anschreiben an ',
                )}
                <a href="mailto:contact@pixl-develop.com" className="text-brand-blue-light transition-colors hover:text-white">
                  contact@pixl-develop.com
                </a>
                .
              </p>
              <p className="text-white/50">
                {t(
                  'Thank you for your understanding and your interest in a career with Pixl Develop.',
                  'Vielen Dank für Ihr Verständnis und Ihr Interesse an einer Karriere bei Pixl Develop.',
                )}
              </p>
            </div>
            <p className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-white/40">
              <Link to="/contact-us" className="text-brand-blue-light transition-colors hover:text-white">
                {t('Get in touch', 'Kontakt aufnehmen')}
              </Link>
              {' · '}
              <Link to="/" className="text-brand-blue-light transition-colors hover:text-white">
                {t('Back to home', 'Zurück zur Startseite')}
              </Link>
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
