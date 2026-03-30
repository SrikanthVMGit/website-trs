"use client";

import React from "react";
import styles from "./Categories.module.css";

const CATEGORIES = [
  { 
    id: 1, 
    title: "Categories", 
    sub: "Browse by format", 
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800", 
    marquee: "EXPLORE ALL • EXPLORE ALL •" 
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
    title: "Ice Creams", 
    sub: "Signature pints", 
    img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800", 
    marquee: "COLD • CHURNED • SWEET •" 
  },
];

const Categories = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Categories</h2>
            <p className={styles.subtitle}>
              The house favourites, refined and memorable. Slowly churned for a remarkably clean finish.
            </p>
          </div>
          <button className={styles.seeAllBtn}>
            SEE ALL <span>→</span>
          </button>
        </div>

        <div className={styles.cardsGrid}>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className={styles.card}>
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
                      <div className={styles.marqueeCircle}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;