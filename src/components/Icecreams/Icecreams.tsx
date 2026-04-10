"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Icecreams.module.css";

// Use proper Next.js Image if possible, otherwise keep these imports
import blackSesameImg from "../../assets/black_sesame_ice_cream.png";
import rosePistachioImg from "../../assets/rose_pistachio_ice_cream.png";
import coffeePralineImg from "../../assets/coffee_praline_ice_cream.png";

const ICE_CREAM_DATA = [
  {
    id: 1,
    title: "Black Sesame",
    description: "Toasted sesame depth with a smooth nutty finish.",
    details: ["Organic Black Sesame", "Whole Milk", "Sea Salt"],
    image: blackSesameImg,
  },
  {
    id: 2,
    title: "Rose Pistachio",
    description: "Floral notes with pistachio crunch.",
    details: ["Rose Water", "Roasted Pistachio", "Honey"],
    image: rosePistachioImg,
  },
  {
    id: 3,
    title: "Coffee Praline",
    description: "Coffee + caramel crunch.",
    details: ["Cold Brew Extract", "Almond Praline", "Vanilla"],
    image: coffeePralineImg,
  },
];

export default function Icecreams() {
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            // Stagger effect: delay visibility based on index
            setTimeout(() => {
              setVisibleIndices((prev) => new Set([...prev, index]));
            }, index * 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current?.querySelectorAll(`.${styles.flipCard}`);
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleFlip = (id: number) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>— SMALL BATCH</p>
          <h2 className={styles.title}>Ice Creams</h2>
          <p className={styles.subtitle}>
            Slowly churned for a remarkably clean finish.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {ICE_CREAM_DATA.map((item, i) => (
            <div
              key={item.id}
              data-index={i}
              className={`${styles.flipCard} ${
                visibleIndices.has(i) ? styles.revealed : ""
              }`}
            >
              <div
                className={`${styles.flipCardInner} ${
                  flippedId === item.id ? styles.isFlipped : ""
                }`}
                onClick={() => handleFlip(item.id)}
                role="button"
                tabIndex={0}
                aria-pressed={flippedId === item.id}
                onKeyDown={(e) => e.key === "Enter" && handleFlip(item.id)}
              >
                {/* FRONT */}
                <div className={styles.cardFront}>
                  <div className={styles.imageContainer}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={styles.image} 
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>
                </div>

                {/* BACK */}
                <div className={styles.cardBack}>
                  <h3 className={styles.backTitle}>Ingredients</h3>
                  <ul className={styles.ingredientsList}>
                    {item.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}