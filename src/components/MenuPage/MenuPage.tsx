import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MenuPage.module.css';
import rarelogo from '../../assets/rarelogo.png';

// ─── Asset imports ────────────────────────────────────────────────────────────
import scoopsImg from '../../assets/Scoops.png';
import sundaesImg from '../../assets/sundaes.png';
import thickshakesImg from '../../assets/cat_thickshakes.png';

import warmSpecialsImg from '../../assets/Warm_specials.jpg';
import milkshakesImg from '../../assets/cat_milkshakes.png';
import icecreamsImg from '../../assets/cat_icecreams.png';
import blackSesameImg from '../../assets/black_sesame_ice_cream.png';
import rosePistachioImg from '../../assets/rose_pistachio_ice_cream.png';
import coffeePralineImg from '../../assets/coffee_praline_ice_cream.png';
import classicColdCoffeeImg from '../../assets/classic_cold_coffee_milkshake.png';
import vanillaMaltImg from '../../assets/vanilla_malt_milkshake.png';
import strawberryCreamImg from '../../assets/strawberry_cream_milkshake.png';
import chocHazelnutImg from '../../assets/chocolate_hazelnut_shake.png';
import peanutButterImg from '../../assets/peanut_butter_fudge_shake.png';
import saltedCaramelImg from '../../assets/salted_caramel_shake.png';
import mangoScoopImg from '../../assets/Mango_scoop.png';
import matchaImg from '../../assets/Matcha.png';
import cheesecakeImg from '../../assets/NY Cheesecake.png';
import seethaphalImg from '../../assets/seethapal.png';
import seasonalDropImg from '../../assets/seasonal_drops_plated_dessert_1774726379052.png';

// ─── Data ─────────────────────────────────────────────────────────────────────
type Category = 'all' | 'scoops' | 'sundaes' | 'milkshakes' | 'thickshakes' | 'icecreams' | 'warm-specials' | 'seasonal';

interface MenuItem {
  id: number;
  name: string;
  sub: string;
  category: Category;
  tags: string[];
  img: string;
  price: string;
  badge?: string;
}

