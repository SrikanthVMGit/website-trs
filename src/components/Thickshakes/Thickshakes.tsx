import { useState } from "react";
import styles from "./Thickshakes.module.css";

// Assets
import chocolateImg from "../../assets/chocolate_hazelnut_shake.png";
import saltedCaramelImg from "../../assets/salted_caramel_shake.png";
import peanutButterImg from "../../assets/peanut_butter_fudge_shake.png";

const SHAKE_DATA = [
  {
    id: 1,
    title: "Chocolate Hazelnut",
    description: "Dark cocoa, toasted hazelnut, and dense velvet texture.",
    price: 289,
    image: chocolateImg,
  },
  {
    id: 2,
    title: "Salted Caramel",
    description: "Buttery caramel depth balanced with a clean sea-salt finish.",
    price: 279,
    image: saltedCaramelImg,
  },
  {
    id: 3,
    title: "Peanut Butter Fudge",
    description: "Creamy peanut butter base with ribbons of rich dark fudge.",
    price: 299,
    image: peanutButterImg,
  },
];

const Thickshakes = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    1: 1,
    2: 1,
    3: 1,
  });

  const updateQty = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + delta),
    }));
  };

  return (
    <section className={styles.section} id="thickshakes">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Thick Shakes</h2>
            <p className={styles.subtitle}>
              Dessert-first blends with luxurious body. <br />
              Built to be spoonable treats.
            </p>
          </div>
          <button className={styles.seeAllBtn}>
            SEE ALL
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className={styles.cardsGrid}>
        {SHAKE_DATA.map((shake) => (
          <div key={shake.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={shake.image}
                alt={shake.title}
                className={styles.image}
                loading="lazy"
              />
            </div>
            
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{shake.title}</h3>
              <p className={styles.cardDesc}>{shake.description}</p>
              
              <div className={styles.priceRow}>
                <span className={styles.price}>₹ {shake.price}</span>
                <div className={styles.qtyControl}>
                  <button 
                    className={styles.qtyBtn}
                    onClick={() => updateQty(shake.id, -1)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className={styles.qtyValue}>{quantities[shake.id]}</span>
                  <button 
                    className={styles.qtyBtn}
                    onClick={() => updateQty(shake.id, 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className={styles.addToCartBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default Thickshakes;
