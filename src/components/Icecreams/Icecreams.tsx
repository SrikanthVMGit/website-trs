"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Icecreams.module.css";

import blackSesameImg from "../../assets/black_sesame_ice_cream.png";
import rosePistachioImg from "../../assets/rose_pistachio_ice_cream.png";
import coffeePralineImg from "../../assets/coffee_praline_ice_cream.png";

const ICE_CREAM_DATA = [
  {
    id: 1,
    title: "Black Sesame",
    description: "Toasted sesame depth with a smooth nutty finish. Crafted from organic black sesame and whole milk.",
    details: ["Organic Black Sesame", "Whole Milk", "Toasted Sesame Oil", "Pure Cane Sugar"],
    image: blackSesameImg,
  },
  {
    id: 2,
    title: "Rose Pistachio",
    description: "Fragrant floral notes with roasted pistachio crunch. A rare, delicate blend.",
    details: ["Damascus Rose Water", "Iranian Pistachios", "Creamy Base", "Crushed Petals"],
    image: rosePistachioImg,
  },
  {
    id: 3,
    title: "Coffee Praline",
    description: "Roasted coffee folded with brittle praline shards and a touch of sea salt.",
    details: ["Arabica Cold Brew", "Almond Praline", "Sea Salt", "Brown Butter"],
    image: coffeePralineImg,
  },
];

const Icecreams = () => {
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(ICE_CREAM_DATA.map(() => false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // stagger each card by 150ms
            setTimeout(() => {
              setVisible(v => { const n = [...v]; n[i] = true; return n; });
            }, i * 160);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section className={styles.section} id="icecreams">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>— Small Batch</p>
          <h2 className={styles.title}>Ice Creams</h2>
          <p className={styles.subtitle}>Slowly churned for a remarkably clean finish.</p>
        </div>

        <div className={styles.cardsGrid}>
          {ICE_CREAM_DATA.map((item, idx) => (
            <div
              key={item.id}
              ref={el => { cardRefs.current[idx] = el; }}
              className={`${styles.flipCard} ${visible[idx] ? styles.revealed : ''}`}
            >
              <div className={`${styles.flipCardInner} ${flippedId === item.id ? styles.isFlipped : ""}`}>

                {/* FRONT */}
                <div className={styles.cardFront}>
                  <div className={styles.imageContainer} onClick={() => setFlippedId(item.id)}>
                    <img src={item.image} className={styles.image} alt={item.title} />
                    <div className={styles.imageOverlay}>
                      <span className={styles.viewDetails}>Flavor Profile ↗</span>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>
                </div>

                {/* BACK */}
                <div className={styles.cardBack}>
                  <div className={styles.backContent}>
                    <p className={styles.detailHeader}>Flavor Profile</p>
                    <h3 className={styles.backTitle}>{item.title}</h3>
                    <ul className={styles.ingredientsList}>
                      {item.details.map((ing, i) => (
                        <li key={i}>— {ing}</li>
                      ))}
                    </ul>
                    <button
                      className={styles.flipBackBtn}
                      onClick={(e) => { e.stopPropagation(); setFlippedId(null); }}
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Icecreams;