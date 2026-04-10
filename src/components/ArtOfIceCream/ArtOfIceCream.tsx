import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './ArtOfIceCream.module.css';

const STEPS = [
  { n: '01', t: 'Sourcing', d: 'Estate vanilla, saffron & single-origin cacao' },
  { n: '02', t: 'Batching', d: 'Micro-volume churns, controlled to the second' },
  { n: '03', t: 'Cold-Chain', d: 'Precision-cooled from studio to your door' },
] as const;

export default function ArtOfIceCream() {
  const targetRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={targetRef} className={styles.section}>
      <div className={styles.blob} />
      <div className={styles.grain} />

      <div className={styles.container}>

        {/* ════ LEFT — Content ════ */}
        <motion.div style={{ y: yText }}>

          {/* Eyebrow */}
          <motion.p
            className={styles.overline}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            The Art of Ice Cream
          </motion.p>

          {/* Headline — word stagger */}
          <motion.h2
            className={styles.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {['Every', 'pint', 'begins'].map((w) => (
              <motion.span
                key={w}
                style={{ display: 'inline-block', marginRight: '0.2em' }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className={styles.accentTitle}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              with discipline.
            </motion.span>
          </motion.h2>

          {/* Supporting line */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We don't take shortcuts. Every batch is made in small quantities,
            using ingredients sourced directly from growers — because the difference
            between good ice cream and extraordinary ice cream lives in the details.
          </motion.p>

          {/* Glass card */}
          <motion.div
            className={styles.glassCard}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <p className={styles.description}>
              The Rare Scoop operates like a tasting studio. Ingredients are flown in
              from estates across Madagascar, Iran, and Oaxaca. Churn times are dialled
              to the second. Every recipe passes a twelve-point quality check before
              it ever reaches a pint.
            </p>

            {/* Step grid */}
            <div className={styles.stepGrid}>
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  className={styles.miniStep}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.32 + i * 0.1 }}
                  whileHover="hovered"
                >
                  <span className={styles.miniNum}>{step.n}</span>
                  <span className={styles.miniTitle} style={{ position: 'relative', display: 'inline-block' }}>
                    {step.t}
                    <motion.span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        bottom: -3, left: 0, right: 0,
                        height: 1,
                        background: '#C19348',
                        display: 'block',
                        originX: 0,
                        scaleX: 0,
                      }}
                      variants={{ hovered: { scaleX: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } } }}
                    />
                  </span>
                  <motion.span
                    className={styles.miniDesc}
                    initial={{ opacity: 0.3, y: 4 }}
                    variants={{ hovered: { opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.04 } } }}
                  >
                    {step.d}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}


        </motion.div>

        {/* ════ RIGHT — Video ════ */}
        <motion.div style={{ y: yImage }} className={styles.imageWrapper}>
          <div className={styles.imgMainWrap}>

            <video
              ref={videoRef}
              className={styles.video}
              src="/videos/Luxury.mp4"
              loop
              playsInline
              muted
              autoPlay
            />

          </div>

          {/* Gold corner */}
          <div className={styles.frameDecoration} aria-hidden="true" />

          {/* Floating label */}
          <div className={styles.floatingTag}>
            <span className={styles.floatingTagSub}>Crafted by hand</span>
            <span className={styles.floatingTagMain}>The Studio</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}