import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SundaesAll.module.css";

interface SundaeItem {
  id: number;
  title: string;
  description: string;
  poster: string;
  isNew?: boolean;
}

const ROW_ONE: SundaeItem[] = [
  { 
    id: 1, 
    title: "Choco-vanilla Swirl", 
    description: "Our signature blend featuring double-churned Madagascan vanilla bean paired with a 70% dark cocoa ripple. Finished with handcrafted fudge chunks and a delicate dusting of sea salt for the ultimate balanced indulgence.", 
    poster: "https://i.pinimg.com/736x/b0/5d/bc/b05dbc63f7ef32d2317b6abe2b605188.jpg" 
  },
  { 
    id: 2, 
    title: "Strawberry Bliss", 
    description: "A seasonal delight made with hand-picked Alpine strawberries. We macerate the berries for 24 hours to create a natural syrup that is folded into our rich, creamy base, topped with white chocolate shavings.", 
    poster: "https://i.pinimg.com/736x/dd/cb/52/ddcb527d006a25df92213fffcd848a8d.jpg" 
  },
  { 
    id: 3, 
    title: "Mango Tango", 
    description: "Experience the tropics with sun-ripened Alphonso mangoes. This sundae features a vibrant mango coulis, toasted coconut flakes, and a hint of lime zest to cut through the luscious sweetness of the fruit.", 
    poster: "https://i.pinimg.com/736x/72/07/72/7207724a35e0d8c7f9b072f2c28b060e.jpg" 
  },
  { 
    id: 4, 
    title: "Blueberry Dream", 
    description: "Deep, wild forest blueberries provide a sophisticated tartness. Infused with a touch of lavender and honey, this flavor offers a refreshing floral finish that lingers beautifully on the palate.", 
    poster: "https://i.pinimg.com/736x/32/c4/9a/32c49aa4ef3db1a84c6a2f77854c528a.jpg" 
  },
];

const ROW_TWO: SundaeItem[] = [
  { 
    id: 5, 
    title: "Pistachio Delight", 
    description: "Authentic Sicilian pistachios are slow-roasted and stone-ground into a silky butter. We fold this into our gelato base along with crushed honey-roasted nuts for a rich, earthy, and crunchy profile.", 
    poster: "https://i.pinimg.com/1200x/de/3a/a3/de3aa325306311a5f97e749dd13a1fc1.jpg", 
    isNew: true 
  },
  { 
    id: 6, 
    title: "Charcoal Sundae", 
    description: "A bold, avant-garde treat featuring activated coconut charcoal and deep black cocoa. Don't let the moody color fool you; it's a creamy masterpiece with notes of vanilla bean and toasted marshmallow.", 
    poster: "https://i.pinimg.com/736x/49/14/ba/4914ba33861ca38e3bb60126dadcce03.jpg", 
    isNew: true 
  },
  { 
    id: 7, 
    title: "Berry Blast", 
    description: "A high-intensity medley of antioxidant-rich raspberries, blackberries, and tart red currants. This sundae is layered with a house-made triple-berry jam and topped with dehydrated berry crumbles.", 
    poster: "https://i.pinimg.com/736x/4f/55/ab/4f55ab7df2a0ad35726b1b9c617e1d76.jpg", 
    isNew: true 
  },
  { 
    id: 8, 
    title: "Brownie Surprise", 
    description: "A chocolate lover's fantasy. We bake fudgy, flourless brownies and crumble them into a thick milk chocolate base, then swirl in a warm, salted caramel ribbon that stays soft even when frozen.", 
    poster: "https://i.pinimg.com/736x/c6/8d/83/c68d834a089d20855bb0de2057be5254.jpg", 
    isNew: true 
  },
];

const ALL_SUNDAES: SundaeItem[] = [...ROW_ONE, ...ROW_TWO];

export default function SundaesAll() {
  const navigate = useNavigate();
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTimeout(() => {
              setVisibleIndices((prev) => new Set([...prev, index]));
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    const cards = containerRef.current?.querySelectorAll(`.${styles.cardWrapper}`);
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero} style={{ position: "relative", overflow: "hidden" }}>
        
        {/* Replacement Video Background */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
            opacity: 0.6 // Subtle transparency to keep text readable
          }}
        >
          <source src="/videos/sunani.mp4" type="video/mp4" />
        </video>
        

        <div style={{ position: "relative", zIndex: 1 }}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
          <p className={styles.eyebrow}>The Full Collection</p>
          <h1 className={styles.heroTitle}>
            All <span className={styles.accent}>Sun</span>daes.
          </h1>
          <p className={styles.heroDesc}>
            Every scoop, every swirl, every sundae we've ever dreamed up — the full lineup, right here.
          </p>
          <div className={styles.divider} />
        </div>
      </div>

      {/* ── Grid ── */}
      <div className={styles.gridSection} ref={containerRef}>
        <p className={styles.gridLabel}>8 Flavours — pick your favorite</p>
        <div className={styles.cardsGrid}>
          {ALL_SUNDAES.map((item, i) => (
            <div
              key={item.id}
              data-index={i}
              className={`${styles.cardWrapper} ${visibleIndices.has(i) ? styles.revealed : ""}`}
            >
              <div className={styles.cardContent}>
                {item.isNew && <span className={styles.badge}>New</span>}
                <div className={styles.imageContainer}>
                  <img
                    src={item.poster}
                    alt={item.title}
                    className={styles.image}
                  />
                  <div className={styles.textOverlay}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}