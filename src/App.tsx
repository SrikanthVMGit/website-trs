import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import ScoopsFullPage from './components/ScoopsPage/ScoopsFullPage'
import MenuPage from './components/MenuPage/MenuPage'
import { useState, useCallback, useRef, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import FrameScrollHero from './components/Hero/FrameScrollHero'
import Thickshakes from './components/Thickshakes/Thickshakes'
import ScoopsShowcase, { ALL_FLAVOURS } from './components/Scoops/ScoopsShowcase'
import Menu from './components/Menu/Menu'
import SeasonalDrops from './components/SeasonalDrops/SeasonalDrops'
import ArtOfIceCream from './components/ArtOfIceCream/ArtOfIceCream'
import GuestNotes from './components/GuestNotes/GuestNotes'
import Footer from './components/Footer/Footer'
import Ourstory from './components/Ourstory/Ourstory'
import OurStory2 from './components/ourstory2/ourstory2'
import Enquiry from './components/Enquiry/Enquiry'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import SundaesAll from './components/Icecreams/SundaesAll'
import ThickshakesAllPage from './components/Icecreams/ThickshakesAllPage'
import WarmSpecialsAllPage from './components/Icecreams/WarmSpecialsAllPage'
import WarmSpecials from './components/Thickshakes/WarmSpecials'
import OurStoryPage from './components/OurStoryPage/OurStoryPage'
import './App.css'
import Icecreams from './components/Icecreams/Icecreams'

function MainContent() {
  const location = useLocation()
  const rawProgressRef = useRef(0)
  const [displayProgress, setDisplayProgress] = useState(0)
  const displayProgressRef = useRef(0)
  const rafRef = useRef<number>(0)
  const lastTickRef = useRef<number>(0)
  const [loaded, setLoaded] = useState(false)
  const isFirstRenderRef = useRef(true)

  // Ensure page starts at top on mount and prevent browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // If this is the first render, scroll to top; otherwise scroll to final hero frame
    if (isFirstRenderRef.current) {
      window.scrollTo(0, 0);
      isFirstRenderRef.current = false;
    } else {
      // Scroll to final hero frame (95% of 300vh)
      const heroEndScroll = window.innerHeight * 3 * 0.95;
      setTimeout(() => {
        window.scrollTo(0, heroEndScroll);
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const BASE_SPEED = 120
    const CATCH_UP = 0.2
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

  const handleProgress = useCallback((pct: number) => {
    rawProgressRef.current = Math.max(rawProgressRef.current, pct)
  }, [])

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
    document.body.style.overflow = ''
  }, [])

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
      <Menu />
      <ScoopsShowcase flavours={ALL_FLAVOURS} showViewAll={true} />
      <Icecreams />
      <Thickshakes />
      <WarmSpecials />
      <SeasonalDrops />
      <ArtOfIceCream />
      <GuestNotes />
      <OurStory2 />
      <Ourstory />
      <Enquiry />
      <Footer />
    </div>
  )
}

function App() {
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/sundaes" element={<SundaesAll />} />
      <Route path="/scoops" element={<ScoopsFullPage onBack={() => navigate(-1)} />} />
      <Route path="/thickshakes" element={<ThickshakesAllPage />} />
      <Route path="/warm-specials" element={<WarmSpecialsAllPage />} />
      <Route path="/ourstory" element={<OurStoryPage />} />
      <Route path="/ScoopsPage" element={<ScoopsFullPage onBack={() => navigate('/')} />} />
      <Route path="/menu" element={<MenuPage />} />
    </Routes>
  )
}

export default App