const MENU_DATA: MenuItem[] = [
  // Scoops
  { id: 1, name: 'Japanese Matcha', sub: 'Ceremonial-grade green tea', category: 'scoops', tags: ['Popular'], img: matchaImg, price: '₹279', badge: 'Fan Fave' },
  { id: 2, name: 'Desi Mango', sub: 'Sun-ripened Indian mangoes', category: 'scoops', tags: ['Seasonal'], img: mangoScoopImg, price: '₹249' },
  { id: 3, name: 'N.Y. Cheesecake', sub: 'Graham core crunch', category: 'scoops', tags: ['Rich'], img: cheesecakeImg, price: '₹329', badge: 'Bestseller' },
  { id: 4, name: 'Seethaphal', sub: 'Custard apple floral notes', category: 'scoops', tags: ['Seasonal', 'Local'], img: seethaphalImg, price: '₹299' },

  // Sundaes
  { id: 5, name: 'Classic Sundae', sub: 'Vanilla, hot fudge, cherry', category: 'sundaes', tags: ['Classic'], img: sundaesImg, price: '₹349', badge: 'Classic' },
  { id: 6, name: 'Matcha Sundae', sub: 'Matcha ice cream, red bean', category: 'sundaes', tags: ['Premium'], img: matchaImg, price: '₹399', badge: 'New' },

  // Ice Creams
  { id: 7, name: 'Black Sesame', sub: 'Toasted sesame, sea salt', category: 'icecreams', tags: ['Artisanal'], img: blackSesameImg, price: '₹310' },
  { id: 8, name: 'Rose Pistachio', sub: 'Floral notes, pistachio crunch', category: 'icecreams', tags: ['Luxury'], img: rosePistachioImg, price: '₹340', badge: 'Premium' },
  { id: 9, name: 'Coffee Praline', sub: 'Cold brew, almond praline', category: 'icecreams', tags: ['Bold'], img: coffeePralineImg, price: '₹320' },

  // Milkshakes
  { id: 10, name: 'Classic Cold Coffee', sub: 'Cold brew, whole milk', category: 'milkshakes', tags: ['Classic'], img: classicColdCoffeeImg, price: '₹220' },
  { id: 11, name: 'Vanilla Malt', sub: 'Creamy malt base', category: 'milkshakes', tags: ['Classic'], img: vanillaMaltImg, price: '₹199', badge: 'Best Value' },
  { id: 12, name: 'Strawberry Cream', sub: 'Fresh strawberries, cream', category: 'milkshakes', tags: ['Fruity'], img: strawberryCreamImg, price: '₹229' },

  // Thickshakes
  { id: 13, name: 'Chocolate Hazelnut', sub: 'Dark choco, hazelnut praline', category: 'thickshakes', tags: ['Rich', 'Popular'], img: chocHazelnutImg, price: '₹299', badge: 'Fan Fave' },
  { id: 14, name: 'Peanut Butter Fudge', sub: 'Peanut butter, dark fudge', category: 'thickshakes', tags: ['Indulgent'], img: peanutButterImg, price: '₹319' },
  { id: 15, name: 'Salted Caramel', sub: 'Sea salt, amber caramel', category: 'thickshakes', tags: ['Popular'], img: saltedCaramelImg, price: '₹289', badge: 'Bestseller' },

  // Warm Specials
  { id: 16, name: 'Warm Brownie Scoop', sub: 'Fudge brownie, vanilla scoop', category: 'warm-specials', tags: ['Comfort'], img: warmSpecialsImg, price: '₹379', badge: 'Cozy' },
  { id: 17, name: 'Waffle & Cream', sub: 'Crispy waffle, soft serve', category: 'warm-specials', tags: ['Comfort', 'Popular'], img: warmSpecialsImg, price: '₹349' },

  // Seasonal
  { id: 18, name: 'Burnt Vanilla Fig', sub: 'Roasted fig, vanilla bean', category: 'seasonal', tags: ['Limited'], img: seasonalDropImg, price: '₹399', badge: 'Limited' },
  { id: 19, name: 'Yuzu Milk Sorbet', sub: 'Bright citrus, silk texture', category: 'seasonal', tags: ['Limited', 'Summer'], img: seasonalDropImg, price: '₹369', badge: 'New' },
  { id: 20, name: 'Black Sesame Caramel', sub: 'Nutty sesame, dark amber ribbons', category: 'seasonal', tags: ['Limited'], img: seasonalDropImg, price: '₹389', badge: 'Limited' },
];

const CATEGORIES: { key: Category; label: string; icon: string; img: string }[] = [
  { key: 'all', label: 'All', icon: '✦', img: scoopsImg },
  { key: 'scoops', label: 'Scoops', icon: '🍨', img: scoopsImg },
  { key: 'sundaes', label: 'Sundaes', icon: '🍧', img: sundaesImg },
  { key: 'icecreams', label: 'Ice Creams', icon: '🍦', img: icecreamsImg },
  { key: 'milkshakes', label: 'Milkshakes', icon: '🥛', img: milkshakesImg },
  { key: 'thickshakes', label: 'Thickshakes', icon: '🧋', img: thickshakesImg },
  { key: 'warm-specials', label: 'Warm Specials', icon: '☕', img: warmSpecialsImg },
  { key: 'seasonal', label: 'Seasonal', icon: '🌸', img: seasonalDropImg },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.25 } },
};

