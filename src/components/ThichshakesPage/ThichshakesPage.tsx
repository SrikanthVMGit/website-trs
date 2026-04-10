import { useEffect, useState } from 'react';
import styles from './ThichshakesPage.module.css';
import logoIcon from "../../assets/rarelogo.png";

import chocolateImg from "../../assets/chocolate_hazelnut_shake.png";
import saltedCaramelImg from "../../assets/salted_caramel_shake.png";
import peanutButterImg from "../../assets/peanut_butter_fudge_shake.png";
import strawberryCreamImg from "../../assets/strawberry_cream_milkshake.png";

const baseFlavors = [
  {
    img: chocolateImg, title: "Belgian Dark", sub: "Velvet Cocoa", color: "rgba(101, 67, 33, 0.5)",
    description: "Dark cocoa meets Belgian cacao in a thick, indulgent blend with a velvety, bittersweet finish.",
  },
  {
    img: saltedCaramelImg, title: "Salted Caramel", sub: "Sweet Salt Balance", color: "rgba(217, 119, 6, 0.45)",
    description: "Rich caramel folded with hand-harvested fleur de sel — a perfect, irresistible sweet-salt dance.",
  },
  {
    img: peanutButterImg, title: "Peanut Fudge", sub: "Uncompromisingly Rich", color: "rgba(245, 158, 11, 0.4)",
    description: "Creamy peanut butter ribboned through a deep chocolate fudge base. Uncompromisingly rich.",
  },
  {
    img: strawberryCreamImg, title: "Strawberry Cream", sub: "Cloud-like Cream", color: "rgba(244, 114, 182, 0.4)",
    description: "Sun-kissed strawberries blended into a lush cloud-like cream — delicately sweet and fresh.",
  },
  {
    img: chocolateImg, title: "Mint Chocolate", sub: "Frosty & Rich", color: "rgba(16, 185, 129, 0.4)",
    description: "Spearmint-fresh coolness rippled through a deep chocolate base for a breathtaking contrast.",
  },
  {
    img: saltedCaramelImg, title: "Alphonso Swirl", sub: "Tropical Dense", color: "rgba(252, 211, 77, 0.4)",
    description: "Pure Alphonso mango pulp churned into a thick, vibrant swirl of tropical sunshine.",
  },
  {
    img: peanutButterImg, title: "Cookies & Cream", sub: "Chunk Loaded", color: "rgba(156, 163, 175, 0.4)",
    description: "Crushed dark chocolate cookies folded through a snow-white vanilla cream base. Loaded.",
  },
  {
    img: strawberryCreamImg, title: "Wild Blueberry", sub: "Berry Blast", color: "rgba(139, 92, 246, 0.4)",
    description: "Wild-foraged blueberries blended into a deep violet, antioxidant-rich shake with floral notes.",
  },
  {
    img: chocolateImg, title: "Espresso Macchiato", sub: "Dark Roast", color: "rgba(120, 53, 15, 0.45)",
    description: "Double-shot espresso folded into a latte-cream base for a thick, bold coffee indulgence.",
  },
  {
    img: saltedCaramelImg, title: "Hazelnut Praline", sub: "Nutty Perfection", color: "rgba(180, 83, 9, 0.4)",
    description: "Slow-roasted hazelnuts caramelized into a praline and spun through thick cream. Luxurious.",
  },
  {
    img: peanutButterImg, title: "Matcha Green", sub: "Ceremonial Thick", color: "rgba(52, 211, 153, 0.4)",
    description: "Ceremonial-grade matcha stone-ground and blended into a thick, earthy-sweet green tea shake.",
  },
  {
    img: strawberryCreamImg, title: "Madagascar Vanilla", sub: "Pure Bean Extract", color: "rgba(253, 230, 138, 0.4)",
    description: "Real Madagascar vanilla pods steeped and churned into a snowy, rich, aromatic cream shake.",
  },
];

const mockData = baseFlavors.map((f, i) => ({
  id: i + 1,
  title: f.title,
  subtitle: f.sub,
  description: f.description,
  image: f.img,
  color: f.color
}));

type ShakeData = typeof mockData[0];

interface Props {
  onBack: () => void;
}

export default function ThichshakesPage({ onBack }: Props) {
  const [selectedShake, setSelectedShake] = useState<ShakeData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.fullPage}>
      {/* 👑 Fixed Nav 👑 */}
      <div className={styles.navRow}>
        <button className={styles.backBtn} onClick={onBack}>
          <img src={logoIcon} alt="Back" className={styles.backImage} />
        </button>
      </div>

      {/* 👑 Hero Intro 👑 */}
      <div className={styles.headerSection}>
        <span className={styles.heroEyebrow}>Premium Blends</span>
        <h1 className={styles.heroTitle}>Thick Shakes.</h1>
        <p className={styles.heroDesc}>
          Rich, velvety, and uncompromisingly thick. Crafted for the ultimate indulgence experience. Explore the full 12-blend collection below.
        </p>
      </div>

      {/* 👑 12-Card Grid 👑 */}
      <div className={styles.cardGrid}>
        {mockData.map((item) => (
          <div key={item.id} className={styles.card} onClick={() => setSelectedShake(item)}>
            
            <div className={styles.cardImageWrapper}>
              <img src={item.image} alt={item.title} className={styles.cardImg} />
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardSubtitle}>{item.subtitle}</p>
            </div>

          </div>
        ))}
      </div>

      {/* 👑 Popup Modal 👑 */}
      {selectedShake && (
        <div className={styles.modalOverlay} onClick={() => setSelectedShake(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setSelectedShake(null)}>×</button>
            
            <div className={styles.modalImagePanel} style={{ '--modal-color': selectedShake.color } as React.CSSProperties}>
              <img src={selectedShake.image} alt={selectedShake.title} className={styles.modalImg} />
            </div>

            <div className={styles.modalTextPanel}>
              <h2 className={styles.modalTitle}>{selectedShake.title}</h2>
              <h4 className={styles.modalSubtitle}>{selectedShake.subtitle}</h4>
              <p className={styles.modalDesc}>{selectedShake.description}</p>
              <button className={styles.modalOrderBtn}>Add to Experience</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
