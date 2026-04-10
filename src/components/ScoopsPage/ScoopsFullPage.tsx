import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScoopCanvas from './ScoopCanvas';

gsap.registerPlugin(ScrollTrigger);
import styles from './ScoopsFullPage.module.css';

import matchaVideo from "../../video/Matcha video.mp4";
import mangoVideo from "../../video/Mango video.mp4";
import cheesecakeVideo from "../../video/NEW YORK CHEESECAKE video.mp4";
import seethaphalVideo from "../../video/seethapal video1.mp4";
import irishCoffeeVideo from "../../video/Iris coffee video.mp4";
import laddoVideo from "../../video/Devasthanam ladoo video.mp4";
import backIcon from "../../assets/dfddf.png";
import logoIcon from "../../assets/rarelogo.png";

// Marquee JPG assets
import ladooImg from "../../assets/Devasthanam ladoo Scoop.png";
import irisCoffeeImg from "../../assets/iris coffee scoop.png";
import mangoImg from "../../assets/Mango_scoop.png";
import matchaImg from "../../assets/Matcha.png";
import cheesecakeImg from "../../assets/NY Cheesecake.png";
import seethaphalImg from "../../assets/seethapal.png";

const luxuryScoops = [
  { img: matchaImg, name: "Japanese Matcha" },
  { img: irisCoffeeImg, name: "Irish Coffee" },
  { img: ladooImg, name: "Devasthanam Ladoo" },
  { img: seethaphalImg, name: "Seethaphal" },
  { img: mangoImg, name: "Desi Mango" },
  { img: cheesecakeImg, name: "NY Cheesecake" },
];

const romanNumerals = ["I", "II", "III", "IV", "V", "VI"];

interface ScoopItem {
  id: number;
  title: string;
  description: string;
  video: string;
  price: number;
  color: string;
  subtitle: string;
}

const data: ScoopItem[] = [
  {
    id: 1,
    title: "Japanese Matcha",
    subtitle: "Ceremonial Grade",
    description: "Ceremonial-grade green tea expertly churned into a rich, earthy, and smooth scoop.",
    video: matchaVideo,
    price: 279,
    color: "rgba(167, 243, 208, 0.25)"
  },
  {
    id: 2,
    title: "Desi Mango",
    subtitle: "Sun-Ripened Tropical",
    description: "Pure essence of sun-ripened Indian mangoes blended for a vibrant tropical bite.",
    video: mangoVideo,
    price: 249,
    color: "rgba(252, 211, 77, 0.25)"
  },
  {
    id: 3,
    title: "N.Y. Cheese Cake",
    subtitle: "Graham Core",
    description: "Cream cheese base swirled with a buttery graham crust for the ultimate dessert.",
    video: cheesecakeVideo,
    price: 329,
    color: "rgba(254, 243, 199, 0.2)"
  },
  {
    id: 4,
    title: "Seethaphal",
    subtitle: "Seasonal Harvest",
    description: "A seasonal delight capturing the creamy, sweet floral notes of fresh custard apple.",
    video: seethaphalVideo,
    price: 299,
    color: "rgba(226, 232, 240, 0.25)"
  },
  {
    id: 5,
    title: "Irish Coffee",
    subtitle: "Whiskey Infused",
    description: "Robust coffee flavors interwoven with caramel and whiskey notes for an elegant treat.",
    video: irishCoffeeVideo,
    price: 349,
    color: "rgba(217, 119, 6, 0.25)"
  },
  {
    id: 6,
    title: "Devasthanam Laddo",
    subtitle: "Temple Offering",
    description: "Divine sweetness inspired by traditional offerings, bursting with rich ghee textures.",
    video: laddoVideo,
    price: 349,
    color: "rgba(245, 158, 11, 0.25)"
  },
];

interface ScoopsFullPageProps {
  onBack: () => void;
}

