import styles from './ArtOfIceCream.module.css';
import chefImg from '../../assets/chef_crafting_ice_cream_1774726396131.png';

export default function ArtOfIceCream() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.overline}>THE ART OF ICE CREAM</span>
          <h2 className={styles.title}>
            Every pint starts with culinary discipline, not shortcuts.
          </h2>
          <p className={styles.description}>
            The Rare Scoop operates like a tasting studio: ingredients are sourced globally, churn times are controlled precisely, and every recipe is tuned for clean finish and dense flavor.
          </p>

          <ol className={styles.stepList}>
            <li className={styles.stepItem}>
              <span className={styles.stepNumber}>1</span>
              <div>
                <h3 className={styles.stepTitle}>Rare ingredients</h3>
                <p className={styles.stepDesc}>Single-origin cacao, estate vanilla, saffron threads, and orchard fruit picked for depth over novelty.</p>
              </div>
            </li>
            <li className={styles.stepItem}>
              <span className={styles.stepNumber}>2</span>
              <div>
                <h3 className={styles.stepTitle}>Precision batching</h3>
                <p className={styles.stepDesc}>Each batch is produced in small volumes so texture, overrun, and consistency stay intentionally controlled.</p>
              </div>
            </li>
            <li className={styles.stepItem}>
              <span className={styles.stepNumber}>3</span>
              <div>
                <h3 className={styles.stepTitle}>Cold-chain delivery</h3>
                <p className={styles.stepDesc}>Insulated packaging and timed dispatch preserve the scoop exactly as it leaves the kitchen.</p>
              </div>
            </li>
          </ol>

          <button className={styles.ctaBtn}>DISCOVER OUR CRAFT</button>
        </div>

        <div className={styles.imagePlaceholder}>
          <img 
            src={chefImg} 
            alt="Chef Crafting Ice Cream" 
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
