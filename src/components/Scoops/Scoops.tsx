"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Scoops.module.css";
// import ScoopsFullPage from "../ScoopsFullPage/ScoopsFullPage";

import matchaVideo from "../../video/Matcha video.mp4";

import seethaphalVideo from "../../video/Seethapal video.mp4";
import irishCoffeeVideo from "../../video/Iris coffee video.mp4";
import ladooVideo from "../../video/Devasthanam ladoo video.mp4";

interface ScoopItem {
  id: number;
  title: string;
  description: string;
  video: string;
  price: number;
  image?: string;
  position?: string;
  scale?: number;
}

const data: ScoopItem[] = [
  {
    id: 1,
    title: "Japanese Matcha",
    description: "Ceremonial-grade green tea churned into a rich, earthy, smooth scoop.",
    video: matchaVideo,
    price: 279,
    position: "center center",
  },
  {
    id: 2,
    title: "Irish Coffee",
    description: "Rich roasted coffee blended flawlessly into a creamy dream.",
    video: irishCoffeeVideo,
    price: 289,
    position: "center center",
  },
  {
    id: 3,
    title: "Devasthanam Ladoo",
    description: "An auspicious blend of pure ghee, cardamom, and divine heritage in every bite.",
    video: ladooVideo,
    price: 319,
    position: "center center",
  },
  {
    id: 4,
    title: "Seethaphal (seasonal)",
    description: "Creamy and sweet floral notes of fresh custard apple.",
    video: seethaphalVideo,
    price: 299,
    position: "center 60%",
  }
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
  const imgRef = useRef<HTMLImageElement>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.playbackRate = 0.85;
    }
  }, []);

  const handleMouseEnter = () => {
    onEnter();
    if (localVideoRef.current) {
      localVideoRef.current.play().catch(() => console.error("Playback failed"));
    }
  };

  const handleMouseLeave = () => {
    onLeave();
    if (localVideoRef.current) {
      localVideoRef.current.pause();
    }
  };

  return (
    <div
      ref={cardRef}
      data-card
      className={`${styles.card} ${isSpotlight ? styles.spotlight : ""} ${revealed ? styles.revealed : ""}`}
      style={{ '--anim-delay': `${animDelay}s` } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isSpotlight && <div className={styles.activeBar} />}

      <div className={styles.imageContainer}>
        {item.video ? (
          <video
            ref={(el) => {
              localVideoRef.current = el;
              videoRef(el);
            }}
            src={item.video}
            className={styles.image}
            style={{
              objectPosition: item.position || 'center 30%',
              '--scale-base': item.scale || 1
            } as React.CSSProperties}
            muted
            loop
            playsInline
          />
        ) : (
          <img
            ref={imgRef}
            src={item.image}
            alt={item.title}
            className={styles.image}
            style={{
              objectPosition: item.position || 'center 30%',
              '--scale-base': item.scale || 1
            } as React.CSSProperties}
          />
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
        </div>
      </div>
    </div>
  );
}

export default function Scoops() {
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(data.map(() => false));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
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


  const handleToggle = () => {
    navigate("/scoops");
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
    <>
      <section className={styles.section} id="scoops">
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <div className={styles.header}>
              <p className={styles.eyebrow}>— Signature Flavours</p>
              <h2 className={styles.title}>Scoops</h2>
              <p className={styles.subtitle}>Our most loved artisanal ice cream scoops, crafted with perfection.</p>
            </div>
            <button className={styles.seeAllBtn} onClick={handleToggle}>
              SEE MORE
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
    </>
  );
}