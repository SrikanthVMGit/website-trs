import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SundaesAll.module.css";
import pageStyles from "../ScoopsPage/ScoopsPage.module.css";
import Enquiry from "../Enquiry/Enquiry";
import Footer from "../Footer/Footer";

import chocHazelnutImg from "../../assets/thickshakes/chocolate_hazelnut_shake.png";
import saltedCaramelImg from "../../assets/thickshakes/salted_caramel_shake.png";
import peanutButterImg from "../../assets/thickshakes/peanut_butter_fudge_shake.png";
import strawberryCreamImg from "../../assets/milkshakes/strawberry_cream_milkshake.png";

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
    title: "Chocolate Hazelnut",
    description: "Dark cocoa meets slow-roasted hazelnut in a thick, indulgent blend with a velvety finish. Made with 72% Ecuadorian cacao and Piedmont hazelnuts, this is the ultimate rich reward.",
    poster: chocHazelnutImg,
    isNew: true,
  },
  {
    id: 2,
    title: "Salted Caramel",
    description: "Rich caramel folded with hand-harvested fleur de sel from the Camargue coast — the perfect sweet-salt balance. Every sip hits differently.",
    poster: saltedCaramelImg,
    isNew: true,
  },
  {
    id: 3,
    title: "Peanut Butter Fudge",
    description: "Creamy Skippy-grade peanut butter ribboned through a deep chocolate fudge base. Uncompromisingly rich. Perfect for those who don't do things halfway.",
    poster: peanutButterImg,
  },
  {
    id: 4,
    title: "Strawberry Cream",
    description: "Sun-kissed strawberries blended into a lush, cloud-like cream — delicately sweet and fresh. Made with real Ooty strawberries at peak season.",
    poster: strawberryCreamImg,
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
