import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

import scoopsImg from '../../assets/scoops/Scoops.png';
import sundaesImg from '../../assets/sundaes/sundaes.png';
import thickshakesImg from '../../assets/thickshakes/cat_thickshakes.png';
import warmSpecialsImg from '../../assets/warm-specials/Warm_specials.jpg';

const MENU_ITEMS = [
  {
    id: 1,
    title: "Scoops",
    sub: "Signature flavors",
    img: scoopsImg,
    marquee: "CLASSIC • CHURNED • FRESH •",
    targetId: "scoops",
    route: "/scoops"
  },
  {
    id: 2,
    title: "Sundaes",
    sub: "Loaded treats",
    img: sundaesImg,
    marquee: "DECADENT • RICH • SWEET •",
    targetId: "sundaes",
    route: "/sundaes"
  },
  {
    id: 3,
    title: "Thickshakes",
    sub: "Dessert-style blends",
    img: thickshakesImg,
    marquee: "RICH • THICK • INDULGENT •",
    targetId: "thickshakes",
    route: "/thickshakes"
  },
  {
    id: 4,
    title: "Warm Specials",
    sub: "Comforting classics",
    img: warmSpecialsImg,
    marquee: "COMFORT • WARM • COZY •",
    targetId: "warm-specials",
    route: "/warm-specials"
  },
];

// Detect mobile once at module level
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth <= 768;

export default function Menu() {
  const navigate = useNavigate();
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hoverIdx, setHoverIdx] = useState(-1);

  // ── Desktop: continuous scroll mapping (Fan-out effect) ──────
  useEffect(() => {
    if (IS_MOBILE) return;

    const onScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      let scrolled = -rect.top;

      const maxScroll = outer.offsetHeight - window.innerHeight;

      if (scrolled <= 0) { setProgress(0); return; }
      if (scrolled >= maxScroll) { setProgress(1); return; }

      setProgress(scrolled / maxScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Shared card renderer ─────────────────────────────────────
  const renderCard = (cat: typeof MENU_ITEMS[0], idx: number) => {
    // Make the fan out happen a little faster (complete by 80% scroll)
    const p = Math.min(1, progress * 1.25);

    const spreadOffsetsX = [160, 54, -54, -160];
    const spreadRotations = [-12, -4, 4, 12];
    const spreadTranslateY = [30, 10, 10, 30];

    const currentX = spreadOffsetsX[idx] * (1 - p);
    const currentY = spreadTranslateY[idx] * (1 - p);
    const currentRot = spreadRotations[idx] * (1 - p);

    const isHovered = hoverIdx === idx;
    const isDimmed = hoverIdx !== -1 && hoverIdx !== idx && (IS_MOBILE || p === 1);

    let finalScale = 1 - 0.05 * (1 - p); // slightly scaled down when stacked
    let finalY = currentY;
    let finalRot = currentRot;

    if (isHovered && (IS_MOBILE || p === 1)) {
      finalScale = IS_MOBILE ? 1 : 1.05;
      finalY -= IS_MOBILE ? 0 : 15; // pop out
      finalRot = 0; // straighten
    } else if (isDimmed) {
      finalScale = IS_MOBILE ? 1 : 0.96; // slightly recede
    }

    const transformStyle = !IS_MOBILE
      ? `translateX(${currentX}%) translateY(${finalY}px) rotate(${finalRot}deg) scale(${finalScale})`
      : 'none';

    return (
      <div
        key={cat.id}
        className={[
          styles.card,
          isHovered && (IS_MOBILE || p === 1) ? styles.cardHovered : '',
          isDimmed ? styles.cardDimmed : ''
        ].filter(Boolean).join(' ')}
        style={{
          transform: transformStyle,
          zIndex: isHovered ? 20 : (MENU_ITEMS.length - idx),
        }}
        onMouseEnter={() => setHoverIdx(idx)}
        onMouseLeave={() => setHoverIdx(-1)}
        onClick={() => {
          navigate(cat.route);
        }}
      >
        <div className={styles.imageContainer}>
          <img src={cat.img} alt={cat.title} className={styles.image} loading="lazy" />
        </div>

        <div className={styles.cardLabel}>
          <h3>{cat.title}</h3>
          <p>{cat.sub}</p>
        </div>

        <div className={styles.marqueeOverlay}>
          <div className={styles.marqueeInner}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.marqueePart}>
                <span>{cat.marquee}</span>
                <div className={styles.marqueeCircle} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── MOBILE: simple static section, no scroll tricks ─────────
  if (IS_MOBILE) {
    return (
      <section className={styles.mobileSection} id="menu">
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <p className={styles.eyebrow}>— Our Menu</p>
              <h2 className={styles.title}>Menu</h2>
              <p className={styles.subtitle}>Our complete collection of frozen treats.</p>
            </div>
          </div>
          <div className={styles.mobileGrid}>
            {MENU_ITEMS.map((cat, idx) => renderCard(cat, idx))}
          </div>
        </div>
      </section>
    );
  }

  // ── DESKTOP: sticky scroll-driven reveal ─────────────────────
  return (
    <div ref={outerRef} className={styles.outer} id="menu">
      <div className={styles.sticky}>
        <div className={styles.container}>

          <div className={styles.header}>
            <div>
              <p className={styles.eyebrow}>— Our Menu</p>
              <h2 className={styles.title}>Menu</h2>
              <p className={styles.subtitle}>Our complete collection of frozen treats.</p>
            </div>
            <button className={styles.seeAllBtn} onClick={() => navigate('/menu')}>SEE FULL MENU</button>
          </div>

          <div className={styles.dots}>
            {MENU_ITEMS.map((_, i) => {
              const p = Math.min(1, progress * 1.25);
              let activeDot = Math.min(Math.floor(p * MENU_ITEMS.length), MENU_ITEMS.length - 1);

              // Override active dot if the user is hovering over a specific card
              if (hoverIdx >= 0) {
                activeDot = hoverIdx;
              }

              return (
                <div
                  key={i}
                  className={`${styles.dot} ${i === activeDot ? styles.dotActive : ''}`}
                />
              );
            })}
          </div>

          <div className={styles.cardsGrid}>
            {MENU_ITEMS.map((cat, idx) => renderCard(cat, idx))}
          </div>

          <p className={styles.scrollCue} style={{ opacity: Math.max(0, 1 - progress * 2) }}>↓ scroll to spread out</p>
        </div>
      </div>
    </div>
  );
}
