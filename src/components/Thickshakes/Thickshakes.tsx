"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./Thickshakes.module.css";

import midnightBelgianImg from "../../assets/thickshakes/midnight_belgian_silk.png";
import alphonsoMangoImg from "../../assets/thickshakes/alphonso_mango_creamery.png";
import berryVelvetImg from "../../assets/thickshakes/berry_velvet_crush.png";
import darkRoastImg from "../../assets/thickshakes/dark_roast_creamshake.png";

const data = [
  {
    id: 1,
    title: "Midnight Belgian Silk",
    description: "Ultra-dark Belgian cacao meets velvety cream in a thick, indulgent blend with a silk finish that lingers.",
    image: midnightBelgianImg,
    dripColor: "#1a0a05",
  },
  {
    id: 2,
    title: "Alphonso Mango Creamery",
    description: "Sun-ripened Alphonso mangoes pureed into the richest cream — a tropical classic that tastes like summer.",
    image: alphonsoMangoImg,
    dripColor: "#e6900a",
  },
  {
    id: 3,
    title: "Berry Velvet Crush",
    description: "A symphony of mixed berries — blackberries, strawberries, raspberries — crushed into a deep, velvety cream blend.",
    image: berryVelvetImg,
    dripColor: "#8b1a6b",
  },
  {
    id: 4,
    title: "Dark Roast Creamshake",
    description: "Cold brew espresso ribboned through silky cream — for those who take their coffee seriously.",
    image: darkRoastImg,
    dripColor: "#2c1a0a",
  },
];

const CYCLE = 2600;

const TiltCard = ({ item, active, setActive, isSpotlight, revealed, cardRef }: {
  item: typeof data[0];
  active: number | null;
  setActive: (id: number | null) => void;
  isSpotlight: boolean;
  revealed: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
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
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        cardRef(el);
      }}
      className={`${styles.card} ${isSpotlight ? styles.spotlight : ''} ${active && active !== item.id ? styles.blur : ""} ${revealed ? styles.revealed : ""}`}
      style={{ rotateX, rotateY, cursor: 'pointer' }}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(item.id)}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
    >
      {/* Animated underline bar — slides across the bottom when spotlight */}
      {isSpotlight && <div className={styles.activeBar} />}

      {/* Milkshake-style drip overlay on hover */}
      <div
        className={styles.dripOverlay}
        style={{ '--drip-color': item.dripColor } as React.CSSProperties}
      >
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <path
            fill="var(--drip-color)"
            d="M0,0 L200,0 L200,40 C190,40 185,95 175,95 C165,95 160,30 150,30 C140,30 135,100 125,100 C115,100 110,40 100,40 C90,40 85,95 75,95 C65,95 60,30 50,30 C40,30 35,100 25,100 C15,100 10,40 0,40 Z"
          />
        </svg>
      </div>

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
  const navigate = useNavigate();
  const [active, setActive] = useState<number | null>(null);
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(data.map(() => true));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

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

  /* scroll reveal */
  useEffect(() => {
    if (!trackRef.current) return;
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setRevealed(prev => {
            const copy = [...prev];
            copy[i] = entry.isIntersecting;
            return copy;
          });
        },
        { root: trackRef.current, threshold: 0.15 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* drag-to-scroll */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX - trackRef.current.offsetLeft;
    dragScrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
    trackRef.current.style.cursor = 'grabbing';
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.clientX - trackRef.current.offsetLeft;
    const distance = Math.abs(x - dragStartX.current);
    if (distance > 10) {
      hasDragged.current = true;
    }
    trackRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.2;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    isDragging.current = false;
    trackRef.current.releasePointerCapture(e.pointerId);
    trackRef.current.style.cursor = 'grab';
  };

  const handleToggle = () => {
    navigate("/thickshakes");
  };

  return (
    <section className={styles.section} id="thickshakes">
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>— Premium Blends</p>
            <h2 className={styles.title}>Thick Shakes</h2>
            <p className={styles.subtitle}>Premium, electric indulgence — no compromise.</p>
          </div>
          <button className={styles.seeAllBtn} onClick={handleToggle}>
            SEE MORE <span>→</span>
          </button>
        </div>

        <div className={styles.scrollWrapper}>
          <div
            className={styles.scrollTrack}
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {data.map((item, idx) => (
              <TiltCard
                key={item.id}
                item={item}
                active={active}
                revealed={revealed[idx]}
                cardRef={(el) => { cardRefs.current[idx] = el; }}
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
      </div>
    </section>
  );
};

export default Thickshakes;