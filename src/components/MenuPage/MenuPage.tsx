import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import styles from './MenuPage.module.css';
import Enquiry from '../Enquiry/Enquiry';
import Footer from '../Footer/Footer';

// ... (existing imports)

// ─── Video ────────────────────────────────────────────────────────────────────
import heroVideo from '../../assets/sundaes/Ice_Cream_Sundae_A_spoon_drizzles_mango_sauce_over_scoops_of_4RRWdq1Y.mp4';

// ─── Asset imports ────────────────────────────────────────────────────────────
import rarelogo from '../../assets/common/rarelogo.png';
import scoopsImg from '../../assets/scoops/Scoops.png';
import sundaesImg from '../../assets/sundaes/sundaes.png';
import thickshakesImg from '../../assets/thickshakes/cat_thickshakes.png';
import warmSpecialsImg from '../../assets/warm-specials/Warm_specials.jpg';
import milkshakesImg from '../../assets/milkshakes/cat_milkshakes.png';
import icecreamsImg from '../../assets/icecreams/cat_icecreams.png';
import blackSesameImg from '../../assets/icecreams/black_sesame_ice_cream.png';
import rosePistachioImg from '../../assets/icecreams/rose_pistachio_ice_cream.png';
import coffeePralineImg from '../../assets/icecreams/coffee_praline_ice_cream.png';
import classicColdCoffeeImg from '../../assets/milkshakes/classic_cold_coffee_milkshake.png';
import vanillaMaltImg from '../../assets/milkshakes/vanilla_malt_milkshake.png';
import strawberryCreamImg from '../../assets/milkshakes/strawberry_cream_milkshake.png';
// ─── New Thickshake images ────────────────────────────────────────────────────
import midnightBelgianImg from '../../assets/thickshakes/midnight_belgian_silk.png';
import alphonsoMangoImg from '../../assets/thickshakes/alphonso_mango_creamery.png';
import berryVelvetImg from '../../assets/thickshakes/berry_velvet_crush.png';
import darkRoastImg from '../../assets/thickshakes/dark_roast_creamshake.png';
// ─── New Sundae images ────────────────────────────────────────────────────────
import berryBlissImg from '../../assets/sundaes/berry_bliss_sundae.png';
import sithaphalRoyalImg from '../../assets/sundaes/sithaphal_royal_delight.png';
import royalChocImg from '../../assets/sundaes/royal_chocolate_overload.png';
import belgianNutImg from '../../assets/sundaes/belgian_nut_indulgence.png';
import mangoScoopImg from '../../assets/scoops/Mango_scoop.png';
import matchaImg from '../../assets/scoops/Matcha.png';
import cheesecakeImg from '../../assets/scoops/NY Cheesecake.png';
import seethaphalImg from '../../assets/scoops/seethapal.png';
import seasonalDropImg from '../../assets/seasonal/seasonal_drops_plated_dessert_1774726379052.png';

// ─── Types ────────────────────────────────────────────────────────────────────
type CategoryKey = 'scoops' | 'sundaes' | 'thickshakes' | 'warm-specials' | 'milkshakes' | 'icecreams' | 'seasonal';

interface MenuItem {
  id: number;
  name: string;
  sub: string;
  category: CategoryKey;
  tags: string[];
  img: string;
  price: string;
  badge?: string;
}

