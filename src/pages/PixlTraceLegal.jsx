import { Helmet } from 'react-helmet-async'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeUp } from '@/components/ui/AnimatedSection'
import termsHtml from '@/pages/legal/pixltraceTerms.html?raw'
import privacyHtml from '@/pages/legal/pixltracePrivacy.html?raw'

const PIXLTRACE_LEGAL = {
  terms: {
    title: 'Terms & Conditions – PixlTrace',
    description: 'Terms of Service and End User License Agreement for the PixlTrace iOS and Android mobile application.',
    canonical: 'https://pixl-develop.com/terms-app-PixlTrace',
  },
  privacy: {
    title: 'Privacy Policy – PixlTrace',
    description: 'Privacy Policy for PixlTrace, including data processing, analytics, app permissions, and user rights.',
    canonical: 'https://pixl-develop.com/privacy-policy-pixltrace/',
  },
}

function extractArticleText(html) {
  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return Array.from(doc.querySelectorAll('article'))
      .map((article) => article.textContent.trim())
      .filter(Boolean)
  }

  return Array.from(html.matchAll(/<article[\s\S]*?<\/article>/gi))
    .map(([article]) =>
      article
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .trim(),
    )
    .filter(Boolean)
}

function PixlTraceLegalText({ text }) {
  const blocks = useMemo(() => text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean), [text])

  return (
    <article className="legal-document max-w-3xl">
      {blocks.map((block, i) => (
        <p key={i} className="mb-4 whitespace-pre-line text-sm leading-relaxed text-white/65 last:mb-0">
          {block}
        </p>
      ))}
    </article>
  )
}

export default function PixlTraceLegal({ type }) {
  const isTerms = type === 'terms'
  const meta = PIXLTRACE_LEGAL[isTerms ? 'terms' : 'privacy']
  const documents = useMemo(() => extractArticleText(isTerms ? termsHtml : privacyHtml), [isTerms])
  const [activeTab, setActiveTab] = useState('terms')
  const activeDocument = isTerms ? (activeTab === 'terms' ? documents[0] : documents[1]) : documents[0]

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
      </Helmet>

      <section className="relative overflow-hidden pb-6 pt-28 md:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[320px] w-[min(100%,480px)] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[100px]" />
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block rounded-full border border-brand-blue/25 bg-brand-blue/[0.08] px-4 py-1.5 font-mono text-xs tracking-[0.2em] text-brand-blue-light">
              Legal
            </span>
            <h1 className="mb-3 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {isTerms ? (
                <>
                  Legal <span className="gradient-text">information</span>
                </>
              ) : (
                <>
                  Privacy Policy – <span className="gradient-text">PixlTrace</span>
                </>
              )}
            </h1>
            <p className="text-sm text-white/45 sm:text-base">
              {isTerms ? 'Terms, EULA, and app usage rules for PixlTrace.' : 'How PixlTrace protects your data.'}
            </p>
          </FadeUp>

          {isTerms && (
            <div
              role="tablist"
              aria-label="PixlTrace legal documents"
              className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 border-b border-white/10 pb-4"
            >
              {[
                { id: 'terms', label: 'Terms of Service' },
                { id: 'eula', label: 'Terms EULA' },
              ].map((tab) => {
                const selected = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selected
                        ? 'bg-brand-blue/25 text-white ring-1 ring-brand-blue/40'
                        : 'text-white/45 hover:bg-white/[0.04] hover:text-white/75'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/5 pb-24 pt-10">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-10">
            {activeDocument ? (
              <PixlTraceLegalText text={activeDocument} />
            ) : (
              <p className="text-sm text-white/50">This PixlTrace legal document could not be loaded.</p>
            )}
          </div>

          <FadeUp className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-sm text-white/35">
              Questions?{' '}
              <a href="mailto:contact@pixl-develop.com" className="text-brand-blue-light hover:text-white">
                contact@pixl-develop.com
              </a>
            </p>
            <p className="mt-4 text-xs text-white/25">
              <Link to="/legal" className="transition-colors hover:text-white/55">
                View Pixl Develop legal documents
              </Link>
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
