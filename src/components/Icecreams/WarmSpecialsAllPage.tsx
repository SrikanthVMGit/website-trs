import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SundaesAll.module.css";
import pageStyles from "../ScoopsPage/ScoopsPage.module.css";
import Enquiry from "../Enquiry/Enquiry";
import Footer from "../Footer/Footer";

import hotChocolateImg from "../../assets/warm-specials/rare_hot_chocolate.png";

interface WarmItem {
  id: number;
  title: string;
  description: string;
  poster: string;
  isNew?: boolean;
}

const ALL_WARM: WarmItem[] = [
  {
    id: 1,
    title: "The Rare Hot Chocolate",
    description: "A singular, ceremonial-grade experience. Our house-blend of 72% Venezuelan dark cacao and single-origin milk chocolate is slowly melted into full-fat milk, finished with a whisper of Madagascar vanilla, a dusting of 24K gold cacao powder, and a cloud of hand-churned cream. Served piping hot — thick, velvety, and utterly indulgent. The rarest cup in the city.",
    poster: hotChocolateImg,
    isNew: true,
  },
];

export default function WarmSpecialsAllPage() {
  const navigate = useNavigate();
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Warm Specials — The Rare Scoop";
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
        
        {/* Animated Video Background */}
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
            opacity: 0.6
          }}
        >
          <source src="/videos/Luxury.mp4" type="video/mp4" />
        </video>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p className={styles.eyebrow}>Comfort &amp; Warmth</p>
          <h1 className={styles.heroTitle}>
            All <span className={styles.accent}>Warm</span> Specials.
          </h1>
          <p className={styles.heroDesc}>
            The best of both worlds — hot meets cold in our most comforting, crafted creations.
          </p>
          <button className={pageStyles.heroEnquiryBtn} onClick={scrollToEnquiry}>
            Enquire Now
          </button>
          <div className={styles.divider} />
        </div>
      </div>

      {/* ── Grid ── */}
      <div className={styles.gridSection} ref={containerRef}>
        <p className={styles.gridLabel}>1 Signature — crafted with intention</p>
        <div className={styles.cardsGrid} style={{ gridTemplateColumns: "minmax(0, 380px)" }}>
          {ALL_WARM.map((item, i) => (
            <div
              key={item.id}
              data-index={i}
              className={`${styles.cardWrapper} ${visibleIndices.has(i) ? styles.revealed : ""}`}
            >
              <div className={styles.cardContent}>
                {item.isNew && <span className={styles.badge}>Signature</span>}
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