interface Category {
  key: CategoryKey;
  label: string;
  tagline: string;
  description: string;
  accentColor: string;
  heroImg: string;
  emoji: string;
  route?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    key: 'scoops',
    label: 'Scoops',
    tagline: 'Signature flavors, hand-churned',
    description: 'Our legendary scoops crafted from the finest ingredients. Each flavour is a journey.',
    accentColor: '#e6a556',
    heroImg: scoopsImg,
    emoji: '🍨',
    route: '/scoops',
  },
  {
    key: 'sundaes',
    label: 'Sundaes',
    tagline: 'Loaded with indulgence',
    description: 'Towering sundaes dripping with sauces, toppings and layers of pure joy.',
    accentColor: '#c97b9a',
    heroImg: sundaesImg,
    emoji: '🍧',
    route: '/sundaes',
  },
  {
    key: 'thickshakes',
    label: 'Thickshakes',
    tagline: 'Dessert in a glass',
    description: 'Impossibly thick, impossibly good. These aren\'t shakes — they\'re experiences.',
    accentColor: '#7b8fc9',
    heroImg: thickshakesImg,
    emoji: '🧋',
  },
  {
    key: 'warm-specials',
    label: 'Warm Specials',
    tagline: 'Comfort served hot & cold',
    description: 'The perfect union of warm, freshly baked treats and cool, creamy scoops.',
    accentColor: '#c97b5a',
    heroImg: warmSpecialsImg,
    emoji: '☕',
    route: '/warm-specials',
  },
];

const ALL_CATEGORIES: Category[] = [
  ...CATEGORIES,
  {
    key: 'milkshakes',
    label: 'Milkshakes',
    tagline: 'Classic cream blends',
    description: 'Light, smooth and timeless — our milkshakes are velvet in every sip.',
    accentColor: '#7bc99a',
    heroImg: milkshakesImg,
    emoji: '🥛',
  },
  {
    key: 'icecreams',
    label: 'Ice Creams',
    tagline: 'Artisanal small-batch',
    description: 'Rare flavour combinations you won\'t find anywhere else in the city.',
    accentColor: '#9a7bc9',
    heroImg: icecreamsImg,
    emoji: '🍦',
  },
  {
    key: 'seasonal',
    label: 'Seasonal Drops',
    tagline: 'Limited. Precious. Now.',
    description: 'Rare drops that follow the seasons — available only while they last.',
    accentColor: '#c9b27b',
    heroImg: seasonalDropImg,
    emoji: '🌸',
  },
];

