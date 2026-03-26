import styles from './Hero.module.css'
import heroImg from '../../assets/ice_cream_hero_section_1774506074577.png'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Created for the Curious</h1>
        <p className={styles.description}>
          The Rare Scoop is a premium cloud kitchen bringing small batch pints, 
          limited drops, tasting flights, and concierge delivery to modern dessert lovers.
        </p>
        
        <div className={styles.buttonGroup}>
          <button className={styles.btnPrimary}>ORDER DELIVERY</button>
          <button className={styles.btnSecondary}>EXPLORE FLAVORS</button>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img 
          src={heroImg} 
          alt="Artisanal Ice Creams" 
          className={styles.heroImage}
        />
      </div>
    </section>
  )
}
