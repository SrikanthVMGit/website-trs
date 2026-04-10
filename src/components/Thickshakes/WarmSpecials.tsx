import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./WarmSpecials.module.css";
import hotChocolateImg from "../../assets/warm-specials/rare_hot_chocolate.png";

export default function WarmSpecials() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="warm-specials" ref={sectionRef}>
      <div className={styles.container}>

        {/* Header row */}
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 12 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              — Heat &amp; Soul
            </motion.p>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Warm Specials
            </motion.h2>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              A singular hot creation — crafted for those who seek comfort without compromise.
            </motion.p>
          </div>

          <motion.button
            className={styles.seeAllBtn}
            onClick={() => navigate("/warm-specials")}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            SEE MORE <span>→</span>
          </motion.button>
        </div>

        {/* Feature Card */}
        <div className={styles.featureWrap}>
          <motion.div
            className={styles.featureCard}
            initial={{ opacity: 0, y: 40 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left: Image */}
            <div className={styles.imagePanel}>
              <div className={styles.imagePanelInner}>
                <img
                  src={hotChocolateImg}
                  alt="The Rare Hot Chocolate"
                  className={styles.featureImg}
                />
                <div className={styles.imageOverlay} />
                <div className={styles.steamWrap}>
                  <div className={styles.steam} />
                  <div className={styles.steam} style={{ animationDelay: "0.4s" }} />
                  <div className={styles.steam} style={{ animationDelay: "0.8s" }} />
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className={styles.infoPanel}>
              <span className={styles.signatureBadge}>Signature</span>
              <h3 className={styles.productTitle}>The Rare<br />Hot Chocolate</h3>
              <p className={styles.productDesc}>
                A ceremonial-grade experience. 72% Venezuelan dark cacao melted into full-fat milk,
                finished with Madagascar vanilla and a cloud of hand-churned cream.
                Thick, velvety, and utterly indulgent.
              </p>

              <div className={styles.dividerLine} />

              <div className={styles.tagsRow}>
                <span className={styles.tag}>Single-Origin Cacao</span>
                <span className={styles.tag}>Served Hot</span>
                <span className={styles.tag}>Limited Daily</span>
              </div>

              <button className={styles.enquireBtn} onClick={() => navigate("/warm-specials")}>
                SEE DETAILS →
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
