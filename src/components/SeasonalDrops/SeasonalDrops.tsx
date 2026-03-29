import styles from './SeasonalDrops.module.css';
import seasonalImg from '../../assets/seasonal_drops_plated_dessert_1774726379052.png';

const DROPS = [
  {
    name: "Burnt Vanilla Fig",
    description: "Roasted fig jam, vanilla bean custard base, and toasted sugar finish.",
    status: "LIVE NOW",
    statusType: "live"
  },
  {
    name: "Yuzu Milk Sorbet",
    description: "Bright citrus acidity softened with cultured dairy and silk texture.",
    status: "RESERVE",
    statusType: "reserve"
  },
  {
    name: "Black Sesame Caramel",
    description: "Nutty roasted sesame layered with dark amber caramel ribbons.",
    status: "WAITLIST",
    statusType: "waitlist"
  }
];

export default function SeasonalDrops() {
  return (
    <section className={styles.seasonalDrops}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.overline}>SEASONAL DROPS</span>
          <h2 className={styles.title}>
            Limited releases for the guests who like finding flavors first.
          </h2>
          <p className={styles.description}>
            Small-batch launches highlight rare fruit, single-origin chocolate, spice infusions, and chef collaborations. Reserve before they disappear.
          </p>

          <div className={styles.dropsList}>
            {DROPS.map((drop, idx) => (
              <div key={idx} className={styles.dropItem}>
                <div className={styles.dropInfo}>
                  <h3 className={styles.dropName}>{drop.name}</h3>
                  <p className={styles.dropDesc}>{drop.description}</p>
                </div>
                <button className={`${styles.statusBtn} ${styles[drop.statusType]}`}>
                  {drop.status}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img 
            src={seasonalImg} 
            alt="Plated Seasonal Dessert" 
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
