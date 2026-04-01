import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './ArtOfIceCream.module.css';

export default function ArtOfIceCream() {
  const targetRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ripple, setRipple] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const handleToggle = () => {
    if (!videoRef.current) return;

    // ripple trigger
    setRipple(true);
    setTimeout(() => setRipple(false), 500);

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = true; // 🔇 ALWAYS MUTED
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section ref={targetRef} className={styles.section}>
      <div className={styles.container}>

        {/* LEFT */}
        <motion.div style={{ y: yText }}>
          <h2 className={styles.title}>
            Every pint starts with <br />
            <span className={styles.italicTitle}>culinary discipline.</span>
          </h2>
        </motion.div>

        {/* RIGHT VIDEO */}
        <motion.div style={{ y: yImage }} className={styles.imageWrapper}>
          <div className={styles.imgMainWrap}>

            {/* VIDEO */}
            <video
              ref={videoRef}
              className={styles.video}
              src="/videos/Luxury.mp4"
              loop
              playsInline
              muted
            />

            {/* OVERLAY */}
            <div className={styles.playOverlay} onClick={handleToggle}>
              
              {/* Ripple */}
              {ripple && <span className={styles.ripple}></span>}

              {/* Button */}
              <div className={styles.playBtn}>
                {!isPlaying && <div className={styles.playIcon}></div>}
                {isPlaying && <div className={styles.pauseIcon}></div>}
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}