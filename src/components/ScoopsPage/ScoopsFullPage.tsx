import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Enquiry from '../Enquiry/Enquiry';
import Footer from '../Footer/Footer';

import styles from './ScoopsFullPage.module.css';
import pageStyles from './ScoopsPage.module.css';

// Flavour cards data (V2 Refinement - Professional Images)
import matchaImg from "../../assets/scoops/matcha.png";
import mangoImg from "../../assets/scoops/mango.png";
import cheesecakeImg from "../../assets/scoops/cheesecake.png";
import seethaphalImg from "../../assets/scoops/seethaphal.png";
import irishCoffeeImg from "../../assets/scoops/irish_coffee.png";
import ladooImg from "../../assets/scoops/ladoo.png";

const SCOOP_FLAVOURS = [
  {
    id: 1,
    title: "Japanese Matcha",
    description: "Ceremonial-grade green tea expertly churned into a rich, earthy, and smooth scoop. Our matcha is sourced from the finest tea gardens in Uji, Japan, ensuring an authentic tasting profile.",
    poster: matchaImg,
    isNew: false,
  },
  {
    id: 6,
    title: "Devasthanam Ladoo",
    description: "Divine sweetness inspired by traditional temple offerings, bursting with rich ghee, cardamom, and roasted gram textures reimagined as a luxurious ice cream.",
    poster: ladooImg,
    isNew: false,
  },
  {
    id: 3,
    title: "N.Y. Cheesecake",
    description: "A rich cream cheese base swirled with a buttery graham cracker crust for the ultimate dessert-in-a-scoop experience. Dense, tangy, and impossibly creamy.",
    poster: cheesecakeImg,
    isNew: true,
  },
  {
    id: 4,
    title: "Seethaphal",
    description: "A seasonal delight capturing the creamy, sweet floral notes of fresh custard apple. This rare flavour is available only when the harvest is at its peak.",
    poster: seethaphalImg,
    isNew: true,
  },
  {
    id: 5,
    title: "Irish Coffee",
    description: "Robust cold brew coffee flavors interwoven with rich caramel and subtle whiskey notes for an elegant, sophisticated treat that's unlike anything else.",
    poster: irishCoffeeImg,
    isNew: true,
  },
  {
    id: 2,
    title: "Desi Mango",
    description: "Pure essence of sun-ripened Indian Alphonso mangoes blended for a vibrant, intensely tropical bite. Made only during peak season for the most authentic flavour.",
    poster: mangoImg,
    isNew: false,
  },
];

export default function ScoopsFullPage() {
  const navigate = useNavigate();
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to enquiry section
  const scrollToEnquiry = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Artisanal Scoops — The Rare Scoop';
  }, []);

  // Intersection Observer for flavour cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setTimeout(() => {
              setVisibleIndices((prev) => new Set([...prev, index]));
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    const cards = containerRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.fullPageScrollWrapper}>

      {/* ── Minimal Back Button ── */}
      <div className={pageStyles.navRow}>
        <button className={pageStyles.backBtn} onClick={() => navigate('/')} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <div className={pageStyles.hero} style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Animated Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
            opacity: 0.45
          }}
        >
          <source src="/videos/Luxury.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay for Readability */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)",
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className={pageStyles.eyebrow}>The Full Collection</p>
          <h1 className={pageStyles.heroTitle}>
            All <span className={pageStyles.accent}>Scoops.</span>
          </h1>
          <p className={pageStyles.heroDesc}>
            Every scoop, every swirl, every flavour we've ever dreamed up — the full lineup, right here.
          </p>
          <button className={pageStyles.heroEnquiryBtn} onClick={scrollToEnquiry}>
            Enquire Now
          </button>
          <div className={pageStyles.divider} />
        </div>
      </div>

      {/* ═══════════════ EXPLORER PORTFOLIO (V2 REFINEMENT) ═══════════════ */}
      <div className={pageStyles.gridSection} ref={containerRef}>
        
        <header className={pageStyles.introHeader}>
          <span className={pageStyles.gridEyebrow}>Signature Selection</span>
          <h2 className={pageStyles.gridTitle}>Explorer Portfolio</h2>
          <p className={pageStyles.gridLabel}>
            A curated showcase of our most daring and beloved creations. Each scoop is an artisanal journey through premium ingredients and handcrafted textures.
          </p>
        </header>

        <div className={pageStyles.cardsGrid}>
          {SCOOP_FLAVOURS.map((item, i) => (
            <div
              key={item.id}
              data-index={i}
              className={`${pageStyles.cardWrapper} ${visibleIndices.has(i) ? pageStyles.revealed : ''}`}
            >
              <div className={pageStyles.cardContent}>
                {item.isNew && <span className={pageStyles.badge}>New</span>}
                <div className={pageStyles.imageContainer}>
                  <img
                    src={item.poster}
                    alt={item.title}
                    className={pageStyles.image}
                  />
                  <div className={pageStyles.textOverlay}>
                    <h3 className={pageStyles.cardTitle}>{item.title}</h3>
                    <div className={pageStyles.glassBox}>
                      <p className={pageStyles.cardDesc}>{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ ENQUIRY + FOOTER ═══════════════ */}
      <Enquiry />
      <Footer />
    </div>
  );
}
