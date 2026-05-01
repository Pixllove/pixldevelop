import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { projects, getLocalizedProjectFields } from '@/data/projects'
import { getProjectCoverImage } from '@/data/projectCovers'
import { useI18n } from '@/i18n/LanguageContext'

const ROAD_BG =
  'https://kimi-web-img.moonshot.cn/img/img.freepik.com/63d9b03639f11a65b14c0fc1c269ec3985ec74ac.jpg'

const TOTAL = projects.length

// Spring configs
const SCROLL_SPRING = { stiffness: 50, damping: 25, restDelta: 0.0003 }
const UI_SPRING     = { type: 'spring', stiffness: 200, damping: 30 }

/** Card size in px — desktop matches design; mobile uses nearly full width minus padding */
function getCardDimensions(vw) {
  const horizontalPad = vw < 380 ? 14 : vw < 640 ? 18 : 28
  const maxW = Math.min(620, vw - horizontalPad * 2)
  const w = Math.max(260, maxW)
  const h = Math.round(w * (392 / 620))
  return { width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2 }
}

// ─── Fallback ────────────────────────────────────────────────────────────────
function ProjectCardFallback({ title, accent }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px),
                            linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
        <svg className="h-9 w-9 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9
               c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </div>
      <p className="absolute bottom-4 left-4 right-4 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
        {title}
      </p>
    </div>
  )
}