export default function ScoopsFullPage({ onBack }: ScoopsFullPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageVisible, setStageVisible] = useState(false);
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeItem = data[activeIndex];

  // Pass ref into state so child elements can hook ScrollTriggers to it on first mount
  useEffect(() => {
    if (wrapperRef.current) {
      setScrollEl(wrapperRef.current);
    }
  }, []);

  // GSAP Horizontal Slide tied to vertical scrolling
  useGSAP(() => {
    if (!scrollEl) return;

    gsap.to(`.${styles.rowLeft}`, {
      xPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: `.${styles.scoopSection}`,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        scroller: scrollEl,
      },
    });

    gsap.to(`.${styles.rowRight}`, {
      xPercent: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: `.${styles.scoopSection}`,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        scroller: scrollEl,
      },
    });
  }, { scope: wrapperRef, dependencies: [scrollEl] });

  /* ── IntersectionObserver: trigger zero-gravity anim in split section ── */
  useEffect(() => {
    const el = splitRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStageVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Video Scrubbing on Scroll ── */
  // The user requested to revert back to autoPlay instead of scroll-scrubbing

  return (
    <div ref={wrapperRef} className={styles.fullPageScrollWrapper}>

      {/* ═══════════════ INTRO HEADER ═══════════════ */}
      <div className={styles.introHeader}>
        {/* Back button */}
        <div className={styles.navRow}>
          <button className={styles.backBtn} onClick={onBack}>
            <img src={logoIcon} alt="Back" className={styles.backImage} />
          </button>
        </div>

        <div className={styles.introContent}>
          <span className={styles.introEyebrow}>THE FULL COLLECTION</span>
          <h1 className={styles.introTitle}>All <span className={styles.goldText}>Scoops.</span></h1>
          <p className={styles.introDesc}>
            Every scoop, every swirl, every flavour we've ever<br />
            dreamed up — the full lineup, right here.
          </p>
        </div>
      </div>

      {/* ═══════════════ NEW SCROLL REVEAL ROW (GSAP MARQUEE) ═══════════════ */}
      <div className={styles.scoopSection} data-scoop-section="true">
        {/* TOP ROW: slides left, scoops rotate counter-clockwise */}
        <div className={`${styles.scoopRow} ${styles.rowLeft}`}>
          {Array(6).fill(luxuryScoops).flat().map((scoop, i) => (
            <div key={`top-${i}`} className={styles.scoopItem}>
              <ScoopCanvas
                src={scoop.img}
                size={170}
                scrollContainer={scrollEl}
                direction={-1}
              />
            </div>
          ))}
        </div>

        <div className={styles.centerText}>
          DISCOVER PURE JOY IN EVERY BITE, WITH EACH FLAVOUR CRAFTED<br />
          WITH REAL INGREDIENTS, AND A WHOLE LOT OF CARE
        </div>

        {/* BOTTOM ROW: slides right, scoops rotate clockwise */}
        <div className={`${styles.scoopRow} ${styles.rowRight}`}>
          {Array(6).fill(luxuryScoops).flat().reverse().map((scoop, i) => (
            <div key={`bottom-${i}`} className={styles.scoopItem}>
              <ScoopCanvas
                src={scoop.img}
                size={170}
                scrollContainer={scrollEl}
                direction={1}
              />
            </div>
          ))}
        </div>
      </div>



      {/* THE ARCHITECTURAL SPLIT SECTION */}
      <div ref={splitRef} className={styles.splitSection}>

        {/* LEFT COLUMN: THE INDEX */}
        <div className={styles.sidebar}>

          {/* Nav Header (Brand text only since back is up top) */}
          <div className={styles.brandRow}>
            <span className={styles.brandText}>Velvet & Swirl</span>
          </div>

          {/* Interactive List */}
          <div className={styles.indexList}>
            <p className={styles.indexEyebrow}>— Select Flavor</p>
            {data.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={item.id}
                  className={`${styles.indexItem} ${isActive ? styles.activeItem : ''}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                >
                  <div className={styles.itemNames}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <span className={styles.itemSub}>{item.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>


        </div>

        {/* RIGHT COLUMN: THE SHOWCASE STAGE */}
        <div className={styles.stage}>
          {/* Dynamic Background Aura */}
          <div
            className={styles.stageAura}
            style={{ background: `radial-gradient(circle at center, ${activeItem.color} 0%, transparent 60%)` }}
          />

          {/* Cinematic Watermark */}
          <div className={styles.watermarkContainer}>
            <h1 key={activeItem.title} className={styles.watermarkText}>
              {activeItem.title.toUpperCase()}
            </h1>
          </div>

          {/* Floating Video Asset */}
          <div className={`${styles.floatingVideoWrapper} ${stageVisible ? styles.floatingAnimated : ''}`} key={`vid-${activeItem.id}`}>
            <video
              ref={videoRef}
              src={activeItem.video}
              className={styles.floatingVideo}
              autoPlay
              muted
              playsInline
              onEnded={() => {
                // Auto-advance to next flavor
                setActiveIndex(prev => (prev + 1) % data.length);
              }}
            />
          </div>

          {/* The Obsidian Spec Plate */}
          <div className={styles.specPlate}>
            <div className={styles.specHeader}>
              <span className={styles.specEyebrow}>Tasting Notes</span>
            </div>
            <p className={styles.specDesc}>
              {activeItem.description}
            </p>
            <div className={styles.specFooter}>
              <button className={styles.exploreBtn}>Add to Experience</button>
              <div className={styles.purityBadge}>100% Artisanal</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
