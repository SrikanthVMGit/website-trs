"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Categories.module.css";

const CATEGORIES = [
  {
    id: 1,
    title: "Ice Creams",
    sub: "Signature pints",
    img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800",
    marquee: "COLD • CHURNED • SWEET •"
  },
  {
    id: 2,
    title: "Milk Shakes",
    sub: "Classic & airy",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800",
    marquee: "CREAMY • SMOOTH • FRESH •"
  },
  {
    id: 3,
    title: "Thick Shakes",
    sub: "Dessert-style blends",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800",
    marquee: "RICH • THICK • INDULGENT •"
  },
  {
    id: 4,
    title: "Categories",
    sub: "Browse by format",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800",
    marquee: "EXPLORE ALL • EXPLORE ALL •"
  },
];

const N = CATEGORIES.length;

// Detect mobile once at module level
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth <= 768;

export default function Categories() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const hoverActiveRef = useRef<number>(-1); // -1 = no hover override
  const scrollRequestRef = useRef<number | null>(null);

  // ── Scroll-driven highlight: optimized with RAF (works on all devices) ───────────────────────
  useEffect(() => {
    const updateActiveIdx = () => {
      // If a card is being hovered, keep that highlight — don't override it
      if (hoverActiveRef.current >= 0) return;

      const outer = outerRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      const scrolled = -rect.top;
      const maxScroll = outer.offsetHeight - window.innerHeight;

      if (scrolled <= 0) { setActiveIdx(-1); return; }
      if (scrolled >= maxScroll) { setActiveIdx(N - 1); return; }

      const progress = scrolled / maxScroll;
      const idx = Math.min(Math.floor(progress * N), N - 1);
      setActiveIdx(idx);
    };

    const onScroll = () => {
      // Use RAF for smooth 60fps updates on all devices including mobile
      if (scrollRequestRef.current !== null) {
        cancelAnimationFrame(scrollRequestRef.current);
      }
      
      scrollRequestRef.current = requestAnimationFrame(() => {
        updateActiveIdx();
        scrollRequestRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveIdx();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRequestRef.current !== null) {
        cancelAnimationFrame(scrollRequestRef.current);
      }
    };
  }, []);

  // ── Hover: snap highlight instantly, no forced scroll ───────
  const scrollToCard = useCallback((idx: number) => {
    hoverActiveRef.current = idx;
    setActiveIdx(idx);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverActiveRef.current = -1;
    // Let the scroll listener re-sync the highlight after mouse leaves
    if (!IS_MOBILE) {
      const outer = outerRef.current;
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const scrolled = -rect.top;
      const maxScroll = outer.offsetHeight - window.innerHeight;
      if (scrolled <= 0) { setActiveIdx(-1); return; }
      if (scrolled >= maxScroll) { setActiveIdx(N - 1); return; }
      const progress = scrolled / maxScroll;
      setActiveIdx(Math.min(Math.floor(progress * N), N - 1));
    } else {
      setActiveIdx(-1);
    }
  }, []);

  // ── Shared card renderer ─────────────────────────────────────
  const renderCard = (cat: typeof CATEGORIES[0], idx: number) => {
    const isActive = idx === activeIdx;
    const isPast   = idx < activeIdx;
    const isFuture = activeIdx >= 0 && idx > activeIdx;

    return (
      <div
        key={cat.id}
        className={[
          styles.card,
          isActive ? styles.cardActive  : '',
          isPast   ? styles.cardPast    : '',
          isFuture ? styles.cardFuture  : '',
        ].filter(Boolean).join(' ')}
        onMouseEnter={() => scrollToCard(idx)}
        onMouseLeave={handleMouseLeave}
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

  // ── Unified render: sticky scroll on all devices (desktop + mobile) ─────────────────────
  return (
    <div ref={outerRef} className={`${styles.outer} ${IS_MOBILE ? styles.outerMobile : ''}`} id="categories">
      <div className={styles.sticky}>
        <div className={styles.container}>

          <div className={styles.header}>
            <div>
              <p className={styles.eyebrow}>— Our Offerings</p>
              <h2 className={styles.title}>Categories</h2>
              <p className={styles.subtitle}>The house favourites, refined and memorable.</p>
            </div>
            {!IS_MOBILE && <button className={styles.seeAllBtn}>SEE ALL <span>→</span></button>}
          </div>

          <div className={styles.dots}>
            {CATEGORIES.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
              />
            ))}
          </div>

          <div className={`${styles.cardsGrid} ${IS_MOBILE ? styles.cardsGridMobile : ''}`}>
            {CATEGORIES.map((cat, idx) => renderCard(cat, idx))}
          </div>

          {activeIdx < 0 && (
            <p className={styles.scrollCue}>↓ scroll to explore</p>
          )}
        </div>
      </div>
    </div>
  );
}