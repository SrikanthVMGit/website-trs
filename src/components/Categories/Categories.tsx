import styles from './Categories.module.css'
import catGeneral from '../../assets/cat_general.png'
import catMilkshakes from '../../assets/cat_milkshakes.png'
import catThickshakes from '../../assets/cat_thickshakes.png'
import catIcecreams from '../../assets/cat_icecreams.png'

const categories = [
  {
    title: 'Categories',
    description: 'Browse by format',
    image: catGeneral
  },
  {
    title: 'Milk Shakes',
    description: 'Classic & airy',
    image: catMilkshakes
  },
  {
    title: 'Thick Shakes',
    description: 'Dessert-style blends',
    image: catThickshakes
  },
  {
    title: 'Ice Creams',
    description: 'Signature pints',
    image: catIcecreams
  }
]

export default function Categories() {
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>Categories</h2>
            <p className={styles.subtitle}>
              The house favourites, refined and memorable. Slowly churned for a remarkably clean finish.
            </p>
          </div>
          <button className={styles.seeAllBtn}>
            See All 
            <span className={styles.arrowIcon}>→</span>
          </button>
        </div>

        <div className={styles.grid}>
          {categories.map((cat, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.imageOverlay}></div>
              <img src={cat.image} alt={cat.title} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDescription}>{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