const MENU_DATA: MenuItem[] = [
  // Scoops
  { id: 1, name: 'Japanese Matcha', sub: 'Ceremonial-grade green tea', category: 'scoops', tags: ['Popular'], img: matchaImg, price: '₹279', badge: 'Fan Fave' },
  { id: 2, name: 'Desi Mango', sub: 'Sun-ripened Indian mangoes', category: 'scoops', tags: ['Seasonal'], img: mangoScoopImg, price: '₹249' },
  { id: 3, name: 'N.Y. Cheesecake', sub: 'Graham core crunch', category: 'scoops', tags: ['Rich'], img: cheesecakeImg, price: '₹329', badge: 'Bestseller' },
  { id: 4, name: 'Seethaphal', sub: 'Custard apple floral notes', category: 'scoops', tags: ['Seasonal', 'Local'], img: seethaphalImg, price: '₹299' },
  // Sundaes
  { id: 5,  name: 'Berry Bliss Sundae',       sub: 'Wild berries, berry compote, whipped cream', category: 'sundaes',     tags: ['Fruity', 'Popular'], img: berryBlissImg,   price: '₹369', badge: 'Fan Fave' },
  { id: 6,  name: 'Sithaphal Royal Delight',  sub: 'Custard apple ice cream, gold dust',          category: 'sundaes',     tags: ['Premium', 'Local'],  img: sithaphalRoyalImg, price: '₹399', badge: 'Signature' },
  { id: 20, name: 'Royal Chocolate Overload', sub: 'Dark choc, brownie, fudge drizzle',           category: 'sundaes',     tags: ['Rich', 'Indulgent'], img: royalChocImg,   price: '₹419', badge: 'Bestseller' },
  { id: 21, name: 'Belgian Nut Indulgence',   sub: 'Belgian choc, praline, hazelnut brittle',     category: 'sundaes',     tags: ['Luxury'],            img: belgianNutImg,  price: '₹449', badge: 'Premium' },
  // Ice Creams
  { id: 7, name: 'Black Sesame', sub: 'Toasted sesame, sea salt', category: 'icecreams', tags: ['Artisanal'], img: blackSesameImg, price: '₹310' },
  { id: 8, name: 'Rose Pistachio', sub: 'Floral notes, pistachio crunch', category: 'icecreams', tags: ['Luxury'], img: rosePistachioImg, price: '₹340', badge: 'Premium' },
  { id: 9, name: 'Coffee Praline', sub: 'Cold brew, almond praline', category: 'icecreams', tags: ['Bold'], img: coffeePralineImg, price: '₹320' },
  // Milkshakes
  { id: 10, name: 'Classic Cold Coffee', sub: 'Cold brew, whole milk', category: 'milkshakes', tags: ['Classic'], img: classicColdCoffeeImg, price: '₹220' },
  { id: 11, name: 'Vanilla Malt', sub: 'Creamy malt base', category: 'milkshakes', tags: ['Classic'], img: vanillaMaltImg, price: '₹199', badge: 'Best Value' },
  { id: 12, name: 'Strawberry Cream', sub: 'Fresh strawberries, cream', category: 'milkshakes', tags: ['Fruity'], img: strawberryCreamImg, price: '₹229' },
  // Thickshakes — new flavours
  { id: 13, name: 'Midnight Belgian Silk',   sub: 'Ultra-dark Belgian cacao, silk finish',    category: 'thickshakes', tags: ['Rich', 'Popular'],   img: midnightBelgianImg, price: '₹319', badge: 'Fan Fave' },
  { id: 14, name: 'Alphonso Mango Creamery', sub: 'Sun-ripened Alphonso, rich cream',         category: 'thickshakes', tags: ['Fruity', 'Seasonal'],  img: alphonsoMangoImg,   price: '₹299' },
  { id: 15, name: 'Berry Velvet Crush',      sub: 'Mixed berries, blackberry, cream blend',   category: 'thickshakes', tags: ['Fruity'],              img: berryVelvetImg,     price: '₹289', badge: 'New' },
  { id: 22, name: 'Dark Roast Creamshake',   sub: 'Cold brew espresso, velvety cream',        category: 'thickshakes', tags: ['Bold', 'Bestseller'],  img: darkRoastImg,       price: '₹309', badge: 'Bestseller' },
  // Warm Specials
  { id: 16, name: 'Warm Brownie Scoop', sub: 'Fudge brownie, vanilla scoop', category: 'warm-specials', tags: ['Comfort'], img: warmSpecialsImg, price: '₹379', badge: 'Cozy' },
  { id: 17, name: 'Waffle & Cream', sub: 'Crispy waffle, soft serve', category: 'warm-specials', tags: ['Comfort', 'Popular'], img: warmSpecialsImg, price: '₹349' },
  // Seasonal
  { id: 18, name: 'Burnt Vanilla Fig', sub: 'Roasted fig, vanilla bean', category: 'seasonal', tags: ['Limited'], img: seasonalDropImg, price: '₹399', badge: 'Limited' },
  { id: 19, name: 'Yuzu Milk Sorbet', sub: 'Bright citrus, silk texture', category: 'seasonal', tags: ['Limited', 'Summer'], img: seasonalDropImg, price: '₹369', badge: 'New' },
];

// ─── Featured Item (Next Sunday Special) ─────────────────────────────────────

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.25 } },
};

// ─── Helper ───────────────────────────────────────────────────────────────────
function getCategoryAccent(key: CategoryKey): string {
  const found = ALL_CATEGORIES.find(c => c.key === key);
  return found?.accentColor ?? '#c9935a';
}

