import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Footer.module.css'
import rarelogo from '../../assets/common/rarelogo.png'
import swiggyImg from '../../assets/common/footerlogos/swiggy.png'
import zomatoImg from '../../assets/common/footerlogos/zomato.png'

/* ── Social Icon SVG Components ── */

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
)

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
)

export default function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      {/* Background Lighting matched to Enquiry */}
      <div className={styles.bgBlob} aria-hidden="true" />

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
        </div>

        {/* ── Shop Column ── */}
        <div className={styles.linksCol}>
          <h3 className={styles.colTitle}>SHOP</h3>
          <ul className={styles.linkList}>
            <li><span className={styles.linkAnchor} onClick={() => navigate('/scoops')}>Scoops</span></li>
            <li><span className={styles.linkAnchor} onClick={() => navigate('/sundaes')}>Sundaes</span></li>
            <li><span className={styles.linkAnchor} onClick={() => navigate('/thickshakes')}>Thickshakes</span></li>
            <li><span className={styles.linkAnchor} onClick={() => navigate('/warm-specials')}>Warm Specials</span></li>
            <li><span className={styles.linkAnchor} onClick={() => navigate('/ourstory')}>Our Story</span></li>
          </ul>
        </div>

        {/* ── Order From Column ── */}
        <div className={styles.orderCol}>
          <h3 className={styles.colTitle}>ORDER FROM</h3>
          <div className={styles.orderLogos}>
            <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer" className={styles.orderLogoLink}>
              <img src={swiggyImg} alt="Swiggy" className={styles.partnerLogo} />
            </a>
            <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer" className={styles.orderLogoLink}>
              <img src={zomatoImg} alt="Zomato" className={styles.partnerLogo} />
            </a>
          </div>
        </div>

        {/* ── Serving Areas Column (Previously Support) ── */}
        <div className={styles.linksCol}>
          <h3 className={styles.colTitle}>SERVING AREAS</h3>
          <ul className={styles.linkList}>
            <li><span className={styles.areaItem}>Rajajinagar</span></li>
            <li><span className={styles.areaItem}>Vijayanagar</span></li>
            <li><span className={styles.areaItem}>Malleswaram</span></li>
            <li><span className={styles.areaItem}>Mahalakshmi Layout</span></li>
            <li><span className={styles.areaItem}>Nandini Layout</span></li>
            <li><span className={styles.areaItem}>Basaveshwaranagar</span></li>
          </ul>
        </div>

        {/* ── Connect Column ── */}
        <div className={styles.connectCol}>
          <h3 className={styles.colTitle}>CONNECT</h3>
          <div className={styles.socialIcons}>
            <a href="https://www.instagram.com/therare_scoop?igsh=bmpkcnAydDBqZDBo" target="_blank" rel="noopener noreferrer" className={styles.socialRow} aria-label="Instagram">
              <span className={`${styles.socialBadge} ${styles.instagram}`}><InstagramIcon /></span>
              <span className={styles.socialLabel}>Instagram</span>
            </a>
            <a href="mailto:hello@therarescoop.com" className={styles.socialRow} aria-label="Email">
              <span className={`${styles.socialBadge} ${styles.gmail}`}><GmailIcon /></span>
              <span className={styles.socialLabel}>Gmail</span>
            </a>
          </div>
        </div>

        {/* ── Map Column ── */}
        <div className={styles.mapCol}>
          <h3 className={styles.colTitle}>OUR LOCATION</h3>
          <a
            href="https://www.google.com/maps/search/Rajajinagar,+Vijayanagar,+Malleswaram,+Bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            <div className={styles.mapWrapper}>
              <iframe
                title="The Rare Scoop — Bengaluru"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31103.54134803!2d77.530!3d12.980!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3df24d777d8b%3A0xe7a5c71b149b4c0!2sRajajinagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1617000000000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.mapIframe}
              />
              <div className={styles.mapOverlay}>
                <span>Open in Maps ↗</span>
              </div>
            </div>
          </a>
          <p className={styles.mapAddress}>📍 Bengaluru (West &amp; Central)</p>
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