export default function MenuPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState<Category>('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const filtered = active === 'all' ? MENU_DATA : MENU_DATA.filter(i => i.category === active);
  const activeCat = CATEGORIES.find(c => c.key === active)!;

  // Parallax on hero
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.page}>
      {/* ═══ NAVBAR ════════════════════════════════════════════════ */}
      <nav className={styles.nav}>
        <button className={styles.backBtn} onClick={() => navigate('/')} aria-label="Back to home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span>Back</span>
        </button>

        <div className={styles.navLogo} onClick={() => navigate('/')}>
          <img src={rarelogo} alt="The Rare Scoop" className={styles.logoImg} />
          <span className={styles.logoText}>The Rare Scoop</span>
        </div>

        <div className={styles.navSpacer} />
      </nav>

      {/* ═══ HERO ══════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div ref={heroRef} className={styles.heroBg} />
        <div className={styles.heroOverlay} />

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <span className={styles.heroEyebrow}>— The Full Collection</span>
          <h1 className={styles.heroTitle}>
            Our <span className={styles.heroGold}>Menu</span>
          </h1>
          <p className={styles.heroSub}>
            Handcrafted scoops, decadent sundaes, artisan shakes and warm seasonal specials —<br />
            every flavour we've ever dreamed up.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{MENU_DATA.length}+</span>
              <span className={styles.heroStatLabel}>Items</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>8</span>
              <span className={styles.heroStatLabel}>Categories</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>100%</span>
              <span className={styles.heroStatLabel}>Artisanal</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className={styles.scrollCue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className={styles.scrollLine} />
          <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* ═══ FILTER TABS ═══════════════════════════════════════════ */}
      <section className={styles.filterSection}>
        <div className={styles.filterInner}>
          <div className={styles.filterTabs} role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={active === cat.key}
                className={`${styles.tab} ${active === cat.key ? styles.tabActive : ''}`}
                onClick={() => setActive(cat.key)}
              >
                <span className={styles.tabIcon}>{cat.icon}</span>
                <span className={styles.tabLabel}>{cat.label}</span>
                {active === cat.key && (
                  <motion.div className={styles.tabPill} layoutId="activeTab" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY BANNER ═══════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className={styles.catBanner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.catBannerInner}>
            <span className={styles.catBannerIcon}>{activeCat.icon}</span>
            <div>
              <h2 className={styles.catBannerTitle}>{activeCat.label === 'All' ? 'Everything We Offer' : activeCat.label}</h2>
              <p className={styles.catBannerCount}>{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Marquee banner strip */}
          <div className={styles.catMarqueeWrap} aria-hidden="true">
            <div className={styles.catMarquee}>
              {Array(6).fill(null).map((_, i) => (
                <span key={i} className={styles.catMarqueeItem}>
                  {activeCat.label.toUpperCase()} &bull;&nbsp;
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ═══ MENU GRID ═════════════════════════════════════════════ */}
      <section className={styles.gridSection}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={styles.grid}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariant}
                className={styles.card}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ '--accent': 'rgba(200,155,109,0.9)' } as React.CSSProperties}
              >
                {/* Badge */}
                {item.badge && (
                  <div className={styles.badge}>{item.badge}</div>
                )}

                {/* Image */}
                <div className={styles.cardImageWrap}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.cardImageOverlay} />

                  {/* Hover marquee */}
                  <div className={styles.cardMarquee}>
                    <div className={styles.cardMarqueeInner}>
                      {[1, 2, 3].map(i => (
                        <span key={i}>{item.name.toUpperCase()} &bull; THE RARE SCOOP &bull; &nbsp;</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className={styles.cardBody}>
                  <div className={styles.cardTags}>
                    {item.tags.map(t => (
                      <span key={t} className={styles.cardTag}>{t}</span>
                    ))}
                  </div>
                  <h3 className={styles.cardName}>{item.name}</h3>
                  <p className={styles.cardSub}>{item.sub}</p>
                </div>

                {/* Footer */}
                <div className={styles.cardFooter}>
                  <span className={styles.cardPrice}>{item.price}</span>
                  <div className={`${styles.cardOrder} ${hoveredId === item.id ? styles.cardOrderVisible : ''}`}>
                    <span>Order</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ═══ BOTTOM CTA ════════════════════════════════════════════ */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.ctaEyebrow}>— Order Now</span>
            <h2 className={styles.ctaTitle}>Ready to Indulge?</h2>
            <p className={styles.ctaSub}>Order via Swiggy or Zomato and get it delivered fresh.</p>
            <div className={styles.ctaBtns}>
              <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaBtnSwiggy}`}>
                Order on Swiggy
              </a>
              <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaBtnZomato}`}>
                Order on Zomato
              </a>
            </div>
          </motion.div>
        </div>

        {/* Watermark */}
        <div className={styles.ctaWatermark} aria-hidden="true">MENU</div>
      </section>
    </div>
  );
}
