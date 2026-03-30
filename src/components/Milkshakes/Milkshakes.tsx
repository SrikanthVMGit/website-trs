"use client";

import styles from "./Milkshakes.module.css";

// Assuming these are valid paths in your project
import strawberryImg from "../../assets/strawberry_cream_milkshake.png";
import vanillaImg from "../../assets/vanilla_malt_milkshake.png";
import coffeeImg from "../../assets/classic_cold_coffee_milkshake.png";

const data = [
  { id: 1, title: "Strawberry Cream", price: 229, image: strawberryImg, color: "pink" },
  { id: 2, title: "Vanilla Malt", price: 219, image: vanillaImg, color: "white" },
  { id: 3, title: "Cold Coffee", price: 249, image: coffeeImg, color: "brown" },
];

const Drip = ({ color }: { color: string }) => (
  <div className={styles.dripWrapper}>
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none" 
      className={`${styles.dripSVG} ${styles[color]}`}
    >
      {/* Modified Path: 
        Instead of L1200,120 L0,120 (filling the bottom),
        it now uses L1200,0 L0,0 (filling the top) so it drips *downward*.
      */}
      <path d="
        M0,40 
        C50,80 100,0 150,40
        C200,80 250,0 300,40
        C350,80 400,0 450,40
        C500,80 550,0 600,40
        C650,80 700,0 750,40
        C800,80 850,0 900,40
        C950,80 1000,0 1050,40
        C1100,80 1150,0 1200,40
        L1200,0 L0,0 Z
      " />
    </svg>
  </div>
);

const Card = ({ item }) => (
  <div className={styles.card}>
    <div className={styles.cardGlow}></div>

    <div className={styles.imageContainer}>
      {/* 🍫 PREMIUM DRIP */}
      <Drip color={item.color} />
      <img src={item.image} alt={item.title} className={styles.image} />
    </div>

    <div className={styles.cardBody}>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>Smooth creamy delight</p>
      
      <div className={styles.cardFooter}>
        <div className={styles.price}>₹{item.price}</div>
        <button className={styles.addToCartBtn}>ADD TO CART</button>
      </div>
    </div>
  </div>
);

export default function Milkshakes() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Milk Shakes</h2>
          <p className={styles.subtitle}>
            Smooth, creamy blends made to refresh
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}