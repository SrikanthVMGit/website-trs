"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Icecreams.module.css";

import blackSesameImg from "../../assets/black_sesame_ice_cream.png";
import rosePistachioImg from "../../assets/rose_pistachio_ice_cream.png";
import coffeePralineImg from "../../assets/coffee_praline_ice_cream.png";

const ICE_CREAM_DATA = [
  {
    id: 1,
    title: "Black Sesame",
    description: "Toasted sesame depth with a smooth nutty finish.",
    details: ["Organic Black Sesame", "Whole Milk", "Toasted Sesame Oil", "Pure Cane Sugar"],
    price: 379,
    image: blackSesameImg,
  },
  {
    id: 2,
    title: "Rose Pistachio",
    description: "Fragrant floral notes with roasted pistachio crunch.",
    details: ["Damascus Rose Water", "Iranian Pistachios", "Creamy Base", "Crushed Petals"],
    price: 389,
    image: rosePistachioImg,
  },
  {
    id: 3,
    title: "Coffee Praline",
    description: "Roasted coffee folded with brittle praline shards.",
    details: ["Arabica Cold Brew", "Almond Praline", "Sea Salt", "Brown Butter"],
    price: 369,
    image: coffeePralineImg,
  },
];

const Icecreams = () => {
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const handleFlip = (id: number | null) => {
    setFlippedId(id);
  };

  return (
    <section className={styles.section} id="icecreams">
      <div className={styles.container}>
        <div className={styles.header}>
            <h2 className={styles.title}>Ice Creams</h2>
        </div>

        <div className={styles.cardsGrid}>
          {ICE_CREAM_DATA.map((item) => (
            <div key={item.id} className={styles.flipCard}>
              <div className={`${styles.flipCardInner} ${flippedId === item.id ? styles.isFlipped : ""}`}>
                
                {/* FRONT SIDE */}
                <div className={styles.cardFront}>
                  <div className={styles.imageContainer} onClick={() => handleFlip(item.id)}>
                    <img src={item.image} className={styles.image} alt={item.title} />
                  </div>
                  
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                    
                    <div className={styles.priceRow}>
                      <span className={styles.price}>₹{item.price}</span>
                      <button 
                        className={styles.detailsBtn} 
                        onClick={() => handleFlip(item.id)}
                      >
                        Details ↗
                      </button>
                    </div>

                    <button className={styles.addToCartBtn}>ADD TO CART</button>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className={styles.cardBack}>
                  <div className={styles.backContent}>
                    <p className={styles.detailHeader}>Flavor Profile</p>
                    <h3 className={styles.backTitle}>{item.title}</h3>
                    <ul className={styles.ingredientsList}>
                      {item.details.map((ing, i) => (
                        <li key={i}>• {ing}</li>
                      ))}
                    </ul>
                    
                    {/* FIXED BUTTON */}
                    <button 
                      className={styles.flipBackBtn} 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents bubbling
                        handleFlip(null);
                      }}
                    >
                      ← Back to Flavor
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