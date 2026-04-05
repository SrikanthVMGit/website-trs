import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import rarelogo from '../../assets/rarelogo.png'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  // Close menu on scroll
  useEffect(() => {
    if (isScrolled) setMenuOpen(false)
  }, [isScrolled])

  return (
    <>
      {/* Invisible SVG definition for the clip-path */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="navbarDrip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V0.7 C0.95,0.73 0.92,0.85 0.9,0.9 C0.88,0.95 0.85,0.98 0.82,0.9 C0.79,0.82 0.77,0.75 0.75,0.7 C0.73,0.65 0.7,0.65 0.68,0.75 C0.66,0.85 0.64,1 0.61,0.92 C0.58,0.84 0.56,0.75 0.53,0.7 C0.5,0.65 0.47,0.65 0.45,0.75 C0.43,0.85 0.41,0.95 0.38,0.88 C0.35,0.81 0.33,0.72 0.3,0.68 C0.27,0.64 0.24,0.66 0.22,0.78 C0.2,0.9 0.17,1 0.14,0.91 C0.11,0.82 0.08,0.73 0.05,0.75 C0.02,0.77 0,0.7 0,0.7 Z," />
          </clipPath>
        </defs>
      </svg>

      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>

        {/* ── Left: nav links ── */}
        <div className={styles.navLeft}>
          <button className={styles.navLink} onClick={() => scrollTo('menu')}>Menu</button>
          <button className={styles.navLink} onClick={() => scrollTo('categories')}>Collections</button>
          <button className={styles.navLink} onClick={() => scrollTo('our-story-2')}>Our Story</button>
        </div>

        {/* ── Centre: logo ── */}
        <div className={styles.navLogo}>
          <img src={rarelogo} alt="The Rare Scoop" className={styles.logoImg} />
          <span className={styles.logoText}>The Rare Scoop</span>
        </div>

        {/* ── Right: enquiry pill + hamburger ── */}
        <div className={styles.navRight}>
          <button className={styles.enquiryBtn} onClick={() => scrollTo('enquiry')}>Enquiry</button>

          {/* Hamburger — mobile only */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        <button className={styles.mobileLink} onClick={() => scrollTo('menu')}>Menu</button>
        <button className={styles.mobileLink} onClick={() => scrollTo('categories')}>Collections</button>
        <button className={styles.mobileLink} onClick={() => scrollTo('our-story-2')}>Our Story</button>
        <button className={styles.mobileLink} onClick={() => scrollTo('enquiry')}>Enquiry</button>
      </div>
    </>
  )
}
