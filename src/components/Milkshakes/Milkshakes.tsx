"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Milkshakes.module.css";

import strawberryImg from "../../assets/strawberry_cream_milkshake.png";
import vanillaImg from "../../assets/vanilla_malt_milkshake.png";
import coffeeImg from "../../assets/classic_cold_coffee_milkshake.png";

const data = [
  {
    id: 1,
    title: "Strawberry Cream",
    description: "Light, fruity, and irresistibly smooth — made with real strawberries and fresh cream.",
    image: strawberryImg,
    color: "pink",
    accent: "#ff8fa3",
  },
  {
    id: 2,
    title: "Vanilla Malt",
    description: "A classic malt shake with pure Madagascar vanilla and a silky, nostalgic finish.",
    image: vanillaImg,
    color: "white",
    accent: "#f5ede3",
  },
  {
    id: 3,
    title: "Cold Coffee",
    description: "Bold Arabica cold brew meets whole-milk cream for a perfectly balanced coffee shake.",
    image: coffeeImg,
    color: "brown",
    accent: "#8b5e3c",
  },
];

const CYCLE = 2400;

const Drip = ({ color }: { color: string }) => (
  <div className={styles.dripWrapper}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`${styles.dripSVG} ${styles[color]}`}>
      <path d="M0,40 C50,80 100,0 150,40 C200,80 250,0 300,40 C350,80 400,0 450,40 C500,80 550,0 600,40 C650,80 700,0 750,40 C800,80 850,0 900,40 C950,80 1000,0 1050,40 C1100,80 1150,0 1200,40 L1200,0 L0,0 Z" />
    </svg>
  </div>
);

export default function Milkshakes() {
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSpotlightIdx(i => (i + 1) % data.length);
    }, CYCLE);
  };

  useEffect(() => {
    startCycle();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>— Airy &amp; Light</p>
          <h2 className={styles.title}>Milk Shakes</h2>
          <p className={styles.subtitle}>Smooth, creamy blends made to refresh.</p>
        </div>

        <div className={styles.cardsGrid}>
          {data.map((item, idx) => (
            <div
              key={item.id}
              className={`${styles.card} ${idx === spotlightIdx ? styles.spotlight : ''}`}
              style={{ '--accent': item.accent } as React.CSSProperties}
              onMouseEnter={() => { setPaused(true); setSpotlightIdx(idx); if (timerRef.current) clearInterval(timerRef.current); }}
              onMouseLeave={() => { setPaused(false); startCycle(); }}
            >
              <div className={styles.imageContainer}>
                <Drip color={item.color} />
                <img src={item.image} alt={item.title} className={styles.image} />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>

              {/* Spotlight glow ring */}
              <div className={styles.glowRing} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}