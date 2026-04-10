/**
 * ScoopsShowcase — home page Scoops section.
 *
 * Uses the EXACT same splitSection layout as ScoopsFullPage.tsx
 * (sidebar + stage, ScoopsFullPage.module.css) but wrapped in a
 * sticky-scroll outer so scroll cycles through flavours 1-by-1.
 *
 * After the last flavour the outer ends and the page continues.
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// ← reuse the exact same CSS as ScoopsFullPage
import styles from '../ScoopsPage/ScoopsFullPage.module.css';
import showcaseStyles from './ScoopsShowcase.module.css';

import matchaVideo    from '../../video/Matcha video.mp4';
import mangoVideo     from '../../video/Mango video.mp4';
import cheesecakeVideo from '../../video/NEW YORK CHEESECAKE video.mp4';
import seethaphalVideo from '../../video/seethapal video1.mp4';
import irishCoffeeVideo from '../../video/Iris coffee video.mp4';
import ladooVideo     from '../../video/Devasthanam ladoo video.mp4';

export interface ScoopFlavour {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  video: string;
  color: string;
}

export const ALL_FLAVOURS: ScoopFlavour[] = [
  { id: 1, title: 'Japanese Matcha',   subtitle: 'Ceremonial Grade',     description: 'Ceremonial-grade green tea expertly churned into a rich, earthy, and smooth scoop.',           video: matchaVideo,     color: 'rgba(167, 243, 208, 0.25)' },
  { id: 2, title: 'Desi Mango',        subtitle: 'Sun-Ripened Tropical',  description: 'Pure essence of sun-ripened Indian mangoes blended for a vibrant tropical bite.',               video: mangoVideo,      color: 'rgba(252, 211, 77, 0.25)'  },
  { id: 3, title: 'N.Y. Cheese Cake',  subtitle: 'Graham Core',           description: 'Cream cheese base swirled with a buttery graham crust for the ultimate dessert.',               video: cheesecakeVideo, color: 'rgba(254, 243, 199, 0.2)'  },
  { id: 4, title: 'Seethaphal',        subtitle: 'Seasonal Harvest',      description: 'A seasonal delight capturing the creamy, sweet floral notes of fresh custard apple.',           video: seethaphalVideo, color: 'rgba(226, 232, 240, 0.25)' },
  { id: 5, title: 'Irish Coffee',      subtitle: 'Whiskey Infused',       description: 'Robust coffee flavors interwoven with caramel and whiskey notes for an elegant treat.',         video: irishCoffeeVideo,color: 'rgba(217, 119, 6, 0.25)'  },
  { id: 6, title: 'Devasthanam Ladoo', subtitle: 'Temple Offering',       description: 'Divine sweetness inspired by traditional offerings, bursting with rich ghee textures.',         video: ladooVideo,      color: 'rgba(245, 158, 11, 0.25)' },
];

interface Props {
  /** Subset for home page (e.g. first 3); full array for /scoops page */
  flavours?: ScoopFlavour[];
  /** Show "View All Flavours" button */
  showViewAll?: boolean;
}

