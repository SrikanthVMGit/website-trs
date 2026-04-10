import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Icecreams.module.css";

import sundaeVideo1 from "../../assets/sundaes/Ice_Cream_Sundae_In_a_dramatic_macro-cinematic_style_warm_rfadOEVo.mp4";
import sundaeVideo2 from "../../assets/sundaes/motion2Fast_Ultrarealistic_cinematic_closeup_sequence_of_an_ar_0-2.mp4";
import sundaeVideo3 from "../../assets/sundaes/Ice_Cream_Sundae_A_spoon_drizzles_mango_sauce_over_scoops_of_4RRWdq1Y.mp4";
import sundaeVideo4 from "../../assets/sundaes/Ice_Cream_Sundae_A_dessert_bowl_filled_with_two_scoops_of_ice_hMaK4T57.mp4";

import berryBlissImg from "../../assets/sundaes/berry_bliss_sundae.png";
import sithaphalRoyalImg from "../../assets/sundaes/sithaphal_royal_delight.png";
import royalChocImg from "../../assets/sundaes/royal_chocolate_overload.png";
import belgianNutImg from "../../assets/sundaes/belgian_nut_indulgence.png";

const SUNDAE_DATA = [
  { id: 1, title: "Berry Bliss Sundae", description: "Wild berries, berry compote, whipped cream.", video: sundaeVideo1, poster: berryBlissImg },
  { id: 2, title: "Sithaphal Royal Delight", description: "Custard apple ice cream, gold dust.", video: sundaeVideo2, poster: sithaphalRoyalImg },
  { id: 3, title: "Royal Chocolate Overload", description: "Dark choc, brownie, fudge drizzle.", video: sundaeVideo3, poster: royalChocImg },
  { id: 4, title: "Belgian Nut Indulgence", description: "Belgian choc, praline, hazelnut brittle.", video: sundaeVideo4, poster: belgianNutImg },
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
    <section className={styles.section} id="sundaes">
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
                onClick={() => navigate("/sundaes")}
                style={{ cursor: "pointer" }}
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