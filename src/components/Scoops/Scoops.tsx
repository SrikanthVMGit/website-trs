import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Scoops.module.css";

import matchaVideo from "../../video/Matcha video.mp4";
import seethaphalVideo from "../../video/Seethapal video.mp4";
import irishCoffeeVideo from "../../video/Iris coffee video.mp4";
import laddoVideo from "../../video/Devasthanam ladoo video.mp4";

const SCOOP_DATA = [
  {
    id: 1,
    title: "Japanese Matcha",
    description: "Ceremonial-grade green tea churned into a rich, earthy, smooth scoop.",
    video: matchaVideo,
  },
  {
    id: 2,
    title: "Irish Coffee",
    description: "Rich roasted coffee blended flawlessly into a creamy dream.",
    video: irishCoffeeVideo,
  },
  {
    id: 3,
    title: "Devasthanam Ladoo",
    description: "An auspicious blend of pure ghee, cardamom, and divine heritage in every bite.",
    video: laddoVideo,
  },
  {
    id: 4,
    title: "Seethaphal (seasonal)",
    description: "Creamy and sweet floral notes of fresh custard apple.",
    video: seethaphalVideo,
  }
];

export default function Scoops() {
  const navigate = useNavigate();
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTimeout(() => {
              setVisibleIndices((prev) => new Set([...prev, index]));
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = containerRef.current?.querySelectorAll(`.${styles.cardWrapper}`);
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    videoRefs.current[id]?.play().catch(() => {});
  };

  const handleMouseLeave = (id: number) => {
    setHoveredId(null);
    const video = videoRefs.current[id];
    if (video) { video.pause(); video.currentTime = 0; }
  };

  return (
    <section className={styles.section} id="scoops">
      <div className={styles.container} ref={containerRef}>
        <div className={styles.topRow}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>— Signature Flavours</p>
            <h2 className={styles.title}>Scoops</h2>
            <p className={styles.subtitle}>
              Our most loved artisanal ice cream scoops, crafted with perfection.
            </p>
          </div>
          <button className={styles.seeAllBtn} onClick={() => navigate("/ScoopsPage")}>SEE ALL →</button>
        </div>

        <div className={styles.cardsGrid}>
          {SCOOP_DATA.map((item, i) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={i}
                data-index={i}
                className={`${styles.cardWrapper} ${visibleIndices.has(i) ? styles.revealed : ""}`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
                onClick={() => navigate("/ScoopsPage")}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.imageContainer}>
                    {item.video && (
                      <video
                        ref={(el) => { videoRefs.current[item.id] = el; }}
                        src={item.video}
                        className={`${styles.image} ${isHovered ? styles.videoHovered : ""}`}
                        muted loop playsInline
                      />
                    )}
                    <div className={styles.textOverlay}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardDesc}>{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
