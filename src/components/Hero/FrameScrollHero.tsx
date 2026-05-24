/**
 * FrameScrollHero.tsx
 */

import { useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FrameScrollHero.module.css'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 384
const READY_AT = 20
const MOBILE_READY_AT = 8
const FRAME_BASE = '/frames/frame_'

const frameSrc = (n: number) =>
  `${FRAME_BASE}${String(n).padStart(4, '0')}.webp`

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768

const getMobileFrameNumbers = () => {
  // Use frames 0001 to 0120 for mobile view animation
  const nums: number[] = []
  for (let n = 1; n <= 120; n++) nums.push(n)
  return nums
}

const PHASES = [
  { start: 0.08, end: 0.35, text: 'Crafted with Obsession', glass: false },
  { start: 0.42, end: 0.62, text: 'Small Batch · Every Drop Matters', glass: true },
  { start: 0.68, end: 0.87, text: 'Rare Flavors Delivered to You', glass: true },
  { start: 0.90, end: 0.99, text: 'The Rare Scoop', glass: true },
]

interface Props {
  onLoadProgress?: (pct: number) => void
}

export default function FrameScrollHero({ onLoadProgress }: Props) {
  const mobile = isMobile()
  const activeFrameNumbers = useMemo(
    () => (mobile
      ? getMobileFrameNumbers()
      : Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1)),
    [mobile]
  )
  const activeTotalFrames = activeFrameNumbers.length
  const readyThreshold = mobile ? MOBILE_READY_AT : READY_AT
  const navigate = useNavigate()

  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const overlayTextRef = useRef<HTMLSpanElement>(null)
  const finalBrandRef = useRef<HTMLDivElement>(null)
  const finalCtaRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)

  const frames = useRef<HTMLImageElement[]>([])
  const currentIdx = useRef(0)
  const rafId = useRef(0)
  const pendingIdx = useRef<number | null>(null)
  const isRendering = useRef(false)

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = frames.current[idx]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const cW = canvas.width, cH = canvas.height
    if (cW === 0 || cH === 0) return

    const iW = img.naturalWidth, iH = img.naturalHeight
    const s = Math.max(cW / iW, cH / iH) * 1.04
    const dW = iW * s, dH = iH * s
    const dx = (cW - dW) / 2, dy = (cH - dH) / 2

    ctx.clearRect(0, 0, cW, cH)
    ctx.drawImage(img, dx, dy, dW, dH)
  }, [mobile])

  const scheduleRender = useCallback((idx: number) => {
    pendingIdx.current = idx
    if (isRendering.current) return
    isRendering.current = true
    const loop = () => {
      const next = pendingIdx.current
      if (next !== null) { pendingIdx.current = null; drawFrame(next) }
      if (pendingIdx.current !== null) {
        rafId.current = requestAnimationFrame(loop)
      } else {
        isRendering.current = false
      }
    }
    rafId.current = requestAnimationFrame(loop)
  }, [drawFrame])

  const resizeCanvas = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const w = window.innerWidth, h = window.innerHeight
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h }
    drawFrame(currentIdx.current)
  }, [drawFrame])

  const updateOverlay = useCallback((progress: number) => {
    const el = overlayRef.current
    const text = overlayTextRef.current
    const brand = finalBrandRef.current
    const cta = finalCtaRef.current
    if (!el || !text) return

    if (mobile) {
      const showFinal = progress >= 0.9
      el.style.opacity = showFinal ? '1' : '0'
      text.style.display = 'none'
      if (brand) brand.style.display = showFinal ? 'flex' : 'none'
      if (cta) {
        cta.style.opacity = showFinal ? '1' : '0'
        cta.style.transform = showFinal ? 'translateY(0)' : 'translateY(12px)'
        cta.style.pointerEvents = showFinal ? 'all' : 'none'
      }
      return
    }

    const lastPhase = PHASES[PHASES.length - 1]
    let hit: typeof PHASES[0] | null = null
    for (const p of PHASES) {
      if (progress >= p.start && progress <= p.end) { hit = p; break }
    }

    if (hit) {
      const isLast = hit === lastPhase
      const len = hit.end - hit.start
      const local = (progress - hit.start) / len
      const fade = local < 0.2 ? local / 0.2 : (local > 0.8 && !isLast) ? (1 - local) / 0.2 : 1

      el.style.opacity = String(fade)

      if (isLast) {
        text.style.display = 'none'
        if (brand) brand.style.display = 'flex'
        if (cta) {
          const ctaFade = local < 0.3 ? local / 0.3 : 1
          cta.style.opacity = String(ctaFade)
          cta.style.transform = `translateY(${(1 - Math.min(local / 0.3, 1)) * 18}px)`
          cta.style.pointerEvents = ctaFade > 0.5 ? 'all' : 'none'
        }
      } else {
        text.style.display = ''
        text.textContent = hit.text
        if (brand) brand.style.display = 'none'
        if (cta) { cta.style.opacity = '0'; cta.style.pointerEvents = 'none' }
      }
    } else if (progress > lastPhase.end) {
      el.style.opacity = '1'
      text.style.display = 'none'
      if (brand) brand.style.display = 'flex'
      if (cta) { cta.style.opacity = '1'; cta.style.transform = 'translateY(0)'; cta.style.pointerEvents = 'all' }
    } else {
      el.style.opacity = '0'
      text.style.display = ''
      if (brand) brand.style.display = 'none'
      if (cta) { cta.style.opacity = '0'; cta.style.pointerEvents = 'none' }
    }
  }, [])

  useLayoutEffect(() => {
    if (!mobile) resizeCanvas()
  }, [resizeCanvas, mobile])

  useEffect(() => {
    requestAnimationFrame(() => resizeCanvas())

    let loaded = 0
    let readyFired = false

    // ── Fake progress bar: 0→90 in ~1.5s, snaps to 100 when real frames ready ──
      let fakeProgress = 0
    const fakeInterval = setInterval(() => {
      fakeProgress = Math.min(fakeProgress + 10, 90)
      onLoadProgress?.(fakeProgress)
      if (fakeProgress >= 90) clearInterval(fakeInterval)
    }, 25)

    const onFrameLoad = (i: number, img: HTMLImageElement) => {
      frames.current[i] = img
      loaded++

      if (i === 0) scheduleRender(0)

      if (loaded === readyThreshold && !readyFired) {
        readyFired = true
        clearInterval(fakeInterval)
        onLoadProgress?.(100)
        initScrollTrigger()
      }

      if (loaded === activeTotalFrames && !readyFired) {
        readyFired = true
        clearInterval(fakeInterval)
        onLoadProgress?.(100)
        initScrollTrigger()
      }
    }

    for (let i = 0; i < activeTotalFrames; i++) {
      const img = new Image()
      img.decoding = 'async'
      frames.current[i] = img
      img.onload = () => onFrameLoad(i, img)
      img.onerror = () => {
        loaded++
        if (loaded === readyThreshold && !readyFired) {
          readyFired = true
          clearInterval(fakeInterval)
          onLoadProgress?.(100)
          initScrollTrigger()
        }
        if (loaded === activeTotalFrames && !readyFired) {
          readyFired = true
          clearInterval(fakeInterval)
          onLoadProgress?.(100)
          initScrollTrigger()
        }
      }
      img.src = frameSrc(activeFrameNumbers[i])
    }

    function initScrollTrigger() {
      if (!innerRef.current) return
      ScrollTrigger.getAll().forEach(st => st.kill())

      ScrollTrigger.create({
        trigger: innerRef.current,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: mobile ? '+=180%' : '+=300%',
        scrub: mobile ? 0.45 : 1.2,
        onUpdate: (self) => {
          const raw = self.progress
          const eased = raw < 0.5
            ? 4 * raw * raw * raw
            : 1 - Math.pow(-2 * raw + 2, 3) / 2

          const idx = Math.min(Math.floor(eased * (activeTotalFrames - 1)), activeTotalFrames - 1)

          if (idx !== currentIdx.current) {
            currentIdx.current = idx
            scheduleRender(idx)
          }

          updateOverlay(raw)

          if (heroContentRef.current) {
            const fadeWindow = mobile ? 0.45 : 0.2
            const lift = mobile ? 24 : 50
            const op = Math.max(0, 1 - raw / fadeWindow)
            heroContentRef.current.style.opacity = String(op)
            heroContentRef.current.style.transform = `translateY(${raw * -lift}px)`
          }
        },
        onLeave: () => {
          const el = overlayRef.current; const text = overlayTextRef.current
          const brand = finalBrandRef.current; const cta = finalCtaRef.current
          if (!el || !text) return
          el.style.opacity = '1'
          text.style.display = 'none'
          if (brand) brand.style.display = 'flex'
          if (cta) { cta.style.opacity = '1'; cta.style.transform = 'translateY(0)'; cta.style.pointerEvents = 'all' }
        },
        onEnterBack: () => {
          const text = overlayTextRef.current
          const brand = finalBrandRef.current
          const cta = finalCtaRef.current
          if (text) text.style.display = ''
          if (brand) brand.style.display = 'none'
          if (cta) { cta.style.opacity = '0'; cta.style.pointerEvents = 'none' }
        },
      })
    }

    const onResize = () => { resizeCanvas(); ScrollTrigger.refresh() }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      clearInterval(fakeInterval)
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFrameNumbers, activeTotalFrames, mobile, onLoadProgress, resizeCanvas, scheduleRender, updateOverlay])

  return (
    <div ref={outerRef} className={styles.outer}>
      <div ref={innerRef} className={styles.inner}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.vignette} />
        <div ref={overlayRef} className={styles.overlay}>
          <div className={styles.overlayInner}>
            <span ref={overlayTextRef} className={styles.overlayText} />
            <div ref={finalBrandRef} className={styles.finalBrand}>
              <img src="/rarelogo.png" alt="The Rare Scoop" className={styles.finalBrandLogo} />
              <span className={styles.finalBrandName}>The Rare Scoop</span>
            </div>
            <div ref={finalCtaRef} className={styles.finalCta}>
              <button className={styles.finalBtnPrimary} onClick={() => navigate('/menu')}>
                <span>EXPLORE MORE</span>
              </button>
              <button className={styles.finalBtnSecondary} onClick={() => navigate('/ourstory')}>
                <span>OUR STORY</span>
              </button>
            </div>
          </div>
        </div>
        <div ref={heroContentRef} className={styles.heroContent}>
          <p className={styles.eyebrow}>Premium Icecream</p>
          <h1 className={styles.title}>Created for the Curious</h1>
          <div className={styles.startCta}>
            <button className={styles.startBtnPrimary} onClick={() => navigate('/menu')}>
              <span>EXPLORE MORE</span>
            </button>
            <button className={styles.startBtnSecondary} onClick={() => navigate('/ourstory')}>
              <span>OUR STORY</span>
            </button>
          </div>
        </div>
        <div className={styles.scrollHint}>
          <div className={styles.chevron} />
          <span>Scroll to explore</span>
        </div>
      </div>
    </div>
  )
}