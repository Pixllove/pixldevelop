import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
  useMotionValue,
} from 'framer-motion'
import { FadeUp } from '@/components/ui/AnimatedSection'
import { Link, useNavigate } from 'react-router-dom'
import { projects, getLocalizedProjectFields } from '@/data/projects'
import { getProjectCoverImage } from '@/data/projectCovers'
import { useI18n } from '@/i18n/LanguageContext'

const FEATURED_ON_HOME = 3
const ROAD_BG =
  'https://kimi-web-img.moonshot.cn/img/img.freepik.com/63d9b03639f11a65b14c0fc1c269ec3985ec74ac.jpg'

const SCROLL_SPRING   = { stiffness: 50,  damping: 25, restDelta: 0.0003 }
const CARD_SPRING     = { stiffness: 58,  damping: 34, mass: 0.88, restDelta: 0.0002 }
const MOBILE_CARD_SPRING = { stiffness: 44, damping: 30, mass: 0.95, restDelta: 0.0002 }

function isIOSDevice() {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

function getCardDimensions(vw) {
  const pad  = vw < 380 ? 14 : vw < 640 ? 18 : 28
  const maxW = Math.min(620, vw - pad * 2)
  const w    = Math.max(260, maxW)
  const h    = Math.round(w * (392 / 620))
  return { width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2 }
}

// ─── Single card ──────────────────────────────────────────────────────────────
function RoadFeaturedCard({ project, index, total, progress, vw, t, language, perfMode }) {
  const navigate = useNavigate()
  const cover    = getProjectCoverImage(project.id)
  const copy     = getLocalizedProjectFields(project, language)
  const isLeft   = index % 2 === 0
  const isMobile = vw < 640
  const skipFilters = perfMode || isMobile
  const { width, height, marginLeft, marginTop } = useMemo(() => getCardDimensions(vw), [vw])

  const cardSpring = useSpring(progress, isMobile ? MOBILE_CARD_SPRING : CARD_SPRING)

  const segSize = 1 / total
  const centre  = (index + 0.5) * segSize
  const raw  = useTransform(cardSpring, (p) => (p - centre) / segSize)
  const abs  = useTransform(raw, (r) => Math.min(Math.abs(r), 2.5))

  const xSign  = isLeft ? -1 : 1
  const xF     = isMobile ? 0.28 : vw < 900 ? 0.34 : 0.4
  const x      = useTransform(raw, (r) => xSign * r * vw * xF)
  const y      = useTransform(abs, (a) => a * a * (isMobile ? 16 : 24))
  const sc     = useTransform(abs, (a) => Math.max(isMobile ? 0.42 : 0.52, 1 - a * 0.36))
  const ryDeg  = isMobile ? -12 : vw < 900 ? -18 : -26
  const rotateY = useTransform(raw, (r) => xSign * r * ryDeg)
  const rzDeg   = isMobile ? 0.9 : 1.6
  const rotateZ = useTransform(raw, (r) => xSign * r * rzDeg)
  const opacity = useTransform(abs, (a) => Math.max(0.12, 1 - a * 0.72))
  const blurV   = useTransform(abs, (a) => (skipFilters || a < 0.5 ? 0 : Math.min((a - 0.5) * 9, 16)))
  const filter  = useTransform(blurV, (b) => `blur(${b}px)`)
  const zIdx    = useTransform(abs, (a) => Math.max(20, Math.round(200 - a * 90)))

  const glowOp   = useTransform(abs, (a) => (perfMode ? 0 : a < 0.5 ? 0.9 : 0))
  const lineOp   = useTransform(abs, (a) => Math.max(0.15, 1 - a * 1.6))
  const imgSc    = useTransform(abs, (a) => (a < 0.5 ? (isMobile ? 1.025 : 1.06) : 1))
  const greenBg  = useTransform(abs, (a) => (a < 0.5 ? 'rgba(34,197,94,1)' : 'rgba(34,197,94,0.2)'))
  const greenGlow = useTransform(abs, (a) =>
    perfMode ? 'none' : a < 0.5 ? '0 0 16px rgba(34,197,94,0.95)' : '0 0 0px transparent')
  const arrowX   = useTransform(abs, (a) => (a < 0.5 ? 5 : 0))
  const labelOp  = useTransform(abs, (a) => (a < 0.5 ? 1 : 0.45))
  const labelX   = useTransform(abs, (a) => (a < 0.5 ? 0 : -4))

  return (
    <motion.article
      onClick={() => navigate(`/projects/${project.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/projects/${project.id}`) }
      }}
      tabIndex={0}
      style={{
        x, y,
        scale: sc,
        rotateY, rotateZ, opacity,
        ...(skipFilters ? {} : { filter }),
        zIndex: zIdx,
        transformStyle: 'preserve-3d',
        position: 'fixed',          // ← fixed so it's always viewport-centred
        left: '50%',
        top: isMobile ? '46%' : '44%',
        marginLeft,
        marginTop,
        width,
        height,
        maxWidth: 'calc(100vw - 24px)',
        cursor: 'pointer',
        pointerEvents: 'auto',
        willChange: skipFilters ? 'transform, opacity' : 'transform, opacity, filter',
        backfaceVisibility: 'hidden',
      }}
      className={`overflow-hidden rounded-[28px] border border-white/[0.11] ${
        perfMode
          ? 'shadow-[0_28px_56px_-20px_rgba(0,0,0,0.9)]'
          : 'shadow-[0_48px_96px_-16px_rgba(0,0,0,0.95)] backdrop-blur-2xl'
      } ${isMobile ? 'bg-[#0b1224]/95' : 'bg-gradient-to-b from-white/[0.08] to-transparent'}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{ opacity: glowOp, boxShadow: `inset 0 0 60px ${project.accent}30, 0 0 80px ${project.accent}20` }} />
      <motion.div className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ opacity: lineOp, background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} />

      <div className="block h-full focus:outline-none">
        <div className={`relative h-[57%] overflow-hidden bg-gradient-to-br ${project.gradient}`}
          style={{ borderBottom: `1px solid ${project.accent}22` }}>
          {cover && (
            <motion.img src={cover} alt={`${copy.title} preview`}
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{ scale: imgSc }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" style={{ boxShadow: '0 0 7px rgba(239,68,68,0.55)' }} />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" style={{ boxShadow: '0 0 7px rgba(234,179,8,0.55)' }} />
            <motion.span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: greenBg, boxShadow: greenGlow }} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
            <motion.p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.25em]"
              style={{ color: project.accent, opacity: lineOp }}>{copy.type}</motion.p>
            <h2 className="font-display text-base font-bold leading-snug text-white drop-shadow-lg sm:text-[1.6rem] sm:leading-tight">
              {copy.title}
            </h2>
          </div>
        </div>

        <div className="flex h-[43%] flex-col justify-between px-3 py-3 sm:px-5 sm:py-4">
          <p className={`line-clamp-2 text-sm leading-relaxed sm:text-[13px] ${isMobile ? 'text-white/70' : 'text-white/50'}`}>
            {copy.shortDescription}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-0">
            {copy.links.map((pl) => (
              <a key={pl.href} href={pl.href} target="_blank" rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-full border border-white/[0.14] bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/75 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white sm:gap-1.5 sm:px-3">
                {pl.label}
                <svg className="h-2.5 w-2.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
          <motion.div className="mt-3 flex items-center gap-1.5 text-sm font-semibold sm:mt-0 sm:text-[13px]"
            style={{ color: project.accent, opacity: labelOp, x: labelX }}>
            <Link to={`/projects/${project.id}`} onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full py-1 pr-1 transition-colors hover:text-white sm:gap-2">
              <span className="whitespace-nowrap">{t('View full project', 'Vollständiges Projekt ansehen')}</span>
              <motion.svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ x: arrowX }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

function ActiveLabel({ project, language }) {
  const copy = project ? getLocalizedProjectFields(project, language) : null
  return (
    <AnimatePresence mode="wait">
      <motion.div key={project?.id}
        initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">{copy?.type}</p>
        <p className="mt-0.5 text-[13px] font-semibold text-white/55 tracking-wide">{copy?.title}</p>
      </motion.div>
    </AnimatePresence>
  )
}

function LaneDashes({ left, opacity = 0.22, delay = 0, animate = true }) {
  return (
    <div className="absolute top-0 bottom-0" style={{
      left, width: left === '50%' ? '2px' : '1px',
      transform: 'translateX(-50%)',
      background: `repeating-linear-gradient(180deg,rgba(255,255,255,${opacity}) 0px,rgba(255,255,255,${opacity}) 36px,transparent 36px,transparent 84px)`,
      animation: animate ? `wdsLaneScroll 1.3s ${delay}s linear infinite` : 'none',
    }} />
  )
}

// ─── Main stage ───────────────────────────────────────────────────────────────
function RoadFeaturedStage({ featuredProjects, t, language }) {
  const outerRef   = useRef(null)   // tall scroll spacer
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400)
  const [isIOS, setIsIOS] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isActive, setIsActive]   = useState(false)  // true while section is pinned
  const activeIdxRef = useRef(0)

  const total     = featuredProjects.length
  const isMobile  = vw < 640
  const perfMode  = isMobile && isIOS

  // Manual scroll progress motion value — avoids framer's useScroll quirks
  const rawProgress = useMotionValue(0)
  const smooth      = useSpring(rawProgress, SCROLL_SPRING)

  const lastCentre = total > 0 ? (total - 0.5) / total : 1
  const stageProg  = useTransform(smooth, (v) => Math.min(Math.max(v, 0), lastCentre))

  const barWidth   = useTransform(stageProg, [0, lastCentre], ['0%', '100%'])
  const roadY      = useTransform(smooth, [0, 1], ['0%', '18%'])
  const roadBright = useTransform(smooth, [0, 0.5, 1], [0.36, 0.44, 0.36])
  const roadFilter = useTransform(roadBright, (b) => `brightness(${b}) contrast(1.3) saturate(0.85)`)

  // Watch stageProg to update activeIdx
  useEffect(() => {
    const unsub = stageProg.on('change', (v) => {
      const next = Math.min(total - 1, Math.floor(v * total))
      if (next !== activeIdxRef.current) { activeIdxRef.current = next; setActiveIdx(next) }
    })
    return unsub
  }, [stageProg, total])

  useEffect(() => {
    setIsIOS(isIOSDevice())
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Manual scroll handler — calculates progress from section position
  useEffect(() => {
    const handleScroll = () => {
      const el = outerRef.current
      if (!el) return

      const rect    = el.getBoundingClientRect()
      const elH     = el.offsetHeight
      const vh      = window.innerHeight

      // How far into the section we've scrolled
      // 0 = section top just hit viewport top
      // 1 = section bottom just hit viewport bottom
      const scrolled = -rect.top
      const maxScroll = elH - vh

      if (scrolled < 0) {
        // Above section — hide fixed elements
        setIsActive(false)
        rawProgress.set(0)
      } else if (scrolled > maxScroll) {
        // Below section — hide fixed elements
        setIsActive(false)
        rawProgress.set(1)
      } else {
        // Inside section — show fixed elements, update progress
        setIsActive(true)
        rawProgress.set(scrolled / maxScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [rawProgress])

  const dots = useMemo(() =>
    featuredProjects.map((_, i) => ({
      left: total <= 1 ? '0%' : `${(i / (total - 1)) * 100}%`,
      active: i <= activeIdx,
    })), [activeIdx, featuredProjects, total])

  // Each card gets 115vh of scroll travel
  const sectionH = `${total * 115}vh`

  return (
    <>
      <style>{`
        @keyframes wdsLaneScroll {
          from { background-position-y: 0px; }
          to   { background-position-y: 120px; }
        }
      `}</style>

      {/* Tall spacer div — takes up space in document flow */}
      <div ref={outerRef} style={{ height: sectionH, position: 'relative' }}>

        {/*
          Fixed overlay — only visible while scrolling through this section.
          Uses `visibility` so it's hidden (not removed) outside the section,
          which prevents layout jumps and keeps framer springs alive.
        */}
        <div
          className="fixed inset-0 overflow-hidden"
          style={{
            background: '#030303',
            visibility: isActive ? 'visible' : 'hidden',
            zIndex: 40,
            pointerEvents: isActive ? 'auto' : 'none',
          }}
        >
          {/* Road BG */}
          <motion.div
            className="absolute inset-[-10%] bg-cover bg-center"
            style={{
              backgroundImage: `url(${ROAD_BG})`,
              y: roadY,
              filter: perfMode ? 'brightness(0.40)' : roadFilter,
            }}
          />

          {/* Vignettes */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/80" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

          {/* Lane markings */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <LaneDashes left="50%" opacity={perfMode ? 0.14 : 0.2} delay={0} animate={!perfMode} />
            <LaneDashes left="26%" opacity={0.07} delay={0.3} animate={!perfMode} />
            <LaneDashes left="74%" opacity={0.07} delay={0.6} animate={!perfMode} />
            {!perfMode && (
              <>
                <LaneDashes left="10%" opacity={0.04} delay={0.1} />
                <LaneDashes left="90%" opacity={0.04} delay={0.4} />
                <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 h-32 w-[55vw] bg-cyan-400/[0.07] blur-[90px] rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[70vh] w-48 bg-blue-600/[0.12] blur-[130px]" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[70vh] w-48 bg-violet-700/[0.12] blur-[130px]" />
              </>
            )}
          </div>

          {/* 3-D stage — perspective wrapper, cards are fixed inside */}
          <div className="absolute inset-0"
            style={{ perspective: '2000px', perspectiveOrigin: '50% 43%' }}>
            {featuredProjects.map((project, i) => (
              <RoadFeaturedCard
                key={project.id}
                project={project}
                index={i}
                total={total}
                progress={stageProg}
                vw={vw}
                t={t}
                language={language}
                perfMode={perfMode}
              />
            ))}
          </div>

          {/* HUD */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3.5 pb-8" style={{ zIndex: 50 }}>
            {/* Progress bar */}
            <div className="w-full max-w-[340px] px-4">
              <div className="relative h-[2px] rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <motion.div className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: barWidth,
                    background: 'linear-gradient(90deg,#2563eb,#06b6d4,#2563eb)',
                    boxShadow: '0 0 12px rgba(6,182,212,0.65)',
                  }} />
                {dots.map(({ left, active }, i) => (
                  <div key={i} className="absolute h-[7px] w-[7px] rounded-full transition-all duration-500"
                    style={{
                      left, top: '50%',
                      transform: 'translate(-50%,-50%)',
                      backgroundColor: active ? '#22d3ee' : 'rgba(255,255,255,0.18)',
                      boxShadow: active ? '0 0 7px rgba(34,211,238,0.85)' : 'none',
                    }} />
                ))}
              </div>
            </div>

            <ActiveLabel project={featuredProjects[activeIdx]} language={language} />

            {/* Counter pill */}
            <div className={`pointer-events-auto flex items-center gap-3.5 px-5 py-2.5 rounded-full border border-white/[0.08] bg-black/50 ${perfMode ? '' : 'backdrop-blur-2xl'}`}>
              <div className="flex items-center gap-1.5 text-white/35">
                <motion.svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  animate={{ y: [0, 3, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em]">{t('scroll', 'scrollen')}</span>
              </div>
              <div className="h-3.5 w-px bg-white/12" />
              <div className="flex items-baseline gap-1.5">
                <AnimatePresence mode="wait">
                  <motion.span key={activeIdx}
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18 }}
                    className="font-display text-[22px] font-bold text-white tabular-nums leading-none">
                    {String(activeIdx + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <span className="text-white/25 text-xs">/</span>
                <span className="text-white/30 text-xs font-mono">{String(total).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* Scan-line texture */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{ background: 'repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 6px)' }} />
        </div>

      </div>
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function WebDesignShowcase() {
  const { t, language }  = useI18n()
  const featuredProjects = projects.slice(0, FEATURED_ON_HOME)

  return (
    <section style={{ background: '#030303' }}>
      {/* Header — always visible, normal flow */}
      <div className="container-max section-padding pb-16">
        <FadeUp className="text-center">
          <span className="inline-block text-xs font-mono text-brand-blue-light tracking-widest uppercase mb-4 px-3 py-1 rounded-full border border-brand-blue/25 bg-brand-blue/5">
            {t('Featured Projects', 'Ausgewählte Projekte')}
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-5">
            {t('Mobile Apps & ', 'Mobile Apps & ')}
            <span className="gradient-text">{t('Website Projects', 'Webprojekte')}</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {t(
              'Explore selected projects from Pixl Develop. Click any card to view full details and open live links.',
              'Entdecken Sie ausgewählte Projekte von Pixl Develop. Klicken Sie auf eine Karte für Details und Live-Links.',
            )}
          </p>
        </FadeUp>
      </div>

      {/* Scroll stage */}
      <RoadFeaturedStage featuredProjects={featuredProjects} t={t} language={language} />

      {/* CTA */}
      <div className="container-max py-12 text-center">
        <FadeUp>
          <Link
            to="/projects"
            onClick={() => {
              window.dataLayer = window.dataLayer || []
              window.dataLayer.push({ event: 'click_more_projects' })
            }}
            className="btn-outline text-sm inline-flex"
          >
            <span>{t('Show All Projects', 'Alle Projekte anzeigen')}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}