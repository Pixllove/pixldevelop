import { Helmet } from 'react-helmet-async'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import WebDesignShowcase from '@/components/sections/WebDesignShowcase'
import Storybrand from '@/components/sections/Storybrand'
import FreeReport from '@/components/sections/FreeReport'
import Testimonials from '@/components/sections/Testimonials'
import CalendlyBookingSection from '@/components/sections/CalendlyBookingSection'
import { useI18n } from '@/i18n/LanguageContext'

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
      <WebDesignShowcase />
      <Services />
      <Storybrand />
      <FreeReport />
      <Testimonials />
      <CalendlyBookingSection />
    </>
  )
}
