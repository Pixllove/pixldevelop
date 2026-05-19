import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../../../images/optimized/logo.png'
import { useI18n, useLanguage } from '@/i18n/LanguageContext'

const navLinks = [
  { label: { en: 'Home', de: 'Start' }, path: '/' },
  { label: { en: 'Expertise', de: 'Expertise' }, path: '/expertise' },
  { label: { en: 'Our Projects', de: 'Unsere Projekte' }, path: '/projects' },
  { label: { en: 'Pricing', de: 'Preise' }, path: '/prices' },
  { label: { en: 'Blog', de: 'Blog' }, path: '/blog' },
]

const languageOptions = [
  { code: 'en', label: 'English', native: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'German', native: 'Deutsch', short: 'DE', flag: '🇩🇪' },
]

function navLinkActive(pathname, linkPath) {
  if (linkPath === '/') return pathname === '/'
  return pathname === linkPath || pathname.startsWith(`${linkPath}/`)
}

export default function Navbar() {
  const { t } = useI18n()
  const { language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)
  const location = useLocation()
  const selectedLanguage = languageOptions.find((option) => option.code === language) ?? languageOptions[0]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const pushTrackingEvent = (eventName) => {
    if (!eventName) return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName })
  }

  const getNavClickEvent = (path) => {
    if (path === '/') return 'click_home'
    if (path === '/prices') return 'click_price'
    if (path === '/expertise') return 'click_expertise'
    if (path === '/projects') return 'click_projects'
    if (path === '/blog') return 'click_blog'
    return null
  }

  useEffect(() => setOpen(false), [location])
  useEffect(() => setLangOpen(false), [location])

  useEffect(() => {
    const onClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-brand-bg/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo + language selector */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/"
                className="flex items-center gap-3 group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg rounded-md"
              >
                <img
                  src={logoImg}
                  alt="Pixl Develop"
                  width={520}
                  height={204}
                  className="h-10 w-auto max-w-[min(52vw,200px)] sm:h-11 sm:max-w-[220px] md:h-12 md:max-w-[260px] object-contain object-left transition-opacity group-hover:opacity-90"
                  decoding="async"
                />
              </Link>

              <div ref={langRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setLangOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/90 transition-all hover:border-brand-blue/35 hover:bg-white/[0.08] hover:text-white sm:px-3"
                  aria-label="Select language"
                  aria-expanded={langOpen}
                >
                  <span className="text-sm leading-none" aria-hidden>{selectedLanguage.flag}</span>
                  <span className="font-mono tracking-wide">{selectedLanguage.short}</span>
                  <svg className={`h-3 w-3 text-white/50 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full z-50 mt-2 min-w-[190px] overflow-hidden rounded-xl border border-white/10 bg-[#0a0f1ecc]/95 p-1.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                    >
                      {languageOptions.map((option) => (
                        <button
                          key={option.code}
                          type="button"
                          onClick={() => {
                            setLanguage(option.code)
                            setLangOpen(false)
                          }}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                            option.code === selectedLanguage.code
                              ? 'bg-brand-blue/25 text-white'
                              : 'text-white/75 hover:bg-white/[0.08] hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-sm leading-none" aria-hidden>{option.flag}</span>
                            <span>{option.native}</span>
                          </span>
                          <span className="font-mono text-[10px] tracking-wider text-white/45">{option.short}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = navLinkActive(location.pathname, link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => pushTrackingEvent(getNavClickEvent(link.path))}
                    className={`relative font-body text-sm font-medium transition-colors duration-200 group ${
                      active ? 'text-brand-blue-light' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {t(link.label.en, link.label.de)}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-gradient-brand transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                )
              })}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/contact-us"
                onClick={() => pushTrackingEvent('initiate_booking')}
                className="btn-primary text-sm"
              >
                <span>{t('Free Consultation', 'Kostenlose Beratung')}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:border-brand-blue/50 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <motion.span
                  animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-px bg-white origin-center transition-colors"
                />
                <motion.span
                  animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  className="block h-px bg-white"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-px bg-white origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-bg/98 backdrop-blur-2xl md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => pushTrackingEvent(getNavClickEvent(link.path))}
                    className="block text-2xl font-display font-medium text-white hover:text-brand-blue-light transition-colors py-2 border-b border-white/5"
                  >
                    {t(link.label.en, link.label.de)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <Link
                  to="/contact-us"
                  onClick={() => pushTrackingEvent('initiate_booking')}
                  className="btn-primary w-full justify-center text-base"
                >
                  <span>{t('Free Consultation', 'Kostenlose Beratung')}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
