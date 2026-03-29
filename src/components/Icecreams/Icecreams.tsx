import { useState } from "react";
import styles from "./Icecreams.module.css";

// Assets
import blackSesameImg from "../../assets/black_sesame_ice_cream.png";
import rosePistachioImg from "../../assets/rose_pistachio_ice_cream.png";
import coffeePralineImg from "../../assets/coffee_praline_ice_cream.png";

const ICE_CREAM_DATA = [
  {
    id: 1,
    title: "Black Sesame",
    description: "Toasted sesame depth with a smooth nutty finish.",
    price: 379,
    image: blackSesameImg,
  },
  {
    id: 2,
    title: "Rose Pistachio",
    description: "Fragrant floral notes with roasted pistachio crunch.",
    price: 389,
    image: rosePistachioImg,
  },
  {
    id: 3,
    title: "Coffee Praline",
    description: "Roasted coffee folded with brittle praline shards.",
    price: 369,
    image: coffeePralineImg,
  },
];

const Icecreams = () => {
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
    <section className={styles.section} id="icecreams">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Ice Creams</h2>
            <p className={styles.subtitle}>
              Our full ice cream line, packed perfectly and ready for delivery.
            </p>
          </div>
          <button className={styles.seeAllBtn}>
            See All
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className={styles.cardsGrid}>
        {ICE_CREAM_DATA.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.image}
                loading="lazy"
              />
            </div>
            
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
              
              <div className={styles.priceRow}>
                <span className={styles.price}>₹{item.price}</span>
                <div className={styles.qtyControl}>
                  <button 
                    className={styles.qtyBtn}
                    onClick={() => updateQty(item.id, -1)}
                  >
                    -
                  </button>
                  <span className={styles.qtyValue}>{quantities[item.id]}</span>
                  <button 
                    className={styles.qtyBtn}
                    onClick={() => updateQty(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button className={styles.addToCartBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

export default Icecreams;
