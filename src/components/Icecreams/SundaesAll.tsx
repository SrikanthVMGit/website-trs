import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SundaesAll.module.css";
import pageStyles from "../ScoopsPage/ScoopsPage.module.css";
import Enquiry from "../Enquiry/Enquiry";
import Footer from "../Footer/Footer";

interface SundaeItem {
  id: number;
  title: string;
  description: string;
  poster: string;
  isNew?: boolean;
}

const ALL_SUNDAES: SundaeItem[] = [
  {
    id: 1,
    title: "Berry Bliss Sundae",
    description: "A vibrant medley of hand-picked wild strawberries, blueberries and raspberries layered over a smooth vanilla custard base. Finished with a house berry compote and white chocolate shavings for delicate sweetness.",
    poster: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80",
    isNew: false,
  },
  {
    id: 2,
    title: "Sithaphal Royal Delight",
    description: "An ode to India's most treasured seasonal fruit — the Custard Apple. Slow-churned with hand-scooped Sithaphal pulp, this sundae carries a naturally floral, honey-like sweetness that is unmatched. Served with a dusting of crushed cardamom.",
    poster: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&q=80",
    isNew: true,
  },
  {
    id: 3,
    title: "Royal Chocolate Overload",
    description: "A pure, uncompromising celebration of chocolate — think dark Valrhona ganache, a fudgy brownie crumble base, rich chocolate sauce ribbons, and a scoop of 72% dark cocoa ice cream. For the truly devoted.",
    poster: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    isNew: false,
  },
  {
    id: 4,
    title: "Belgian Nut Indulgence",
    description: "Slow-roasted Belgian hazelnuts and Sicilian pistachios ground into a silky praline, folded into a rich gelato base. Topped with a warm Gianduja drizzle and sea-salt-roasted nut clusters for the perfect crunch.",
    poster: "https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=600&q=80",
    isNew: false,
  },
  {
    id: 5,
    title: "Mango Maharaja Sundae",
    description: "Sun-ripened Alphonso mangoes at the heart of this royal creation — a lush mango sorbet kissed with saffron, topped with fresh mango coulis, a hint of lime zest, and a crown of toasted coconut flakes.",
    poster: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    isNew: true,
  },
  {
    id: 6,
    title: "Coffee Crunch Royale",
    description: "Cold-brew concentrate churned into a velvety espresso gelato, layered with caramelized toffee shards, dark chocolate-covered coffee beans, and a ribbon of salted caramel. A sophisticated pick-me-up in every spoonful.",
    poster: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
    isNew: false,
  },
  {
    id: 7,
    title: "Chocolate Volcano Sundae",
    description: "A warm, molten dark chocolate lava cake sits at the center, erupting with rich ganache as it meets two scoops of Madagascar vanilla ice cream. Surrounded by a moat of warm chocolate fudge sauce. Theatrical and unforgettable.",
    poster: "https://images.unsplash.com/photo-1590080874088-eec64895b423?w=600&q=80",
    isNew: true,
  },
  {
    id: 8,
    title: "Royal Nuts Supreme",
    description: "The pinnacle of our nut collection — cashews, macadamias, pecans and walnuts, all slow-roasted with house-spiced honey and folded into a Madagascan vanilla cream gelato. Drizzled with aged balsamic-fig reduction for a truly regal finish.",
    poster: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&q=80",
    isNew: false,
  },
];

export default function SundaesAll() {
  const navigate = useNavigate();
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = "Sundaes — The Rare Scoop";
  }, []);

  const scrollToEnquiry = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

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

      {/* ── Minimal Back Button ── */}
      <div className={pageStyles.navRow}>
        <button className={pageStyles.backBtn} onClick={() => navigate('/')} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* ── Hero ── */}
      <div className={styles.hero} style={{ position: "relative", overflow: "hidden" }}>
        
        {/* Animated Video Background */}
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
            opacity: 0.6
          }}
        >
          <source src="/videos/sunani.mp4" type="video/mp4" />
        </video>
        

        <div style={{ position: "relative", zIndex: 1 }}>
          <p className={styles.eyebrow}>The Full Collection</p>
          <h1 className={styles.heroTitle}>
            All <span className={styles.accent}>Sun</span>daes.
          </h1>
          <p className={styles.heroDesc}>
            Every scoop, every swirl, every sundae we've ever dreamed up — the full lineup, right here.
          </p>
          <button className={pageStyles.heroEnquiryBtn} onClick={scrollToEnquiry}>
            Enquire Now
          </button>
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

      {/* ── Enquiry + Footer ── */}
      <Enquiry />
      <Footer />
    </div>
  );
}