export default function ScoopsShowcase({
  flavours = ALL_FLAVOURS.slice(0, 3),
  showViewAll = false,
}: Props) {
  const navigate = useNavigate();
  const count = flavours.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const outerRef  = useRef<HTMLDivElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [stageVisible, setStageVisible] = useState(true);
  const splitRef  = useRef<HTMLDivElement>(null);

  const activeItem = flavours[activeIndex];

  // ── Scroll-driven sticky: each "page" advances one flavour ─────────────
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const onScroll = () => {
      const rect      = outer.getBoundingClientRect();
      const scrolled  = -rect.top;                           // px scrolled into outer
      const maxScroll = outer.offsetHeight - window.innerHeight; // total scroll range

      if (scrolled <= 0)          { setActiveIndex(0);          return; }
      if (scrolled >= maxScroll)  { setActiveIndex(count - 1);  return; }

      const idx = Math.min(
        Math.floor((scrolled / maxScroll) * count),
        count - 1
      );
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [count]);

  // ── Reload + play video on flavour change ──────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [activeIndex]);

  // ── Stage visibility (for floatingAnimated class) ──────────────────────
  useEffect(() => {
    const el = splitRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setStageVisible(e.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Jump-to helper (click on list item or dot) ─────────────────────────
  const jumpTo = (i: number) => {
    const outer = outerRef.current;
    if (!outer) return;
    const max    = outer.offsetHeight - window.innerHeight;
    const target = outer.offsetTop + (max * (i / Math.max(count - 1, 1)));
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const scrollToEnquiry = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Outer tall container  — height = count × 100 vh
    <div
      ref={outerRef}
      id="scoops"
      className={showcaseStyles.outerWrapper}
      style={{ height: `${count * 100}vh` }}
    >
      {/* ── Sticky viewport ── */}
      <div className={showcaseStyles.stickyInner}>

        {/* ─── Top Header matching Thickshakes ─── */}
        <div className={showcaseStyles.topRow}>
          <div className={showcaseStyles.header}>
            <p className={showcaseStyles.eyebrow}>— Signature Flavours</p>
            <h2 className={showcaseStyles.title}>Scoops</h2>
            <p className={showcaseStyles.subtitle}>Hand-churned, every single day.</p>
          </div>
          {showViewAll && (
            <button className={showcaseStyles.seeAllBtn} onClick={() => navigate('/scoops')}>
              SEE MORE <span>→</span>
            </button>
          )}
        </div>

        {/* ══════════════ EXACT splitSection from ScoopsFullPage ══════════════ */}
        <div ref={splitRef} className={styles.splitSection} style={{ flex: 1, minHeight: 0 }}>

          {/* LEFT: sidebar */}
          <div className={styles.sidebar} style={{ paddingTop: '1rem' }}>

            <div className={styles.indexList}>
              <p className={styles.indexEyebrow}>— Select Flavor</p>

              {flavours.map((item, i) => (
                <div
                  key={item.id}
                  className={`${styles.indexItem} ${i === activeIndex ? styles.activeItem : ''}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => jumpTo(i)}
                >
                  <div className={styles.itemNames}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <span className={styles.itemSub}>{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: stage */}
          <div className={styles.stage}>
            {/* Aura */}
            <div
              className={styles.stageAura}
              style={{ background: `radial-gradient(circle at center, ${activeItem.color} 0%, transparent 60%)` }}
            />

            {/* Watermark */}
            <div className={styles.watermarkContainer}>
              <h1 key={activeItem.title} className={styles.watermarkText}>
                {activeItem.title.toUpperCase()}
              </h1>
            </div>

            {/* Floating video */}
            <div
              className={`${styles.floatingVideoWrapper} ${stageVisible ? styles.floatingAnimated : ''}`}
              key={`vid-${activeItem.id}`}
            >
              <video
                ref={videoRef}
                src={activeItem.video}
                className={styles.floatingVideo}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            {/* Spec plate */}
            <div className={styles.specPlate}>
              <div className={styles.specHeader}>
                <span className={styles.specEyebrow}>Tasting Notes</span>
              </div>
              <p className={styles.specDesc}>{activeItem.description}</p>
              <div className={styles.specFooter}>
                <button className={styles.exploreBtn} onClick={scrollToEnquiry}>Enquire</button>
                <div className={styles.purityBadge}>100% Artisanal</div>
              </div>
            </div>

            {/* Progress dots */}
            <div className={showcaseStyles.progressDots}>
              {flavours.map((_, i) => (
                <div
                  key={i}
                  className={`${showcaseStyles.dot} ${i === activeIndex ? showcaseStyles.dotActive : ''}`}
                  onClick={() => jumpTo(i)}
                />
              ))}
            </div>

            {/* Scroll hint (first flavour only) */}
            {activeIndex === 0 && (
              <div className={showcaseStyles.scrollHint}>
                <div className={showcaseStyles.scrollLine} />
                <span>scroll</span>
              </div>
            )}
          </div>
        </div>
        {/* ══════════════ end splitSection ══════════════ */}

      </div>
    </div>
  );
}
