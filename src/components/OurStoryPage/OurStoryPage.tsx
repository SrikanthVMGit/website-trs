import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './OurStoryPage.module.css';
import Enquiry from '../Enquiry/Enquiry';
import Footer from '../Footer/Footer';

/* ─── Chapter data ─────────────────────────────────────── */
const CHAPTERS = [
  {
    year: '2018',
    tag: 'Chapter one',
    title: 'The Spark',
    body: `The Rare Scoop was founded in 2018 as a small artisanal project. Today, it serves thousands of guests and offers a range of premium ice creams crafted with the rarest ingredients. Late nights in a home kitchen, experimenting with saffron, custard apple and garden-fresh cream — this was the beginning.`,
    accent: '#c9935a',
  },
  {
    year: '2019',
    tag: 'Chapter two',
    title: 'First Scoop',
    body: `The first public batch was served from a rented cart at a local Sunday market. By noon, everything had sold out. People came back the following week and brought friends. Word travelled faster than we could churn — we knew we had stumbled onto something uncommon.`,
    accent: '#9a7bc9',
  },
  {
    year: '2020',
    tag: 'Chapter three',
    title: 'Discipline',
    body: `When the world paused, we doubled down. The studio became a laboratory. We sourced ceremonial-grade matcha from Uji and Alphonso mangoes directly from Ratnagiri orchards. Purity became our north star, leading us to reject over 200 batches that didn't meet our exacting standards.`,
    accent: '#5a9ac9',
  },
  {
    year: '2021',
    tag: 'Chapter four',
    title: 'The Studio',
    body: `We opened our first studio — not a shop, but a tasting experience. Marble counters, amber lighting, and jars of estate ingredients. Guests didn't just eat ice cream; they learned the story of every element. It became a sanctuary for craft and dedication.`,
    accent: '#c9a05a',
  },
  {
    year: '2022',
    tag: 'Chapter five',
    title: 'Recognition',
    body: `Food writers, chefs, and curious strangers started talking. Our studio was featured in national publications for its unique approach: "unlike anything you've had before." We remained small on purpose, serving over 50,000 guests with zero compromises on quality.`,
    accent: '#7bc9a0',
  },
  {
    year: 'Today',
    tag: 'Chapter six',
    title: 'Still Rare',
    body: `Every scoop you hold carries years of quiet dedication. We still run the same quality checks, still source from growers we trust, and still churn in small batches. The Rare Scoop has grown, but our intention remains: to preserve the art of true ice cream.`,
    accent: '#c9935a',
  },
];

export default function OurStoryPage() {
  const navigate = useNavigate();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the timeline section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 60%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Story — The Rare Scoop';
  }, []);

  return (
    <div className={styles.page}>
      
      {/* ── Fixed Cinematic Background ── */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className={styles.fixedBgVideo}
      >
        <source src="/videos/sunani.mp4" type="video/mp4" />
      </video>

      {/* ── Page Overlay (for consistency) ── */}
      <div className={styles.pageOverlay} />

      {/* ── Navbar-like Back Button ── */}
      <div className={styles.navRow}>
        <button className={styles.backBtn} onClick={() => navigate('/')} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* ── New Hero Section ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            A Journey of <br />
            <span className={styles.heroAccent}>Purity &amp; Craft</span>
          </h1>
          <p className={styles.heroSubtitle}>
            How two friends turned an obsession with real ingredients into a city's most cherished scoop.
          </p>
        </div>
      </section>

      {/* ── Timeline Section ── */}
      <section className={styles.timelineSection} ref={timelineRef}>
        <div className={styles.timelineContainer}>
          
          {/* Central Vertical Line Container */}
          <div className={styles.centralLineContainer}>
             <div className={styles.centralLineBg} />
             <motion.div 
               className={styles.centralLineGlow}
               style={{ scaleY, originY: 0 }}
             />
          </div>

          {/* Chapter Blocks */}
          {CHAPTERS.map((ch, i) => {
            const isEven = i % 2 !== 0;
            return (
              <div key={ch.year} className={`${styles.timelineItem} ${isEven ? styles.itemRight : styles.itemLeft}`}>
                
                {/* Year Marker */}
                <div className={styles.yearMarker}>
                  <span className={styles.yearText}>{ch.year}</span>
                  <div className={styles.markerLine} style={{ backgroundColor: ch.accent }} />
                  <div className={styles.markerDot} style={{ backgroundColor: ch.accent }} />
                </div>

                {/* Content Card */}
                <div className={styles.contentCard}>
                  <h3 className={styles.chapterTag} style={{ color: ch.accent }}>{ch.tag}</h3>
                  <h2 className={styles.chapterTitle}>{ch.title}</h2>
                  <p className={styles.chapterBody}>{ch.body}</p>
                </div>

                {/* Vertical Dot on central line */}
                <div className={styles.centralDot} style={{ backgroundColor: ch.accent }} />
              </div>
            );
          })}

          {/* Middle Graphic (Churn Icon replacement) */}
          <div className={styles.graphicMiddle}>
             <div className={styles.graphicCircle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="30" height="30">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
             </div>
          </div>

        </div>
      </section>

      {/* ── Transition Section ── */}
      <section className={styles.outro}>
         <div className={styles.outroContent}>
            <h2 className={styles.outroTitle}>The Story Continues...</h2>
            <p className={styles.outroBody}>
               Every batch we make is a new chapter. We invite you to be a part of it.
            </p>
            <button className={styles.ctaBtn} onClick={() => navigate('/menu')}>
              <span>Discover the Menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                 <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
         </div>
      </section>

      <Enquiry />
      <Footer />
    </div>
  );
}
