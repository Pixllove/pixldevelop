import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Expertise from '@/pages/Expertise'
import Pricing from '@/pages/Pricing'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import Legal from '@/pages/Legal'
import Jobs from '@/pages/Jobs'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import PixlTraceLegal from '@/pages/PixlTraceLegal'
import Projects from '@/pages/Projects'
import ProjectDetails from '@/pages/ProjectDetails'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollToTop from '@/components/layout/ScrollToTop'
import FloatingActions from '@/components/layout/FloatingActions'

function TrackPageViews() {
  const location = useLocation()

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'page_view',
      page_path: location.pathname,
    })
  }, [location])

  return null
}

function App() {
  return (
    <Router>
      <TrackPageViews />
      <ScrollToTop />
      <CustomCursor />
      <div className="min-h-screen bg-brand-bg overflow-x-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/prices" element={<Pricing />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/privacy" element={<Navigate to="/legal?tab=privacy" replace />} />
            <Route path="/pricing" element={<Navigate to="/prices" replace />} />
            <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/terms-app-PixlTrace" element={<PixlTraceLegal type="terms" />} />
            <Route path="/terms-app-pixltrace" element={<Navigate to="/terms-app-PixlTrace" replace />} />
            <Route path="/privacy-policy-pixltrace" element={<PixlTraceLegal type="privacy" />} />
            <Route path="/privacy-policy-pixltrace/" element={<PixlTraceLegal type="privacy" />} />
          </Routes>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </Router>
  )
}

export default App
