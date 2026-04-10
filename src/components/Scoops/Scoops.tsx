"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Scoops.module.css";

import matchaVideo from "../../assets/Matcha_scoop.mp4";
import mangoVideo from "../../assets/Mango_scoop.mp4";
import cheesecakeVideo from "../../assets/New York Cheesecake.mp4";
import seethaphalVideo from "../../assets/Seetapal_scoop.mp4";
import irishCoffeeVideo from "../../assets/Irish Coffee.mp4";
import laddoVideo from "../../assets/Devasthanam Laddo.mp4";

interface ScoopItem {
  id: number;
  title: string;
  description: string;
  video: string;
  price: number;
  image?: string;
}

const data: ScoopItem[] = [
  {
    id: 1,
    title: "Japanese Matcha",
    description: "Ceremonial-grade green tea expertly churned into a rich, earthy, and smooth scoop.",
    video: matchaVideo,
    price: 279,
  },
  {
    id: 2,
    title: "Desi Mango",
    description: "Pure essence of sun-ripened Indian mangoes blended for a vibrant tropical bite.",
    video: mangoVideo,
    price: 249,
  },
  {
    id: 3,
    title: "New York Cheese Cake",
    description: "Cream cheese base swirled with a buttery graham crust for the ultimate dessert.",
    video: cheesecakeVideo,
    price: 329,
  },
  {
    id: 4,
    title: "Seethaphal (seasonal)",
    description: "A seasonal delight capturing the creamy, sweet floral notes of fresh custard apple.",
    video: seethaphalVideo,
    price: 299,
  },
  {
    id: 5,
    title: "Irish Coffee",
    description: "Robust coffee flavors interwoven with caramel and whiskey notes for an elegant treat.",
    video: irishCoffeeVideo,
    price: 349,
  },
  {
    id: 6,
    title: "Devasthanam Laddo",
    description: "Divine sweetness inspired by traditional offerings, bursting with rich ghee textures.",
    video: laddoVideo,
    price: 349,
  },
];

const CYCLE = 2600;

function ScoopCard({
  item,
  isSpotlight,
  revealed,
  onEnter,
  onLeave,
  cardRef,
  videoRef,
  animDelay,
}: {
  item: typeof data[0];
  isSpotlight: boolean;
  revealed: boolean;
  onEnter: () => void;
  onLeave: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
  videoRef: (el: HTMLVideoElement | null) => void;
  animDelay: number;
}) {
  const [quantity, setQuantity] = useState(0);
  const handleAdd = (e: React.MouseEvent) => { e.stopPropagation(); setQuantity(1); };
  const increment = (e: React.MouseEvent) => { e.stopPropagation(); setQuantity((q) => q + 1); };
  const decrement = (e: React.MouseEvent) => { e.stopPropagation(); setQuantity((q) => Math.max(0, q - 1)); };

  const imgRef = useRef<HTMLImageElement>(null);

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
        {item.video ? (
          <video ref={videoRef} src={item.video} className={styles.image} autoPlay muted loop playsInline />
        ) : (
          <img ref={imgRef} src={item.image} alt={item.title} className={styles.image} />
        )}

        {/* Real-time scooping animation overlay */}
        <div className={styles.scoopOverlay}>
          {/* Spoon assembly */}
          <div className={styles.spoon}>
            <div className={styles.spoonBowl} />
            <div className={styles.spoonHandle} />
          </div>
          {/* Ice cream ball that gets lifted */}
          <div className={styles.scoopBall} />
          {/* Drip trails */}
          <div className={`${styles.drip} ${styles.drip1}`} />
          <div className={`${styles.drip} ${styles.drip2}`} />
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.bodyRow}>
          <div className={styles.bodyLeft}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>
          </div>
          <div className={styles.qtyControl}>
            {quantity === 0 ? (
              <button className={styles.addBtn} onClick={handleAdd}>ADD</button>
            ) : (
              <>
                <button aria-label="Decrease" className={styles.qtyBtn} onClick={decrement}>&#8722;</button>
                <span className={styles.qtyVal}>{quantity}</span>
                <button aria-label="Increase" className={styles.qtyBtn} onClick={increment}>+</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Scoops() {
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(data.map(() => false));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Keep videos playing and set speed without forcing time sync which causes stutter */
  useEffect(() => {
    const playInterval = setInterval(() => {
      const vids = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
      vids.forEach((vid) => {
        if (vid.playbackRate !== 0.85) {
          vid.playbackRate = 0.85;
        }
        if (vid.paused) {
          vid.play().catch(() => {});
        }
      });
    }, 250);

    return () => clearInterval(playInterval);
  }, []);


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


  const handleToggle = () => {
    if (!expanded) {
      // Scroll to card 4 (index 3)
      if (trackRef.current) {
        const card = trackRef.current.querySelector('[data-card]') as HTMLElement;
        const cardW = card ? card.offsetWidth + 32 : 320;
        trackRef.current.scrollTo({ left: cardW * 3, behavior: 'smooth' });
      }
    } else {
      // Scroll back to start
      trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setExpanded(!expanded);
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

  /* scroll reveal — re-triggers every time a card enters the track viewport */
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
            // reset so animation replays next time card scrolls in
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
    <section className={styles.section} id="scoops">
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>— Signature Flavours</p>
            <h2 className={styles.title}>Scoops</h2>
            <p className={styles.subtitle}>Our most loved artisanal ice cream scoops, crafted with perfection.</p>
          </div>
          <button className={styles.seeAllBtn} onClick={handleToggle}>
            {expanded ? 'BACK' : 'SEE MORE'} <span>{expanded ? '←' : '→'}</span>
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
              <ScoopCard
                key={item.id}
                item={item}
                isSpotlight={idx === spotlightIdx}
                revealed={revealed[idx]}
                animDelay={idx * 0.8}
                cardRef={(el) => { refs.current[idx] = el; }}
                videoRef={(el) => { videoRefs.current[idx] = el; }}
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
