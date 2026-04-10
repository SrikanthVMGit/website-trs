"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./WarmSpecials.module.css";
import { useNavigate } from "react-router-dom";

import brownieImg from "../../assets/brownie_warm.png";
import applePieImg from "../../assets/apple_pie_warm.png";
import halwaImg from "../../assets/halwa_warm.png";
import gulabJamunImg from "../../assets/gulab_jamun_warm.png";

interface WarmItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const data: WarmItem[] = [
  {
    id: 1,
    title: "Sizzling Dark Brownie",
    description: "Indulgent dark chocolate brownie on a hot platter with a cold vanilla scoop.",
    image: brownieImg,
    price: 299,
  },
  {
    id: 2,
    title: "Classic Warm Apple Pie",
    description: "Hand-crafted flaky pastry filled with cinnamon-spiced apples, served warm.",
    image: applePieImg,
    price: 349,
  },
  {
    id: 3,
    title: "Artisanal Gajar Halwa",
    description: "Traditional carrot pudding baked till tender, topped with slivered nuts.",
    image: halwaImg,
    price: 329,
  },
  {
    id: 4,
    title: "Hot Gulab Jamun Duo",
    description: "Amber saffron syrup-soaked balls paired with creamy vanilla bean ice cream.",
    image: gulabJamunImg,
    price: 349,
  },
];

const CYCLE = 2800;

function WarmCard({
  item,
  isSpotlight,
  revealed,
  onEnter,
  onLeave,
  cardRef,
  animDelay,
}: {
  item: WarmItem;
  isSpotlight: boolean;
  revealed: boolean;
  onEnter: () => void;
  onLeave: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
  animDelay: number;
}) {

  return (
    <div
      ref={cardRef}
      data-card
      className={`${styles.card} ${isSpotlight ? styles.spotlight : ""} ${revealed ? styles.revealed : ""}`}
      style={{ '--anim-delay': `${animDelay}s` } as React.CSSProperties}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {isSpotlight && <div className={styles.activeBar} />}

      <div className={styles.imageContainer}>
        {/* Heat Haze Background */}
        <div className={styles.heatHazeOverlay} />
        
        <img src={item.image} alt={item.title} className={styles.image} />

        {/* Steam Animation Layer */}
        <div className={styles.steamContainer}>
            {[...Array(3)].map((_, i) => (
                <div key={i} className={`${styles.steam} ${styles[`steam${i+1}`]}`} />
            ))}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.bodyRow}>
          <div className={styles.bodyLeft}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WarmSpecials() {
  const navigate = useNavigate();
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(data.map(() => false));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  /* drag-to-scroll */
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.clientX - trackRef.current.offsetLeft;
    dragScrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
    trackRef.current.style.cursor = 'grabbing';
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.clientX - trackRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    trackRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    isDragging.current = false;
    trackRef.current.releasePointerCapture(e.pointerId);
    trackRef.current.style.cursor = 'grab';
  };

  const startCycle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSpotlightIdx((i) => (i + 1) % data.length);
    }, CYCLE);
  };

  useEffect(() => {
    startCycle();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!paused) startCycle();
    else if (timerRef.current) clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  /* scroll reveal */
  useEffect(() => {
    if (!trackRef.current) return;
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => {
              const copy = [...prev];
              copy[i] = true;
              return copy;
            });
          } else {
            setRevealed((prev) => {
              const copy = [...prev];
              copy[i] = false;
              return copy;
            });
          }
        },
        { root: trackRef.current, threshold: 0.15 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className={styles.section} id="warm-specials">
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>— Cozy Pairings</p>
            <h2 className={styles.title}>Warm Specials</h2>
            <p className={styles.subtitle}>Our signature hot desserts paired with cold artisanal scoops.</p>
          </div>
          <button className={styles.seeAllBtn} onClick={() => navigate('/warm-specials')}>
             VIEW ALL <span>→</span>
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
              <WarmCard
                key={item.id}
                item={item}
                isSpotlight={idx === spotlightIdx}
                revealed={revealed[idx]}
                animDelay={idx * 0.8}
                cardRef={(el) => { refs.current[idx] = el; }}
                onEnter={() => { setPaused(true); setSpotlightIdx(idx); if (timerRef.current) clearInterval(timerRef.current); }}
                onLeave={() => { setPaused(false); startCycle(); }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
