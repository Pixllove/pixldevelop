import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/LanguageContext'

/** Same number as Contact / Footer */
const WHATSAPP_URL = 'https://wa.me/971529937054'

const SCROLL_SHOW_AFTER = 320

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function FloatingActions() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_SHOW_AFTER)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setShowScrollTop(window.scrollY > SCROLL_SHOW_AFTER)
  }, [pathname])

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3
                 max-[380px]:bottom-4 max-[380px]:right-4"
      role="region"
      aria-label={t('Quick actions', 'Schnellaktionen')}
    >
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15
                     bg-black/60 text-white shadow-lg backdrop-blur-md transition-all duration-300
                     hover:border-brand-blue/40 hover:bg-black/75 hover:text-brand-blue-light
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
          aria-label={t('Back to top', 'Nach oben')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({ event: 'click_whatsapp' })
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg
                   ring-2 ring-white/10 transition-transform duration-200 hover:scale-105 hover:bg-[#20bd5a]
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label={t('Chat with Pixl Develop on WhatsApp', 'Pixl Develop per WhatsApp kontaktieren')}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
