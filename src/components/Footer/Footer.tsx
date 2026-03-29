import styles from './Footer.module.css'
import rarelogo from '../../assets/rarelogo.png'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <div className={styles.logoRow}>
            <img
              src={rarelogo}
              alt="The Rare Scoop"
              className={styles.logoImg}
            />
          </div>
          <p className={styles.brandDesc}>
            Premium ice cream from a cloud kitchen designed for gifting, discovery, and indulgent delivery moments.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h3 className={styles.colTitle}>SHOP</h3>
          <ul className={styles.linkList}>
            <li><a href="#">All Flavors</a></li>
            <li><a href="#">Seasonal Drops</a></li>
            <li><a href="#">Gift Boxes</a></li>
          </ul>
        </div>

        <div className={styles.orderCol}>
          <h3 className={styles.colTitle}>ORDER FROM</h3>
          <div className={styles.orderLogos}>
            <div className={styles.orderLogoWrapper}>
              <div className={styles.swiggyIcon}>S</div>
            </div>
            <div className={styles.orderLogoWrapper}>
              <div className={styles.zomatoIcon}>Z</div>
            </div>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h3 className={styles.colTitle}>SUPPORT</h3>
          <ul className={styles.linkList}>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Delivery & Zones</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className={styles.connectCol}>
          <h3 className={styles.colTitle}>CONNECT</h3>
          <div className={styles.socialIcons}>
            <div className={styles.socialIcon}>F</div>
            <div className={styles.socialIcon}>I</div>
            <div className={styles.socialIcon}>X</div>
            <div className={styles.socialIcon}>Y</div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>© 2025 The Rare Scoop. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
