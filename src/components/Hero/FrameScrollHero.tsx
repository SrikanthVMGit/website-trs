/**
 * FrameScrollHero.tsx
 * ─────────────────────────────────────────────────────────────
 * Scroll-driven canvas frame animation — Apple-style quality.
 *
 * Architecture:
 *  • GSAP ScrollTrigger pin:true → sticky hero for ~300vh scroll
 *  • RAF-batched canvas draw     → smooth 60fps, zero jank
 *  • Plain Image[] array         → zero React re-renders post mount
 *  • Cubic ease-in-out mapping   → satisfying acceleration feel
 *  • Overlay text phases         → cinematic storytelling layers
 *  • CTA fade + lift             → elegant hand-off to content
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FrameScrollHero.module.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Config ──────────────────────────────────────────────────────
const TOTAL_FRAMES = 121               // hero.mp4 @ 24fps × 5.04s
const FRAME_BASE = '/frames/frame_'  // public/frames/frame_XXXX.webp

const frameSrc = (n: number) =>
  `${FRAME_BASE}${String(n).padStart(4, '0')}.webp`

// ─── Overlay phases (raw progress 0→1) ───────────────────────────
const PHASES = [
  { start: 0.18, end: 0.45, text: 'Small Batch Every Drop Matters', glass: false },
  { start: 0.55, end: 0.80, text: 'Rare Flavors Delivered to You', glass: true },
  { start: 0.86, end: 0.98, text: 'The Rare Scoop', glass: true },
]

// ─── Component ───────────────────────────────────────────────────
export default function FrameScrollHero() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const overlayTextRef = useRef<HTMLSpanElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)

  // Mutable hot-refs — never cause re-renders
  const frames = useRef<HTMLImageElement[]>([])
  const currentIdx = useRef(0)
  const rafId = useRef(0)
  const pendingIdx = useRef<number | null>(null)
  const isRendering = useRef(false)

  // ── Core draw: cover-fit + 4% zoom ───────────────────────────
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = frames.current[idx]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const cW = canvas.width
    const cH = canvas.height
    if (cW === 0 || cH === 0) return              // canvas not ready

    const iW = img.naturalWidth
    const iH = img.naturalHeight
    const s = Math.max(cW / iW, cH / iH) * 1.04
    const dW = iW * s
    const dH = iH * s
    const dx = (cW - dW) / 2
    const dy = (cH - dH) / 2

    ctx.clearRect(0, 0, cW, cH)
    ctx.drawImage(img, dx, dy, dW, dH)
  }, [])

  // ── RAF-batched renderer ──────────────────────────────────────
  const scheduleRender = useCallback((idx: number) => {
    pendingIdx.current = idx
    if (isRendering.current) return
    isRendering.current = true

    const loop = () => {
      const next = pendingIdx.current
      if (next !== null) {
        pendingIdx.current = null
        drawFrame(next)
      }
      if (pendingIdx.current !== null) {
        rafId.current = requestAnimationFrame(loop)
      } else {
        isRendering.current = false
      }
    }
    rafId.current = requestAnimationFrame(loop)
  }, [drawFrame])

  // ── Size canvas to fill viewport ─────────────────────────────
  const resizeCanvas = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const w = window.innerWidth
    const h = window.innerHeight
    if (c.width !== w || c.height !== h) {
      c.width = w
      c.height = h
    }
    drawFrame(currentIdx.current)
  }, [drawFrame])

  // ── Overlay text ──────────────────────────────────────────────
  const updateOverlay = useCallback((progress: number) => {
    const el = overlayRef.current
    const text = overlayTextRef.current
    if (!el || !text) return

    const lastPhase = PHASES[PHASES.length - 1]

    let hit: typeof PHASES[0] | null = null
    for (const p of PHASES) {
      if (progress >= p.start && progress <= p.end) { hit = p; break }
    }

    if (hit) {
      const isLast = hit === lastPhase
      const len = hit.end - hit.start
      const local = (progress - hit.start) / len
      const fade = local < 0.2 ? local / 0.2
        : (local > 0.8 && !isLast) ? (1 - local) / 0.2
          : 1
      text.textContent = hit.text
      el.style.opacity = String(fade)
    } else if (progress > lastPhase.end) {
      text.textContent = lastPhase.text
      el.style.opacity = '1'
    } else {
      el.style.opacity = '0'
    }
  }, [])

  // ── Size canvas immediately after first DOM paint ─────────────
  useLayoutEffect(() => {
    resizeCanvas()
  }, [resizeCanvas])

  // ─── Main mount effect ────────────────────────────────────────
  useEffect(() => {
    // Ensure canvas is sized (defensive — layoutEffect should have done it)
    requestAnimationFrame(() => resizeCanvas())

    // ── Preload all frames ──────────────────────────────────────
    let loaded = 0
    const total = TOTAL_FRAMES

    const onFrameLoad = (i: number, img: HTMLImageElement) => {
      frames.current[i] = img
      loaded++
      // Draw frame 0 as soon as it's done
      if (i === 0) scheduleRender(0)
      // Once all frames are ready, bind scroll
      if (loaded === total) initScrollTrigger()
    }

    for (let i = 0; i < total; i++) {
      const img = new Image()
      frames.current[i] = img             // pre-fill slot
      img.onload = () => onFrameLoad(i, img)
      img.onerror = () => {
        loaded++
        if (loaded === total) initScrollTrigger()
      }
      img.src = frameSrc(i + 1)           // 1-indexed: frame_0001 … frame_0121
    }

    // ── ScrollTrigger (called once all frames are loaded) ───────
    function initScrollTrigger() {
      if (!innerRef.current) return
      // Avoid duplicate triggers on HMR
      ScrollTrigger.getAll().forEach(st => st.kill())

      ScrollTrigger.create({
        trigger: innerRef.current,
        pin: true,         // GSAP pinning — works despite overflow:hidden on body
        pinSpacing: true,         // adds spacer = gives 200vh extra scroll room
        start: 'top top',
        end: '+=200%',     // pin lasts for 2× viewport scroll = total ~300vh
        scrub: 1.5,
        onUpdate: (self) => {
          const raw = self.progress

          // Cubic ease-in-out for Apple-style ease
          const eased = raw < 0.5
            ? 4 * raw * raw * raw
            : 1 - Math.pow(-2 * raw + 2, 3) / 2

          const idx = Math.min(
            Math.floor(eased * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          )

          if (idx !== currentIdx.current) {
            currentIdx.current = idx
            scheduleRender(idx)
          }

          updateOverlay(raw)

          // Fade-out + lift static CTA in first 20% of scroll
          if (heroContentRef.current) {
            const op = Math.max(0, 1 - raw / 0.2)
            heroContentRef.current.style.opacity = String(op)
            heroContentRef.current.style.transform = `translateY(${raw * -50}px)`
          }
        },
        // Hard-lock 'The Rare Scoop.' when user scrolls past the hero end
        onLeave: () => {
          const el = overlayRef.current
          const text = overlayTextRef.current
          if (!el || !text) return
          text.textContent = PHASES[PHASES.length - 1].text
          el.style.opacity = '1'
        },
      })
    }

    // Window resize
    const onResize = () => {
      resizeCanvas()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={outerRef} className={styles.outer}>
      <div ref={innerRef} className={styles.inner}>

        {/* Frame canvas — fills viewport */}
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Gradient vignette */}
        <div className={styles.vignette} />

        {/* Scroll-phase overlay text */}
        <div ref={overlayRef} className={styles.overlay}>
          <span ref={overlayTextRef} className={styles.overlayText} />
        </div>

        {/* Static CTA — fades out on first scroll */}
        <div ref={heroContentRef} className={styles.heroContent}>
          <p className={styles.eyebrow}>Premium Cloud Kitchen</p>
          <h1 className={styles.title}>
            Created for the Curious
          </h1>
          <p className={styles.description}>
            Small batch pints, limited drops, tasting flights —<br />
            crafted for those who want more from dessert.
          </p>
          <div className={styles.buttons}>
            <button className={styles.btnPrimary}>Order Delivery</button>
            <button className={styles.btnSecondary}>Explore Flavors</button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={styles.scrollHint}>
          <div className={styles.chevron} />
          <span>Scroll to explore</span>
        </div>

      </div>
    </div>
  )
}
