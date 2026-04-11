'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './SeasonalDrops.module.css';

const TOTAL_FRAMES = 50;

const DROPS = [
  {
    num: '01',
    name: 'Sithaphal',
    description: 'Rare custard apple — creamy, floral sweetness with a naturally rich texture. Available only at peak harvest.',
  },
  {
    num: '02',
    name: 'Mango',
    description: 'Sun-ripened Alphonso mangoes, slow-churned into a vibrant tropical expression. Pure, unfiltered summer.',
  },
];

function padFrame(n: number) {
  return n.toString().padStart(3, '0');
}

export default function SeasonalDrops() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0); // fractional, for smooth lerp

  const [loaded, setLoaded] = useState(false);
  const [selectedDrop, setSelectedDrop] = useState(0);

  // ── Preload all frames into memory ──────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    framesRef.current = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${padFrame(i)}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      img.onerror = () => {
        // Still count as done even if some frames 404
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      framesRef.current.push(img);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Scroll → frame index via rAF loop (no React state) ──────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smooth the scroll progress for buttery easing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 28,
    restDelta: 0.0001,
  });

  useEffect(() => {
    let targetFrame = 0;

    const unsubscribe = smoothProgress.onChange((progress) => {
      // Map [0,1] → [0, TOTAL_FRAMES-1]
      targetFrame = Math.min(
        Math.max(progress * (TOTAL_FRAMES - 1), 0),
        TOTAL_FRAMES - 1
      );
    });

    const loop = () => {
      // Lerp current frame toward target — controls smoothness speed
      currentFrameRef.current +=
        (targetFrame - currentFrameRef.current) * 0.25;

      const frameIdx = Math.round(currentFrameRef.current);
      const clampedIdx = Math.min(Math.max(frameIdx, 0), TOTAL_FRAMES - 1);
      const frameImg = framesRef.current[clampedIdx];

      if (imgRef.current && frameImg?.complete) {
        // Direct src assignment — no React state, no GPU texture re-upload
        imgRef.current.src = frameImg.src;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothProgress]);

  // For the progress bar under the image
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} className={styles.seasonalDrops}>
      {/* Sticky viewport — fills the screen as user scrolls */}
      <div className={styles.stickyViewport}>
        <div className={styles.grid}>

          {/* ── LEFT ── */}
          <div className={styles.leftCol}>
            <motion.span
              className={styles.overline}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Seasonal Drops
            </motion.span>

            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              The Limited <em className={styles.accentText}>Series</em>
            </motion.h2>

            <div className={styles.dropsList}>
              {DROPS.map((drop, idx) => (
                <motion.div
                  key={idx}
                  className={`${styles.dropItem} ${selectedDrop === idx ? styles.dropSelected : ''}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                  onClick={() => setSelectedDrop(idx)}
                >
                  <span className={styles.dropNum}>{drop.num}</span>
                  <div className={styles.dropInfo}>
                    <h3 className={styles.dropName}>{drop.name}</h3>
                    <p className={styles.dropDesc}>{drop.description}</p>
                  </div>
                 
                </motion.div>
              ))}
            </div>

            {/* Scroll hint */}
            <motion.div
              className={styles.scrollHint}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <div className={styles.scrollLine} />
              <span>Scroll to reveal</span>
            </motion.div>
          </div>

          {/* ── RIGHT — scroll-scrubbed frame ── */}
          <div className={styles.rightCol}>
            <div className={styles.frameOuter}>
              {/* Loading shimmer */}
              {!loaded && <div className={styles.shimmer} />}

              <img
                ref={imgRef}
                src={`/frames/ezgif-frame-001.jpg`}
                alt="Caramel pour animation"
                className={styles.frameImg}
                style={{ opacity: loaded ? 1 : 0 }}
              />

              {/* Gradient overlay */}
              <div className={styles.frameOverlay} />

              {/* Amber glow */}
              <div className={styles.ambientGlow} />

              {/* Progress bar */}
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressBar}
                  style={{ width: progressWidth }}
                />
              </div>

              {/* Corner label */}
              <div className={styles.frameLabel}>
                <span className={styles.frameLabelDot} />
                Watch it pour
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}