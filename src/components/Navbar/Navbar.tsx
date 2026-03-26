import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <a href="#" className={styles.navLink}>Menu</a>
        <a href="#" className={styles.navLink}>Collections</a>
        <a href="#" className={styles.navLink}>Our Story</a>
      </div>

      <div className={styles.navLogo}>
        <span className={styles.logoText}>The Rare Scoop</span>
      </div>

      <div className={styles.navRight}>
        <a href="#" className={styles.navLink}>Sign In</a>
        <a href="#" className={styles.navLinkLower}>enquiry</a>
      </div>
    </nav>
  )
}