// ─── Helper: map category key to target route ─────────────────────────────────
function getCategoryRoute(key: CategoryKey): string {
  const ROUTES: Record<CategoryKey, string> = {
    scoops: '/scoops',
    sundaes: '/sundaes',
    thickshakes: '/thickshakes',
    'warm-specials': '/warm-specials',
    milkshakes: '/thickshakes', // milkshakes live under same page
    icecreams: '/sundaes',      // icecreams live under sundaes page
    seasonal: '/',
  };
  return ROUTES[key] ?? '/';
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ItemCard Component
// ═══════════════════════════════════════════════════════════════════════════════
function ItemCard({ item }: { item: MenuItem }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const accent = getCategoryAccent(item.category);
  const handleClick = () => navigate(getCategoryRoute(item.category));

  return (
    <motion.div
      variants={cardVariant}
      className={styles.itemCard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{ '--card-accent': accent, cursor: 'pointer' } as React.CSSProperties}
    >
      {item.badge && <div className={styles.itemBadge}>{item.badge}</div>}

      <div className={styles.itemImageWrap}>
        <img src={item.img} alt={item.name} className={styles.itemImage} loading="lazy" />
        <div className={styles.itemImageOverlay} />

        {/* Hover marquee */}
        <div className={styles.itemMarquee}>
          <div className={styles.itemMarqueeInner}>
            {[1, 2, 3].map(i => (
              <span key={i}>{item.name.toUpperCase()} • THE RARE SCOOP •&nbsp;</span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.itemBody}>
        <div className={styles.itemTags}>
          {item.tags.map(t => (
            <span key={t} className={styles.itemTag}>{t}</span>
          ))}
        </div>
        <h3 className={styles.itemName}>{item.name}</h3>
        <p className={styles.itemSub}>{item.sub}</p>
      </div>

      <div className={styles.itemFooter}>
        <span className={styles.itemPrice}>{item.price}</span>
        <div className={`${styles.itemOrder} ${hovered ? styles.itemOrderVisible : ''}`}>
          <span>View All</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CategoryDetailView Component
// ═══════════════════════════════════════════════════════════════════════════════
function CategoryDetailView({
  category,
  onBack,
}: {
  category: Category;
  onBack: () => void;
}) {
  const items = MENU_DATA.filter(i => i.category === category.key);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      className={styles.detailView}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Category Hero Banner */}
      <div className={styles.detailHero} style={{ '--cat-accent': category.accentColor } as React.CSSProperties}>
        <div className={styles.detailHeroImg}>
          <img src={category.heroImg} alt={category.label} />
          <div className={styles.detailHeroShade} />
        </div>
        <div className={styles.detailHeroContent}>
          <motion.div {...{ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }}>
            <span className={styles.detailEyebrow}>{category.emoji} {category.tagline}</span>
            <h1 className={styles.detailTitle}>{category.label}</h1>
            <p className={styles.detailDesc}>{category.description}</p>
            <div className={styles.detailMeta}>
              <span className={styles.detailMetaItem}>{items.length} items</span>
              <span className={styles.detailMetaDot} />
              <span className={styles.detailMetaItem}>Handcrafted</span>
              <span className={styles.detailMetaDot} />
              <span className={styles.detailMetaItem}>Daily Fresh</span>
            </div>
          </motion.div>
        </div>

        {/* Back button inside banner */}
        <button className={styles.detailBackBtn} onClick={onBack} aria-label="Back to menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span>All Categories</span>
        </button>
      </div>

      {/* Items Grid */}
      <div className={styles.detailGridSection}>
        <AnimatePresence mode="wait">
          <motion.div
            key={category.key}
            className={styles.detailGrid}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {items.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Order Strip */}
      <div className={styles.detailOrderStrip}>
        <div className={styles.detailOrderInner}>
          <span className={styles.detailOrderText}>Ready to order?</span>
          <div className={styles.detailOrderBtns}>
            <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer" className={`${styles.detailOrderBtn} ${styles.swiggy}`}>
              Order on Swiggy
            </a>
            <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer" className={`${styles.detailOrderBtn} ${styles.zomato}`}>
              Order on Zomato
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MenuPage — Main
// ═══════════════════════════════════════════════════════════════════════════════
export default function MenuPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Parallax on hero section
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroRef.current.style.setProperty('--parallax-y', `${scrollY * 0.3}px`);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // SEO and Scroll to Top
  useEffect(() => {
    document.title = activeCategory
      ? `${activeCategory.label} — The Rare Scoop`
      : 'Menu — The Rare Scoop';
    window.scrollTo(0, 0);
  }, [activeCategory]);

  const handleCategoryClick = useCallback((cat: Category) => {
    if (cat.route) {
      navigate(cat.route);
    } else {
      setActiveCategory(cat);
    }
  }, [navigate]);

  const handleBack = useCallback(() => {
    setActiveCategory(null);
  }, []);

  // ── If a category is selected, show detail view ──────────────────────────
  if (activeCategory) {
    return (
      <div className={styles.page}>
        <nav className={styles.nav}>
          <button className={styles.backBtn} onClick={() => navigate('/')} aria-label="Back to home">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <span>Home</span>
          </button>
          <div className={styles.navLogo} onClick={() => navigate('/')}>
            <img src={rarelogo} alt="The Rare Scoop" className={styles.logoImg} />
            <span className={styles.logoText}>The Rare Scoop</span>
          </div>
          <div className={styles.navSpacer} />
        </nav>
        <div className={styles.navOffset} />

        <AnimatePresence mode="wait">
          <CategoryDetailView
            key={activeCategory.key}
            category={activeCategory}
            onBack={handleBack}
          />
        </AnimatePresence>

        <Enquiry />
        <Footer />
      </div>
    );
  }

  // ── Main menu page ────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      {/* ── HOME BUTTON ─────────────────────────────────────────────────── */}
      <button className={styles.homeBtn} onClick={() => navigate('/')} aria-label="Back to home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        <span>Home</span>
      </button>

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className={styles.hero} ref={heroRef}>
        {/* Video background */}
        <div className={styles.heroVideoWrap}>
          <video
            ref={videoRef}
            className={`${styles.heroVideo} ${heroLoaded ? styles.heroVideoLoaded : ''}`}
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            onCanPlayThrough={() => setHeroLoaded(true)}
          />
          {/* Gradient overlays */}
          <div className={styles.heroGradientTop} />
          <div className={styles.heroGradientBottom} />
          <div className={styles.heroGradientLeft} />
        </div>

        {/* Main hero content */}
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className={styles.heroTextBlock}
          >
            <span className={styles.heroEyebrow}>— The Full Collection</span>
            <h1 className={styles.heroTitle}>
              Indulge in<br />
              <span className={styles.heroTitleAccent}>Every Scoop</span>
            </h1>
            <p className={styles.heroSub}>
              Freshly made delights for every craving
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className={styles.heroCta}
                onClick={() => {
                  document.getElementById('menu-categories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span>Explore Menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </button>
            </motion.div>
          </motion.div>

          {/* Featured Item Card Removed */}
        </div>

        {/* Scroll cue */}
        <motion.div
          className={styles.scrollCue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className={styles.scrollLine} />
          <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* ── CATEGORIES SECTION ──────────────────────────────────────────── */}
      <section className={styles.categoriesSection} id="menu-categories">
        <div className={styles.categoriesHeader}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.sectionEyebrow}>— Browse by Category</span>
            <h2 className={styles.sectionTitle}>What are you <span className={styles.sectionTitleGold}>craving today?</span></h2>
          </motion.div>
        </div>


        {/* Main 4 categories grid */}
        <motion.div
          className={styles.categoriesGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.key}
              variants={fadeUp}
              className={styles.categoryCard}
              style={{ '--cat-accent': cat.accentColor } as React.CSSProperties}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className={styles.categoryCardImageWrap}>
                <img src={cat.heroImg} alt={cat.label} className={styles.categoryCardImage} loading="lazy" />
                <div className={styles.categoryCardShade} />
                <div className={styles.categoryCardGlow} />
              </div>

              <div className={styles.categoryCardContent}>
                <h3 className={styles.categoryCardTitle}>{cat.label}</h3>
                <p className={styles.categoryCardTagline}>{cat.tagline}</p>
                <div className={styles.categoryCardArrow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* More Categories Removed */}
      </section>



      {/* Guest Favourites Removed */}

      <Enquiry />
      <Footer />
    </div>
  );
}
