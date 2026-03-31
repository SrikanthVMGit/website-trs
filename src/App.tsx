import { useState, useCallback, useRef, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import FrameScrollHero from './components/Hero/FrameScrollHero'
import Thickshakes from './components/Thickshakes/Thickshakes'
import Milkshakes from './components/Milkshakes/Milkshakes'
import Icecreams from './components/Icecreams/Icecreams'
import Categories from './components/Categories/Categories'
import SeasonalDrops from './components/SeasonalDrops/SeasonalDrops'
import ArtOfIceCream from './components/ArtOfIceCream/ArtOfIceCream'
import GuestNotes from './components/GuestNotes/GuestNotes'
import Footer from './components/Footer/Footer'
import Ourstory from './components/Ourstory/Ourstory'
import './App.css'
import Enquiry from './components/Enquiry/Enquiry'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'


function App() {
  // Raw progress from frame loader (can jump in bursts)
  const rawProgressRef = useRef(0)
  // Smooth display progress — animated via RAF
  const [displayProgress, setDisplayProgress] = useState(0)
  const displayProgressRef = useRef(0)
  const rafRef = useRef<number>(0)
  const [loaded, setLoaded] = useState(false)

  // RAF loop: eases displayProgress toward rawProgress at a fixed speed
  useEffect(() => {
    const SPEED = 0.4 // % per frame — tune this for perceived smoothness (~60fps ≈ 24 seconds for full 100%)
    const tick = () => {
      const raw = rawProgressRef.current
      const cur = displayProgressRef.current

      if (cur < raw) {
        // Never jump more than SPEED per frame — smooth crawl
        const next = Math.min(cur + SPEED, raw)
        displayProgressRef.current = next
        setDisplayProgress(next)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Called by FrameScrollHero as frames load — just updates the raw target
  const handleProgress = useCallback((pct: number) => {
    rawProgressRef.current = pct
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
    <div className="appWrapper">
      {!loaded && (
        <LoadingScreen
          progress={displayProgress}
          onComplete={handleLoadComplete}
        />
      )}

      <Navbar />
      <FrameScrollHero onLoadProgress={handleProgress} />
      <Categories />
      <Icecreams />
      <Milkshakes />
      <Thickshakes />
      <SeasonalDrops />
      <ArtOfIceCream />
      <GuestNotes />
      <Ourstory />
      <Enquiry />
      <Footer />
    </div>
  )
}

export default App
