import { useState, useCallback, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WarmSpecialsPage from './pages/WarmSpecialsPage/WarmSpecialsPage'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import './App.css'

function App() {
  // Raw progress from frame loader (can jump in bursts)
  const rawProgressRef = useRef(0)
  // Smooth display progress — animated via RAF
  const [displayProgress, setDisplayProgress] = useState(0)
  const displayProgressRef = useRef(0)
  const rafRef = useRef<number>(0)
  const lastTickRef = useRef<number>(0)
  const [loaded, setLoaded] = useState(false)

  // RAF loop: smooth, time-based easing that also reaches 100 quickly
  useEffect(() => {
    const BASE_SPEED = 120 // % per second
    const CATCH_UP = 0.2 // extra easing toward target each frame

    const tick = (now: number) => {
      if (!lastTickRef.current) lastTickRef.current = now
      const dt = (now - lastTickRef.current) / 1000
      lastTickRef.current = now

      const raw = rawProgressRef.current
      const cur = displayProgressRef.current

      if (cur < raw) {
        const distance = raw - cur
        const linearStep = BASE_SPEED * dt
        const easeStep = distance * CATCH_UP
        const step = Math.max(linearStep, easeStep)
        const next = Math.min(cur + step, raw)
        displayProgressRef.current = next
        setDisplayProgress(next)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      lastTickRef.current = 0
    }
  }, [])

  // Called by FrameScrollHero as frames load — just updates the raw target
  const handleProgress = useCallback((pct: number) => {
    // Progress should only move forward.
    rawProgressRef.current = Math.max(rawProgressRef.current, pct)
  }, [])

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
    document.body.style.overflow = ''
  }, [])

  // Lock scroll during loading
  if (!loaded && typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }

  return (
    <Router>
      <div className="appWrapper">
        {!loaded && (
          <LoadingScreen
            progress={displayProgress}
            onComplete={handleLoadComplete}
          />
        )}
        
        <Routes>
          <Route path="/" element={<Home handleProgress={handleProgress} />} />
          <Route path="/warm-specials" element={<WarmSpecialsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
