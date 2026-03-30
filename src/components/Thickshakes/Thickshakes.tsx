"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./Thickshakes.module.css";

import chocolateImg from "../../assets/chocolate_hazelnut_shake.png";
import saltedCaramelImg from "../../assets/salted_caramel_shake.png";
import peanutButterImg from "../../assets/peanut_butter_fudge_shake.png";

/* Data */
const data = [
  {
    id: 1,
    title: "Chocolate Hazelnut",
    description: "Dark cocoa, hazelnut blend",
    price: 289,
    image: chocolateImg,
  },
  {
    id: 2,
    title: "Salted Caramel",
    description: "Sweet caramel + salt",
    price: 279,
    image: saltedCaramelImg,
  },
  {
    id: 3,
    title: "Peanut Butter Fudge",
    description: "Rich peanut butter mix",
    price: 299,
    image: peanutButterImg,
  },
];

/* 🔥 Tilt Card Component */
const TiltCard = ({ item, active, setActive }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 90, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 90, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Smooth premium tilt
    const rX = ((mouseY / rect.height) - 0.5) * -20;
    const rY = ((mouseX / rect.width) - 0.5) * 20;

    x.set(rY);
    y.set(rX);
  };

  const handleLeave = () => {
    setActive(null);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${
        active && active !== item.id ? styles.blur : ""
      } ${active === item.id ? styles.active : ""}`}
      style={{
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(item.id)}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
    >
      {/* Image */}
      <div className={styles.imageContainer}>
        <img src={item.image} className={styles.image} alt={item.title} />
      </div>

      {/* Content */}
      <div className={styles.cardBody}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span>₹ {item.price}</span>

        <button className={styles.addBtn}>
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

/* 🔥 Main Component */
const Thickshakes = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "2.8rem",
              color: "#f5ede3",
              marginBottom: "10px",
            }}
          >
            Thick Shakes
          </h2>
          <p style={{ color: "#c9935a" }}>
            Premium, Electric Indulgence
          </p>
        </div>

        {/* Cards */}
        <div className={styles.cardsGrid}>
          {data.map((item) => (
            <TiltCard
              key={item.id}
              item={item}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Thickshakes;