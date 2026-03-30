"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./Thickshakes.module.css";

import chocolateImg from "../../assets/chocolate_hazelnut_shake.png";
import saltedCaramelImg from "../../assets/salted_caramel_shake.png";
import peanutButterImg from "../../assets/peanut_butter_fudge_shake.png";

const data = [
  {
    id: 1,
    title: "Chocolate Hazelnut",
    description: "Dark cocoa meets slow-roasted hazelnut in a thick, indulgent blend with a velvety finish.",
    image: chocolateImg,
  },
  {
    id: 2,
    title: "Salted Caramel",
    description: "Rich caramel folded with hand-harvested fleur de sel — the perfect sweet-salt balance.",
    image: saltedCaramelImg,
  },
  {
    id: 3,
    title: "Peanut Butter Fudge",
    description: "Creamy peanut butter ribboned through a deep chocolate fudge base. Uncompromisingly rich.",
    image: peanutButterImg,
  },
];

const CYCLE = 2600;

const TiltCard = ({ item, active, setActive, isSpotlight }: {
  item: typeof data[0];
  active: number | null;
  setActive: (id: number | null) => void;
  isSpotlight: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 90, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 90, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 20);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * -20);
  };

  const handleLeave = () => {
    setActive(null);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${isSpotlight ? styles.spotlight : ''} ${active && active !== item.id ? styles.blur : ""}`}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(item.id)}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
    >
      {/* Animated underline bar — slides across the bottom when spotlight */}
      {isSpotlight && <div className={styles.activeBar} />}

      <div className={styles.imageContainer}>
        <img src={item.image} className={styles.image} alt={item.title} />
      </div>

      <div className={styles.cardBody}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </motion.div>
  );
};

const Thickshakes = () => {
  const [active, setActive] = useState<number | null>(null);
  const [spotlightIdx, setSpotlightIdx] = useState(0);
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
          <p className={styles.eyebrow}>— Premium Blends</p>
          <h2 className={styles.title}>Thick Shakes</h2>
          <p className={styles.subtitle}>Premium, electric indulgence — no compromise.</p>
        </div>

        <div className={styles.cardsGrid}>
          {data.map((item, idx) => (
            <TiltCard
              key={item.id}
              item={item}
              active={active}
              setActive={(id) => {
                setActive(id);
                if (id !== null) {
                  setSpotlightIdx(idx);
                  if (timerRef.current) clearInterval(timerRef.current);
                } else {
                  startCycle();
                }
              }}
              isSpotlight={idx === spotlightIdx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thickshakes;