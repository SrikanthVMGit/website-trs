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
        <svg 
          className={styles.logoIcon}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path d="M12 2C12 2 12 6 12 8M12 16C12 18 12 22 12 22M2 12C2 12 6 12 8 12M16 12C18 12 22 12 22 12M18.36 5.64C18.36 5.64 15.54 8.46 14.12 9.88M9.88 14.12C8.46 15.54 5.64 18.36 5.64 18.36M18.36 18.36C18.36 18.36 15.54 15.54 14.12 14.12M9.88 9.88C8.46 8.46 5.64 5.64 5.64 5.64" />
        </svg>
        <span className={styles.logoText}>The Rare Scoop</span>
      </div>

      <div className={styles.navRight}>
        <a href="#" className={styles.navLinkLower}>enquiry</a>
      </div>
    </nav>
  )
}
