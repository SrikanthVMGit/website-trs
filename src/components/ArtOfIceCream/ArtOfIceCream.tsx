import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './ArtOfIceCream.module.css';
import chefImg from '../../assets/chef_crafting_ice_cream_1774726396131.png';

export default function ArtOfIceCream() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Parallax offsets
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [-2, 5]);

  return (
    <section ref={targetRef} className={styles.section} id="art-of-ice-cream">
      {/* Animated Background Elements */}
      <div className={styles.blob} />
      
      <div className={styles.container}>
        <motion.div style={{ y: yText }} className={styles.content}>
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.18em" }}
            transition={{ duration: 1 }}
            className={styles.overline}
          >
            THE ART OF ICE CREAM
          </motion.span>
          
          <h2 className={styles.title}>
            Every pint starts with <br/>
            <span className={styles.italicTitle}>culinary discipline.</span>
          </h2>

          <div className={styles.glassCard}>
            <p className={styles.description}>
              The Rare Scoop operates like a tasting studio: ingredients are sourced globally, churn times are controlled precisely, and every recipe is tuned for clean finish.
            </p>
            
            <div className={styles.stepGrid}>
              {[
                { n: "01", t: "Sourcing", d: "Estate vanilla & saffron." },
                { n: "02", t: "Batching", d: "Micro-volume control." },
                { n: "03", t: "Cold-Chain", d: "Precision dispatch." }
              ].map((step, i) => (
                <div key={i} className={styles.miniStep}>
                  <span className={styles.miniNum}>{step.n}</span>
                  <h4 className={styles.miniTitle}>{step.t}</h4>
                </div>
              ))}
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className={styles.ctaBtn}
          >
            <span>EXPLORE THE STUDIO</span>
          </motion.button>
        </motion.div>

        <motion.div 
          style={{ y: yImage, rotate: rotateImage }}
          className={styles.imageWrapper}
        >
          <div className={styles.frameDecoration} />
          <img src={chefImg} alt="Chef" className={styles.image} />
          <div className={styles.floatingTag}>CRAFTED BY HAND</div>
        </motion.div>
      </div>
    </section>
  );
}