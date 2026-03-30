"use client";

import React, { useState, useRef, useEffect } from "react";
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

const N = CATEGORIES.length; // 4

export default function Categories() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      const scrolled = -rect.top;          // px scrolled into the section
      const maxScroll = outer.offsetHeight - window.innerHeight; // 4 × 100vh

      if (scrolled <= 0) {
        setActiveIdx(-1);
        return;
      }
      if (scrolled >= maxScroll) {
        setActiveIdx(N - 1);
        return;
      }

      // Each card gets an equal share of the scroll space
      const progress = scrolled / maxScroll;            // 0 → 1
      const idx = Math.min(Math.floor(progress * N), N - 1);
      setActiveIdx(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* ── Outer: 5 × 100vh tall — creates the pin scroll space ── */
    <div ref={outerRef} className={styles.outer}>
      {/* ── Inner: sticks to viewport top while outer scrolls ── */}
      <div className={styles.sticky}>
        <div className={styles.container}>

          {/* Header */}
          <div className={styles.header}>
            <div>
              <p className={styles.eyebrow}>— Our Offerings</p>
              <h2 className={styles.title}>Categories</h2>
              <p className={styles.subtitle}>
                The house favourites, refined and memorable.
              </p>
            </div>
            <button className={styles.seeAllBtn}>SEE ALL <span>→</span></button>
          </div>

          {/* Progress dots */}
          <div className={styles.dots}>
            {CATEGORIES.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
              />
            ))}
          </div>

          {/* Cards grid */}
          <div className={styles.cardsGrid}>
            {CATEGORIES.map((cat, idx) => {
              const isActive = idx === activeIdx;
              const isPast  = idx < activeIdx;
              const isFuture = activeIdx >= 0 && idx > activeIdx;

              return (
                <div
                  key={cat.id}
                  className={[
                    styles.card,
                    isActive  ? styles.cardActive  : '',
                    isPast    ? styles.cardPast     : '',
                    isFuture  ? styles.cardFuture   : '',
                  ].filter(Boolean).join(' ')}
                >
                  <div className={styles.imageContainer}>
                    <img src={cat.img} alt={cat.title} className={styles.image} />
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
            })}
          </div>

          {/* Scroll cue — hidden once animation starts */}
          {activeIdx < 0 && (
            <p className={styles.scrollCue}>↓ scroll to explore</p>
          )}
        </div>
      </div>
    </div>
  );
}