// ─── Single card — all transforms via useTransform, zero setState ────────────
function RoadProjectCard({ project, index, smoothProgress, vw }) {
  const { t, language } = useI18n()
  if (!project?.id) return null
  const navigate = useNavigate()
  const cover = getProjectCoverImage(project.id)
  const copy = getLocalizedProjectFields(project, language)
  const isLeft = index % 2 === 0

  const { width: cardWidth, height: cardHeight, marginLeft, marginTop } = useMemo(
    () => getCardDimensions(vw),
    [vw],
  )

  // Each card owns a segment of [0,1]. Its "distance" is 0 when centred.
  const segSize   = 1 / TOTAL
  const centre    = (index + 0.5) * segSize

  // raw = signed distance in segment units (−∞ … +∞, 0 = active)
  const raw = useTransform(smoothProgress, (p) => (p - centre) / segSize)

  // abs distance, clamped for perf
  const abs = useTransform(raw, (r) => Math.min(Math.abs(r), 3))

  // ── individual transforms (motion scales down on narrow viewports) ──
  const xSign = isLeft ? -1 : 1
  const xMotionFactor = vw < 640 ? 0.28 : vw < 900 ? 0.34 : 0.4
  const x        = useTransform(raw,  (r) => xSign * r * vw * xMotionFactor)
  const yNudge   = vw < 640 ? 16 : 24
  const y        = useTransform(abs,  (a) => a * a * yNudge)
  const minScale = vw < 640 ? 0.42 : 0.52
  const scale    = useTransform(abs,  (a) => Math.max(minScale, 1 - a * 0.36))
  const rotateYDeg = vw < 640 ? -12 : vw < 900 ? -18 : -26
  const rotateY  = useTransform(raw,  (r) => xSign * r * rotateYDeg)
  const rotateZDeg = vw < 640 ? 0.9 : 1.6
  const rotateZ  = useTransform(raw,  (r) => xSign * r * rotateZDeg)
  const opacity  = useTransform(abs,  (a) => Math.max(0.12, 1 - a * 0.72))
  const blur     = useTransform(abs,  (a) => (a < 0.5 ? 0 : Math.min((a - 0.5) * 9, 16)))
  const filter   = useTransform(blur, (b) => `blur(${b}px)`)
  const zIdx     = useTransform(abs,  (a) => Math.max(20, Math.round(200 - a * 90)))

  // Glow ring & top line — only animate opacity, never layout props
  const glowOpacity  = useTransform(abs, (a) => (a < 0.5 ? 0.9 : 0))
  const lineOpacity  = useTransform(abs, (a) => Math.max(0.15, 1 - a * 1.6))
  const imgScale     = useTransform(abs, (a) => (a < 0.5 ? 1.06 : 1))
  const greenBg      = useTransform(abs, (a) =>
    a < 0.5 ? 'rgba(34,197,94,1)' : 'rgba(34,197,94,0.2)')
  const greenGlow    = useTransform(abs, (a) =>
    a < 0.5 ? '0 0 16px rgba(34,197,94,0.95)' : '0 0 0px transparent')

  // Arrow nudge
  const arrowX       = useTransform(abs, (a) => (a < 0.5 ? 5 : 0))
  const labelOpacity = useTransform(abs, (a) => (a < 0.5 ? 1 : 0.45))
  const labelX       = useTransform(abs, (a) => (a < 0.5 ? 0 : -4))

  return (
    <motion.article
      onClick={() => navigate(`/projects/${project.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          navigate(`/projects/${project.id}`)
        }
      }}
      tabIndex={0}
      style={{
        x, y, scale, rotateY, rotateZ, opacity, filter,
        zIndex: zIdx,
        transformStyle: 'preserve-3d',
        position: 'absolute',
        left: '50%',
        top: '44%',
        marginLeft,
        marginTop,
        width: cardWidth,
        height: cardHeight,
        maxWidth: 'calc(100vw - 24px)',
        cursor: 'pointer',
        pointerEvents: 'auto',
        willChange: 'transform, opacity, filter',
      }}
      className={`overflow-hidden rounded-[28px] border border-white/[0.11]
                 shadow-[0_48px_96px_-16px_rgba(0,0,0,0.95)] backdrop-blur-2xl ${
                   vw < 640 ? 'bg-[#0b1224]/95' : 'bg-gradient-to-b from-white/[0.08] to-transparent'
                 }`}
    >
      {/* Glow ring */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{
          opacity: glowOpacity,
          boxShadow: `inset 0 0 60px ${project.accent}30, 0 0 80px ${project.accent}20`,
        }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          opacity: lineOpacity,
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />

      <div
        className="block h-full focus:outline-none focus-visible:ring-2
                   focus-visible:ring-white/25 focus-visible:ring-offset-2
                   focus-visible:ring-offset-black"
      >
        {/* ── Image section ──────────────────────────────────────────── */}
        <div
          className={`relative h-[57%] overflow-hidden bg-gradient-to-br ${project.gradient}`}
          style={{ borderBottom: `1px solid ${project.accent}22` }}
        >
          {cover ? (
            <motion.img
              src={cover}
              alt={`${copy.title} preview`}
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{ scale: imgScale }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <ProjectCardFallback title={copy.title} accent={project.accent} />
          )}

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

          {/* Traffic lights */}
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60"
              style={{ boxShadow: '0 0 7px rgba(239,68,68,0.55)' }} />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60"
              style={{ boxShadow: '0 0 7px rgba(234,179,8,0.55)' }} />
            <motion.span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: greenBg, boxShadow: greenGlow }}
            />
          </div>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
            <motion.p
              className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] sm:mb-1.5 sm:text-[10px] sm:tracking-[0.25em]"
              style={{ color: project.accent, opacity: lineOpacity }}
            >
              {copy.type}
            </motion.p>
            <h2 className="font-display text-base font-bold leading-snug text-white drop-shadow-lg sm:text-[1.6rem] sm:leading-tight">
              {copy.title}
            </h2>
          </div>
        </div>

        {/* ── Content section ────────────────────────────────────────── */}
        <div className="flex h-[43%] flex-col justify-between px-3 py-3 sm:px-5 sm:py-4">
          <p className={`line-clamp-2 text-xs leading-relaxed sm:text-[13px] ${vw < 640 ? 'text-white/70' : 'text-white/50'}`}>
            {copy.shortDescription}
          </p>

          <div className="mt-2 flex flex-wrap gap-1 sm:mt-0 sm:gap-1.5">
            {copy.links.map((pl) => (
              <a
                key={pl.href}
                href={pl.href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex max-w-full items-center gap-1 rounded-full border border-white/[0.14]
                           bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white/65
                           transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white
                           sm:gap-1.5 sm:px-3 sm:py-1 sm:text-[11px]"
              >
                {pl.label}
                <svg className="h-2.5 w-2.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-1.5 text-xs font-semibold sm:gap-2 sm:text-[13px]"
            style={{ color: project.accent, opacity: labelOpacity, x: labelX }}
          >
            <Link
              to={`/projects/${project.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-flex items-center gap-1.5 rounded-full py-1 pr-1 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 sm:gap-2"
            >
              <span className="whitespace-nowrap">{t('View full project', 'Vollständiges Projekt ansehen')}</span>
              <motion.svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ x: arrowX }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

// ─── HUD label with crossfade ────────────────────────────────────────────────
function ActiveLabel({ project }) {
  const { language } = useI18n()
  const copy = project ? getLocalizedProjectFields(project, language) : null
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project?.id}
        initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none text-center"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
          {copy?.type}
        </p>
        <p className="mt-0.5 text-[13px] font-semibold text-white/55 tracking-wide">
          {copy?.title}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Lane dashes — pure CSS animation, no JS ─────────────────────────────────
function LaneDashes({ left, opacity = 0.22, delay = 0 }) {
  return (
    <div
      className="absolute top-0 bottom-0"
      style={{
        left,
        width: left === '50%' ? '2px' : '1px',
        transform: 'translateX(-50%)',
        background: `repeating-linear-gradient(180deg,
          rgba(255,255,255,${opacity}) 0px,
          rgba(255,255,255,${opacity}) 36px,
          transparent 36px,
          transparent 84px)`,
        animation: `laneScroll 1.3s ${delay}s linear infinite`,
      }}
    />
  )
}

// ─── Main scene ──────────────────────────────────────────────────────────────
function CinematicRoadStage() {
  const { t, language } = useI18n()
  const containerRef  = useRef(null)
  const [vw, setVw]   = useState(typeof window !== 'undefined' ? window.innerWidth : 1400)
  const [activeIdx, setActiveIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING)

  // Progress bar width as motion value — no setState needed
  const progressBarWidth = useTransform(smoothProgress, (v) => `${v * 100}%`)

  // Parallax road bg
  const roadY = useTransform(smoothProgress, [0, 1], ['0%', '18%'])

  // Road speed: darken slightly at rest, lighten mid-journey
  const roadBrightness = useTransform(smoothProgress, [0, 0.5, 1], [0.36, 0.42, 0.36])
  const roadFilter = useTransform(
    roadBrightness,
    (b) => `brightness(${b}) contrast(1.3) saturate(0.85)`,
  )

  // Active index — only state update, fine since it's rare
  useMotionValueEvent(smoothProgress, 'change', (v) => {
    setActiveIdx(Math.min(TOTAL - 1, Math.floor(v * TOTAL)))
  })

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollToIdx = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, idx))
    const sh = containerRef.current?.scrollHeight ?? 0
    const target = (clamped / TOTAL) * (sh - window.innerHeight)
    window.scrollTo({ top: target, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowDown', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault(); scrollToIdx(activeIdx + 1)
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        e.preventDefault(); scrollToIdx(activeIdx - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, scrollToIdx])

  // Dot milestones for progress bar
  const dots = useMemo(() =>
    projects.map((_, i) => ({
      left: TOTAL <= 1 ? '0%' : `${(i / (TOTAL - 1)) * 100}%`,
      active: i <= activeIdx,
    })), [activeIdx])

  return (
    <>
      {/* CSS keyframe for lane animation — injected once */}
      <style>{`
        @keyframes laneScroll {
          from { background-position-y: 0px; }
          to   { background-position-y: 120px; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${TOTAL * 115}vh`, background: '#030303' }}
      >
        <div className="fixed inset-0 overflow-x-hidden overflow-y-hidden">

          {/* ── Road BG with parallax ── */}
          <motion.div
            className="absolute inset-[-10%] bg-cover bg-center"
            style={{
              backgroundImage: `url(${ROAD_BG})`,
              y: roadY,
              filter: roadFilter,
            }}
          />

          {/* Vignettes */}
          <div className="pointer-events-none absolute inset-0
                          bg-gradient-to-b from-black/75 via-transparent to-black/80" />
          <div className="pointer-events-none absolute inset-0
                          bg-gradient-to-r from-black/60 via-transparent to-black/60" />

          {/* ── Lane markings ── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <LaneDashes left="50%"  opacity={0.2}  delay={0}   />
            <LaneDashes left="26%"  opacity={0.07} delay={0.3} />
            <LaneDashes left="74%"  opacity={0.07} delay={0.6} />
            <LaneDashes left="10%"  opacity={0.04} delay={0.1} />
            <LaneDashes left="90%"  opacity={0.04} delay={0.4} />

            {/* Horizon glow */}
            <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2
                            h-32 w-[55vw] bg-cyan-400/[0.07] blur-[90px] rounded-full" />
            {/* Side bleeds */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2
                            h-[70vh] w-48 bg-blue-600/[0.12] blur-[130px]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2
                            h-[70vh] w-48 bg-violet-700/[0.12] blur-[130px]" />
          </div>

          {/* ── 3D stage ── */}
          <div
            className="relative h-full w-full flex items-center justify-center"
            style={{ perspective: '2000px', perspectiveOrigin: '50% 43%' }}
          >
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {projects.map((project, i) => (
                <RoadProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  smoothProgress={smoothProgress}
                  vw={vw}
                />
              ))}
            </div>

            {/* Dust motes — random values memoised so no re-render churn */}
            {useMemo(() => (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 16 }, (_, i) => {
                  const size   = Math.random() * 2.5 + 0.8
                  const left   = `${Math.random() * 100}%`
                  const top    = `${Math.random() * 100}%`
                  const dur    = 4.5 + Math.random() * 5.5
                  const delay  = Math.random() * 8
                  const rise   = 70 + Math.random() * 80
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white/25"
                      style={{ width: size, height: size, left, top }}
                      animate={{ y: [0, -rise, 0], opacity: [0, 0.4, 0], scale: [0, 1, 0] }}
                      transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
                    />
                  )
                })}
              </div>
            ), [])}
          </div>

          {/* ── HUD ── */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0
                          flex flex-col items-center gap-3.5 pb-8">

            {/* Progress track */}
            <div className="w-full max-w-[340px] px-4">
              <div className="relative h-[2px] rounded-full overflow-visible"
                   style={{ background: 'rgba(255,255,255,0.07)' }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: progressBarWidth,
                    background: 'linear-gradient(90deg, #2563eb, #06b6d4, #2563eb)',
                    boxShadow: '0 0 12px rgba(6,182,212,0.65)',
                  }}
                />
                {dots.map(({ left, active }, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 h-[7px] w-[7px] rounded-full
                               transition-all duration-500"
                    style={{
                      left,
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: active ? '#22d3ee' : 'rgba(255,255,255,0.18)',
                      boxShadow: active ? '0 0 7px rgba(34,211,238,0.85)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Active project label */}
            <ActiveLabel project={projects[activeIdx]} />

            {/* Counter pill */}
            <div className="pointer-events-auto flex items-center gap-3.5 px-5 py-2.5
                            rounded-full border border-white/[0.08] bg-black/50 backdrop-blur-2xl">
              <div className="flex items-center gap-1.5 text-white/35">
                <motion.svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em]">{t('scroll', 'scrollen')}</span>
              </div>
              <div className="h-3.5 w-px bg-white/12" />
              <div className="flex items-baseline gap-1.5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIdx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18 }}
                    className="font-display text-[22px] font-bold text-white tabular-nums leading-none"
                  >
                    {String(activeIdx + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <span className="text-white/25 text-xs">/</span>
                <span className="text-white/30 text-xs font-mono tabular-nums">
                  {String(TOTAL).padStart(2, '0')}
                </span>
              </div>
            </div>

          </div>

          {/* Speed-line scan texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.04) 6px)',
            }}
          />
        </div>
      </div>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Projects() {
  const { t } = useI18n()
  return (
    <>
      <Helmet>
        <title>{t('Projects – Pixl Develop', 'Projekte – Pixl Develop')}</title>
        <meta name="description"
          content="Explore Pixl Develop portfolio: mobile apps on Google Play and the App Store, healthcare and IT websites, and full project case studies." />
        <link rel="canonical" href="https://pixl-develop.com/projects" />
      </Helmet>

      <main className="relative bg-black">

        {/* ── Hero ── */}
        <section className="relative z-10 min-h-screen flex flex-col items-center
                            justify-center px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent z-0" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <nav aria-label="Breadcrumb" className="flex justify-center mb-8">
              <ol className="flex items-center gap-2 text-xs font-mono text-white/35
                             uppercase tracking-widest">
                <li>
                  <Link to="/" className="hover:text-cyan-400 transition-colors duration-300">
                    {t('Home', 'Start')}
                  </Link>
                </li>
                <li aria-hidden className="text-white/15">/</li>
                <li className="text-cyan-400">{t('Projects', 'Projekte')}</li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-[11px] font-mono text-cyan-400 tracking-[0.3em]
                               uppercase mb-6 px-4 py-2 rounded-full border border-cyan-500/25
                               bg-cyan-500/[0.08] backdrop-blur-sm">
                {t('Portfolio Highway', 'Portfolio-Highway')}
              </span>
            </motion.div>

            <motion.h1
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[88px]
                         text-white mb-6 leading-[0.88] tracking-tight"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('The Road to', 'Der Weg zu')}
              <br />
              <span className="text-transparent bg-clip-text
                               bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
                {t('Innovation', 'Innovation')}
              </span>
            </motion.h1>

            <motion.p
              className="text-white/45 text-lg md:text-xl leading-relaxed
                         max-w-xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.22 }}
            >
              {t('Scroll to cruise through our work. Each project arrives from its own lane.', 'Scrollen Sie durch unsere Arbeiten. Jedes Projekt kommt aus seiner eigenen Spur.')}
            </motion.p>

            <motion.div
              className="flex flex-col items-center gap-2.5 text-white/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.38 }}
            >
              <div className="w-6 h-10 rounded-full border border-white/20
                              flex items-start justify-center pt-1.5">
                <motion.div
                  className="w-1 h-2 bg-cyan-400 rounded-full"
                  animate={{ y: [0, 14, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
                {t('Start Engine', 'Motor starten')}
              </span>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2
                          w-[600px] h-[300px] bg-blue-500/[0.15] blur-[120px] rounded-full" />
        </section>

        <CinematicRoadStage />

        {/* ── Footer ── */}
        <div className="relative z-10 flex h-[45vh] items-end justify-center bg-black pb-14">
          <div className="text-center">
            <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.3em] text-white/25">
              {t('End of Road', 'Ende der Strecke')}
            </p>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.18]
                         bg-white/[0.08] px-7 py-3.5 font-medium text-white text-sm
                         hover:bg-white/[0.14] hover:border-white/30 transition-all duration-300
                         backdrop-blur-sm"
            >
              {t('Start Your Project', 'Projekt starten')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
