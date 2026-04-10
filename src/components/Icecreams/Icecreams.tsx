import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Icecreams.module.css";

import sundaeVideo1 from "../../assets/Ice_Cream_Sundae_In_a_dramatic_macro-cinematic_style_warm_rfadOEVo.mp4";
import sundaeVideo2 from "../../assets/motion2Fast_Ultrarealistic_cinematic_closeup_sequence_of_an_ar_0-2.mp4";
import sundaeVideo3 from "../../assets/Ice_Cream_Sundae_A_spoon_drizzles_mango_sauce_over_scoops_of_4RRWdq1Y.mp4";
import sundaeVideo4 from "../../assets/Ice_Cream_Sundae_A_dessert_bowl_filled_with_two_scoops_of_ice_hMaK4T57.mp4";

const SUNDAE_DATA = [
  { id: 1, title: "Choco-vanilla Swirl", description: "a classic.", video: sundaeVideo1, poster: "https://i.pinimg.com/736x/b0/5d/bc/b05dbc63f7ef32d2317b6abe2b605188.jpg" },
  { id: 2, title: "Strawberry Bliss", description: "a timeless favorite.", video: sundaeVideo2, poster: "https://i.pinimg.com/736x/dd/cb/52/ddcb527d006a25df92213fffcd848a8d.jpg" },
  { id: 3, title: "Mango Tango", description: "a tropical twist.", video: sundaeVideo3, poster: "https://i.pinimg.com/736x/72/07/72/7207724a35e0d8c7f9b072f2c28b060e.jpg" },
  { id: 4, title: "Blueberry Dream", description: "a refreshing twist.", video: sundaeVideo4, poster: "https://i.pinimg.com/736x/32/c4/9a/32c49aa4ef3db1a84c6a2f77854c528a.jpg" },
  
];

export default function Icecreams() {
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
    <section className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.topRow}>
          <div className={styles.header}>
            <h2 className={styles.title}>Sundaes</h2>
            <p className={styles.subtitle}>
              Our signature pints, now in a new format — premium, electric indulgence with no compromise.
            </p>
          </div>
          <button className={styles.seeAllBtn} onClick={() => navigate("/sundaes")}>SEE ALL →</button>
        </div>

        <div className={styles.cardsGrid}>
          {SUNDAE_DATA.map((item, i) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={i}
                data-index={i}
                className={`${styles.cardWrapper} ${visibleIndices.has(i) ? styles.revealed : ""}`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.imageContainer}>
                    <img
                      src={item.poster}
                      alt={item.title}
                      className={`${styles.image} ${isHovered && item.video ? styles.posterHidden : ""}`}
                    />
                    {item.video && (
                      <video
                        ref={(el) => { videoRefs.current[item.id] = el; }}
                        src={item.video}
                        className={`${styles.image} ${styles.videoEl} ${isHovered ? styles.videoVisible : ""}`}
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