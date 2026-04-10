import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SundaesAll.module.css";
import pageStyles from "../ScoopsPage/ScoopsPage.module.css";
import Enquiry from "../Enquiry/Enquiry";
import Footer from "../Footer/Footer";

import midnightBelgianImg from "../../assets/thickshakes/midnight_belgian_silk.png";
import alphonsoMangoImg from "../../assets/thickshakes/alphonso_mango_creamery.png";
import berryVelvetImg from "../../assets/thickshakes/berry_velvet_crush.png";
import darkRoastImg from "../../assets/thickshakes/dark_roast_creamshake.png";

interface ThickshakeItem {
  id: number;
  title: string;
  description: string;
  poster: string;
  isNew?: boolean;
}

const ALL_THICKSHAKES: ThickshakeItem[] = [
  {
    id: 1,
    title: "Midnight Belgian Silk",
    description: "Ultra-dark 72% Belgian cacao meets smooth whipped cream in the most indulgent thickshake we've ever crafted. Every sip is a deep, complex chocolate experience with a lingering silk finish. Made with single-origin Belgian couverture.",
    poster: midnightBelgianImg,
    isNew: true,
  },
  {
    id: 2,
    title: "Alphonso Mango Creamery",
    description: "The king of Indian mangoes, slow-ripened and hand-pureed, folded into the richest cream base. A tropical masterpiece that tastes like golden summer — available only at peak mango season. Pure, honest, irresistible.",
    poster: alphonsoMangoImg,
    isNew: true,
  },
  {
    id: 3,
    title: "Berry Velvet Crush",
    description: "Wild blackberries, Ooty strawberries, and forest raspberries — together they form a deep, jewel-toned velvet shake. Tart, sweet, and beautifully complex. Finished with a real berry compote swirl for that extra burst of freshness.",
    poster: berryVelvetImg,
  },
  {
    id: 4,
    title: "Dark Roast Creamshake",
    description: "A cold brew espresso concentrate, brewed for 24 hours and ribboned through silky full-fat cream. Bold, bitter, creamy — a coffee lover's dream in a glass. The perfect antidote to afternoon slumps, served impossibly thick.",
    poster: darkRoastImg,
  },
];

export default function ThickshakesAllPage() {
  const navigate = useNavigate();
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Thickshakes — The Rare Scoop";
  }, []);

  const scrollToEnquiry = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTimeout(() => {
              setVisibleIndices((prev) => new Set([...prev, index]));
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    const cards = containerRef.current?.querySelectorAll(`.${styles.cardWrapper}`);
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>

      {/* ── Minimal Back Button ── */}
      <div className={pageStyles.navRow}>
        <button className={pageStyles.backBtn} onClick={() => navigate('/')} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* ── Hero ── */}
      <div className={styles.hero} style={{ position: "relative", overflow: "hidden" }}>
        
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
            opacity: 0.55,
          }}
        >
          <source src="/videos/Luxury.mp4" type="video/mp4" />
        </video>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p className={styles.eyebrow}>Premium Blends</p>
          <h1 className={styles.heroTitle}>
            All <span className={styles.accent}>Thick</span>shakes.
          </h1>
          <p className={styles.heroDesc}>
            Impossibly thick, impossibly good. Every blend we've dreamed up — right here.
          </p>
          <button className={pageStyles.heroEnquiryBtn} onClick={scrollToEnquiry}>
            Enquire Now
          </button>
          <div className={styles.divider} />
        </div>
      </div>

      {/* ── Grid ── */}
      <div className={styles.gridSection} ref={containerRef}>
        <p className={styles.gridLabel}>{ALL_THICKSHAKES.length} Blends — pick your indulgence</p>
        <div className={styles.cardsGrid}>
          {ALL_THICKSHAKES.map((item, i) => (
            <div
              key={item.id}
              data-index={i}
              className={`${styles.cardWrapper} ${visibleIndices.has(i) ? styles.revealed : ""}`}
            >
              <div className={styles.cardContent}>
                {item.isNew && <span className={styles.badge}>New</span>}
                <div className={styles.imageContainer}>
                  <img
                    src={item.poster}
                    alt={item.title}
                    className={styles.image}
                  />
                  <div className={styles.textOverlay}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Enquiry + Footer ── */}
      <Enquiry />
      <Footer />
    </div>
  );
}
