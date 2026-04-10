"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Milkshakes.module.css";

import strawberryImg from "../../assets/milkshakes/strawberry_cream_milkshake.png";
import vanillaImg from "../../assets/milkshakes/vanilla_malt_milkshake.png";
import coffeeImg from "../../assets/milkshakes/classic_cold_coffee_milkshake.png";

const data = [
  { id: 1, title: "Strawberry Cream", image: strawberryImg, colorClass: styles.pink, description: "Light, fruity, and irresistibly smooth — made with real strawberries.", accent: "#ff4d4d" },
  { id: 2, title: "Vanilla Malt", image: vanillaImg, colorClass: styles.white, description: "A classic malt shake with pure Madagascar vanilla and a silky finish.", accent: "#fff" },
  { id: 3, title: "Cold Coffee", image: coffeeImg, colorClass: styles.brown, description: "Bold Arabica cold brew meets whole-milk cream for a balanced kick.", accent: "#8b4513" },
];

type DripOverlayProps = {
  colorClass: string;
};

const DripOverlay = ({ colorClass }: DripOverlayProps) => (
  <div className={`${styles.dripOverlay} ${colorClass}`}>
    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
      <path
        fill="var(--drip-color)"
        d="M0,0 L200,0 L200,40 
        C190,40 185,95 175,95 C165,95 160,30 150,30 
        C140,30 135,100 125,100 C115,100 110,40 100,40 
        C90,40 85,95 75,95 C65,95 60,30 50,30 
        C40,30 35,100 25,100 C15,100 10,40 0,40 Z"
      />
    </svg>
  </div>
);

export default function Milkshakes() {
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(data.map(() => false));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const startCycle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSpotlightIdx((i) => (i + 1) % data.length);
    }, 6000);
  };

  useEffect(() => {
    startCycle();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  /* scroll reveal */
  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setRevealed((prev) => {
                const copy = [...prev];
                copy[i] = true;
                return copy;
              });
            }, i * 150);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
    });
  }, []);

  useEffect(() => {
    if (!paused) {
      startCycle();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [paused]);

  return (
    <section className={styles.section} id="milkshakes">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>— Airy & Light</p>
          <h2 className={styles.title}>Milk Shakes</h2>
        </div>
        <div className={styles.cardsGrid}>
          {data.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => { refs.current[idx] = el; }}
              className={`${styles.card} ${idx === spotlightIdx ? styles.spotlight : ''} ${revealed[idx] ? styles.revealed : ''}`}
              style={{ '--accent': item.accent } as React.CSSProperties}
              onMouseEnter={() => { setPaused(true); setSpotlightIdx(idx); if (timerRef.current) clearInterval(timerRef.current); }}
              onMouseLeave={() => { setPaused(false); startCycle(); }}
            >
              <DripOverlay colorClass={item.colorClass} />

              <div className={styles.imageContainer}>
                <img src={item.image} alt={item.title} className={styles.image} />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}