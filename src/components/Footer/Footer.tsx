import { useState } from 'react'
import styles from './Footer.module.css'
import rarelogo from '../../assets/rarelogo.png'

/* ── SVG Icon Components ── */

const SwiggyLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
    <path d="M50 10C29 10 12 27 12 48c0 8 2.5 15.5 6.8 21.5C24 77 32 82 41 83.5c1.5.3 3 .5 4.5.5H55c1.5 0 3-.2 4.5-.5C68 82 76 77 81.2 69.5 85.5 63.5 88 56 88 48 88 27 71 10 50 10z" fill="white" fillOpacity="0.15"/>
    <path d="M63 34c0-7.2-5.8-13-13-13s-13 5.8-13 13c0 5.1 2.9 9.5 7.2 11.7l-1 5.8L37 47l-1.5 8.5 9-4 1.5-8.5-3.2-1.8C40.5 39.5 39 36.9 39 34c0-6.1 4.9-11 11-11s11 4.9 11 11c0 4-2.1 7.5-5.3 9.5l1.8 3.5C62 44.2 63 39.3 63 34z" fill="white"/>
    <path d="M50 56c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 10.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" fill="white"/>
  </svg>
)

const ZomatoLogo = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
    <path d="M20 28h60v8L42 72h40v8H18v-8l38-36H20z" fill="white"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
)

/* ── Wave Border ── */
const WaveTop = () => (
  <div className={styles.waveTop} aria-hidden="true">
    <svg viewBox="0 0 1440 54" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,27 C180,54 360,0 540,27 C720,54 900,0 1080,27 C1260,54 1380,18 1440,27 L1440,54 L0,54 Z"
        fill="#221a12"
      />
      <path
        d="M0,20 C200,45 400,0 600,22 C800,44 1000,2 1200,20 C1320,30 1400,14 1440,20 L1440,0 L0,0 Z"
        fill="rgba(201,147,90,0.06)"
      />
    </svg>
  </div>
)

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>

      {/* ── Wavy top border ── */}
      <WaveTop />

      <div className={styles.container}>

        {/* ── Brand Column ── */}
        <div className={styles.brandCol}>
          <div className={styles.logoRow}>
            <img src={rarelogo} alt="The Rare Scoop" className={styles.logoImg} />
            <span className={styles.brandName}>The Rare Scoop</span>
          </div>
          <p className={styles.brandTagline}>Crafted with care, delivered with love.</p>
          <p className={styles.brandDesc}>
            Premium ice cream from a cloud kitchen designed for gifting, discovery, and indulgent delivery moments.
          </p>

          {/* Newsletter */}
          <div className={styles.newsletter}>
            <p className={styles.newsletterLabel}>🍦 Get early access to seasonal drops</p>
            {subscribed ? (
              <p className={styles.subscribedMsg}>✓ You're on the list! We'll be in touch.</p>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
              </form>
            )}
          </div>
        </div>

        {/* ── Shop Column ── */}
        <div className={styles.linksCol}>
          <h3 className={styles.colTitle}>SHOP</h3>
          <ul className={styles.linkList}>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Our Story</a></li>
          </ul>
        </div>

        {/* ── Order From Column ── */}
        <div className={styles.orderCol}>
          <h3 className={styles.colTitle}>ORDER FROM</h3>
          <div className={styles.orderLogos}>
            <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer" className={styles.orderLogoLink}>
              <div className={styles.swiggyIcon}>
                <SwiggyLogo />
                <span>Swiggy</span>
              </div>
            </a>
            <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer" className={styles.orderLogoLink}>
              <div className={styles.zomatoIcon}>
                <ZomatoLogo />
                <span>Zomato</span>
              </div>
            </a>
          </div>
        </div>

        {/* ── Support Column ── */}
        <div className={styles.linksCol}>
          <h3 className={styles.colTitle}>SUPPORT</h3>
          <ul className={styles.linkList}>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Delivery &amp; Zones</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* ── Connect Column ── */}
        <div className={styles.connectCol}>
          <h3 className={styles.colTitle}>CONNECT</h3>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialRow} aria-label="Facebook">
              <span className={`${styles.socialBadge} ${styles.facebook}`}><FacebookIcon /></span>
              <span className={styles.socialLabel}>Facebook</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialRow} aria-label="Instagram">
              <span className={`${styles.socialBadge} ${styles.instagram}`}><InstagramIcon /></span>
              <span className={styles.socialLabel}>Instagram</span>
            </a>
            <a href="mailto:hello@therarescoop.com" className={styles.socialRow} aria-label="Email">
              <span className={`${styles.socialBadge} ${styles.gmail}`}><GmailIcon /></span>
              <span className={styles.socialLabel}>Gmail</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialRow} aria-label="YouTube">
              <span className={`${styles.socialBadge} ${styles.youtube}`}><YoutubeIcon /></span>
              <span className={styles.socialLabel}>YouTube</span>
            </a>
          </div>
        </div>

        {/* ── Map Column ── */}
        <div className={styles.mapCol}>
          <h3 className={styles.colTitle}>OUR LOCATION</h3>
          <a
            href="https://maps.google.com/?q=Bengaluru,Karnataka,India"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            <div className={styles.mapWrapper}>
              <iframe
                title="The Rare Scoop — Bengaluru"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497695.0147481042!2d77.35073!3d12.95428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1617000000000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.mapIframe}
              />
              <div className={styles.mapOverlay}>
                <span>Open in Maps ↗</span>
              </div>
            </div>
          </a>
          <p className={styles.mapAddress}>📍 Bengaluru, Karnataka, India</p>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>© 2025 The Rare Scoop. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
          </div>
          <button className={styles.backToTop} onClick={scrollToTop} aria-label="Back to top">
            <ArrowUpIcon />
            <span>Back to top</span>
          </button>
        </div>
      </div>

    </footer>
  )
}
