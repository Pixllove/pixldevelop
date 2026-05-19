import { Helmet } from 'react-helmet-async'
import { lazy, Suspense } from 'react'
import Hero from '@/components/sections/Hero'
import Process from '@/components/sections/Process'
import { useI18n } from '@/i18n/LanguageContext'

const WebDesignShowcase = lazy(() => import('@/components/sections/WebDesignShowcase'))
const Services = lazy(() => import('@/components/sections/Services'))
const Storybrand = lazy(() => import('@/components/sections/Storybrand'))
const FreeReport = lazy(() => import('@/components/sections/FreeReport'))
const Testimonials = lazy(() => import('@/components/sections/Testimonials'))
const CalendlyBookingSection = lazy(() => import('@/components/sections/CalendlyBookingSection'))

export default function Home() {
  const { t } = useI18n()

  return (
    <>
      <Helmet>
        <title>{t('Pixl Develop – Your Experts For Digital Products', 'Pixl Develop – Ihre Experten für digitale Produkte')}</title>
        <meta
          name="description"
          content={t(
            'Pixl Develop turns ideas into reality. Expert web design, app development, branding & storybrand strategy for your digital success.',
            'Pixl Develop verwandelt Ideen in Realität. Experten für Webdesign, App-Entwicklung, Branding und Storybrand-Strategie für Ihren digitalen Erfolg.',
          )}
        />
        <link rel="canonical" href="https://pixl-develop.com/" />
      </Helmet>

      <Hero />
      <Process />
      <Suspense fallback={null}>
        <WebDesignShowcase />
        <Services />
        <Storybrand />
        <FreeReport />
        <Testimonials />
        <CalendlyBookingSection />
      </Suspense>
    </>
  )
}
