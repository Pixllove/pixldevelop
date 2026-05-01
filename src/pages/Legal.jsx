import { Helmet } from 'react-helmet-async'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FadeUp } from '@/components/ui/AnimatedSection'
import { useI18n } from '@/i18n/LanguageContext'

const TABS = [
  {
    id: 'terms',
    label: { en: 'Terms & conditions', de: 'AGB' },
    files: ['/legal/terms-part1.txt', '/legal/terms-part2.txt'],
    title: 'Terms & conditions – Pixl Develop',
  },
  { id: 'cookies', label: { en: 'Cookie policy', de: 'Cookie-Richtlinie' }, files: ['/legal/cookies.txt'], title: 'Cookie policy – Pixl Develop' },
  { id: 'privacy', label: { en: 'Privacy policy', de: 'Datenschutz' }, files: ['/legal/privacy.txt'], title: 'Privacy policy – Pixl Develop' },
]

const tabIds = new Set(TABS.map((t) => t.id))

function LegalBody({ text }) {
  const blocks = useMemo(() => text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean), [text])

  return (
    <article className="legal-document max-w-3xl">
      {blocks.map((block, i) => {
        const lines = block.split('\n')
        const singleLine = lines.length === 1
        const looksLikeHeading =
          singleLine &&
          block.length <= 120 &&
          /^[A-Z0-9][A-Z0-9\s,'/&().-]+$/.test(block) &&
          !block.endsWith('.') &&
          !block.includes('?')

        if (looksLikeHeading && block !== 'TABLE OF CONTENTS') {
          return (
            <h2 key={i} className="font-display text-lg font-semibold text-white/95 first:mt-0 mt-10 mb-3 scroll-mt-28">
              {block}
            </h2>
          )
        }

        const allBullets = lines.every((line) => /^(?:[–\-•]|\d+\.)\s/.test(line.trim()) || line.trim() === '')
        if (allBullets && lines.filter((l) => l.trim()).length > 1) {
          return (
            <ul key={i} className="mb-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/65">
              {lines
                .map((l) => l.trim())
                .filter(Boolean)
                .map((line, li) => (
                  <li key={`${i}-${li}`}>{line.replace(/^(?:[–\-•]|\d+\.)\s*/, '')}</li>
                ))}
            </ul>
          )
        }

        return (
          <p key={i} className="mb-4 whitespace-pre-line text-sm leading-relaxed text-white/65 last:mb-0">
            {block}
          </p>
        )
      })}
    </article>
  )
}

export default function Legal() {
  const { t } = useI18n()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab = tabIds.has(tabParam) ? tabParam : 'terms'
  const tabMeta = TABS.find((t) => t.id === activeTab) ?? TABS[0]

  const [body, setBody] = useState('')
  const [loadState, setLoadState] = useState('idle') // idle | loading | error | ready

  const setTab = useCallback(
    (id) => {
      setSearchParams(id === 'terms' ? {} : { tab: id }, { replace: true })
    },
    [setSearchParams],
  )

  useEffect(() => {
    if (!tabIds.has(tabParam) && tabParam) {
      setSearchParams({ tab: 'terms' }, { replace: true })
    }
  }, [tabParam, setSearchParams])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  useEffect(() => {
    let cancelled = false
    setLoadState('loading')
    setBody('')
    Promise.all(
      tabMeta.files.map((url) =>
        fetch(url).then((r) => {
          if (!r.ok) throw new Error(String(r.status))
          return r.text()
        }),
      ),
    )
      .then((parts) => {
        if (!cancelled) {
          setBody(parts.join('\n\n'))
          setLoadState('ready')
        }
      })
      .catch(() => {
        if (!cancelled) setLoadState('error')
      })
    return () => {
      cancelled = true
    }
  }, [tabMeta.files])

  return (
    <>
      <Helmet>
        <title>{tabMeta.title}</title>
        <meta
          name="description"
          content={t(
            'Terms and conditions, cookie policy, and privacy policy for Pixl Develop (PIXLLOVE SOCIAL MEDIA APPLICATIONS DEVELOPMENT AND MANAGEMENT L.L.C).',
            'AGB, Cookie-Richtlinie und Datenschutz für Pixl Develop (PIXLLOVE SOCIAL MEDIA APPLICATIONS DEVELOPMENT AND MANAGEMENT L.L.C).',
          )}
        />
        <link rel="canonical" href={`https://pixl-develop.com/legal/${activeTab === 'terms' ? '' : `?tab=${activeTab}`}`} />
      </Helmet>

      <section className="relative overflow-hidden pb-6 pt-28 md:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[320px] w-[min(100%,480px)] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[100px]" />
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-blue/25 bg-brand-blue/[0.08] px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-brand-blue-light">
              {t('Legal', 'Rechtliches')}
            </span>
            <h1 className="mb-3 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {t('Legal ', 'Rechtliche ')}<span className="gradient-text">{t('information', 'Informationen')}</span>
            </h1>
            <p className="text-sm text-white/45 sm:text-base">{t('Terms, cookies, and privacy in one place.', 'AGB, Cookies und Datenschutz an einem Ort.')}</p>
          </FadeUp>

          <div
            role="tablist"
            aria-label={t('Legal documents', 'Rechtsdokumente')}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 border-b border-white/10 pb-4"
          >
            {TABS.map((tab) => {
              const selected = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`legal-tab-${tab.id}`}
                  aria-controls={`legal-panel-${tab.id}`}
                  onClick={() => setTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? 'bg-brand-blue/25 text-white ring-1 ring-brand-blue/40'
                      : 'text-white/45 hover:bg-white/[0.04] hover:text-white/75'
                  }`}
                >
                  {t(tab.label.en, tab.label.de)}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-white/5 pb-24 pt-10">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div
            id={`legal-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`legal-tab-${activeTab}`}
            className="mx-auto max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-10"
          >
            {loadState === 'loading' && <p className="text-sm text-white/40">{t('Loading…', 'Laden…')}</p>}
            {loadState === 'error' && (
              <p className="text-sm text-white/50">
                {t('Could not load this document. Please refresh the page or', 'Dokument konnte nicht geladen werden. Bitte aktualisieren Sie die Seite oder')}{' '}
                <Link to="/contact-us" className="text-brand-blue-light hover:text-white">
                  {t('contact us', 'kontaktieren Sie uns')}
                </Link>
                .
              </p>
            )}
            {loadState === 'ready' && <LegalBody text={body} />}
          </div>

          <FadeUp className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-sm text-white/35">
              {t('Questions?', 'Fragen?')}{' '}
              <a href="mailto:contact@pixl-develop.com" className="text-brand-blue-light hover:text-white">
                contact@pixl-develop.com
              </a>
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
