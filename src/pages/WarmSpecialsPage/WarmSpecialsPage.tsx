import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import styles from "./WarmSpecialsPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import brownieImg from "../../assets/brownie_warm.png";
import applePieImg from "../../assets/apple_pie_warm.png";
import halwaImg from "../../assets/halwa_warm.png";
import gulabJamunImg from "../../assets/gulab_jamun_warm.png";
import lavaCakeImg from "../../assets/lava_cake_warm.png";
import malpuaImg from "../../assets/malpua_warm.png";
import heroBg from "../../assets/warm_specials_hero_bg.png";
import premiumBg from "../../assets/warm_hero_premium_bg.png";

// Cinematic Particles
const SteamEmbers = () => (
  <div className={styles.particleContainer}>
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className={styles.particle}
        initial={{ 
          opacity: 0, 
          y: "100%", 
          x: `${Math.random() * 100}%`,
          scale: Math.random() * 0.5 + 0.5
        }}
        animate={{ 
          opacity: [0, 0.4, 0], 
          y: "-10%",
          x: `${(Math.random() * 100) + (Math.random() * 20 - 10)}%`
        }}
        transition={{ 
          duration: Math.random() * 4 + 4, 
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "linear"
        }}
        style={{
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          background: "var(--color-golden)",
          filter: "blur(2px)",
          position: "absolute",
          borderRadius: "50%"
        }}
      />
    ))}
  </div>
);

const ALL_WARM_ITEMS = [
  {
    id: 1,
    title: "Sizzling Dark Brownie",
    subtitle: "A Masterpiece of contrast",
    description: "Our signature dark chocolate brownie, served on a sizzling hot cast iron platter. The heat intensifies the rich cocoa notes, while a generous scoop of cold vanilla bean ice cream creates a symphony of temperatures in every bite.",
    img: brownieImg,
    price: 299,
    highlights: ["Sizzling Platter", "Hot Fudge Drizzle", "Madagascar Vanilla"]
  },
  {
    id: 2,
    title: "Classic Warm Apple Pie",
    subtitle: "Baked with love",
    description: "Hand-crafted flaky pastry filled with cinnamon-spiced Granny Smith apples. Baked until golden and served warm, it's the perfect companion to our creamy ice cream, melting slowly to create a delicious caramel-like glaze.",
    img: applePieImg,
    price: 349,
    highlights: ["Spiced Apples", "Flaky Crust", "Cinnamon Dust"]
  },
  {
    id: 3,
    title: "Artisanal Gajar Halwa",
    subtitle: "Tradition in every bite",
    description: "Grated carrots slow-cooked with milk, ghee, and roasted nuts. This traditional Indian dessert is served warm, offering a rich, earthy sweetness that pairs beautifully with a simple vanilla scoop.",
    img: halwaImg,
    price: 329,
    highlights: ["Slow-Cooked", "Roasted Nuts", "Pure Ghee"]
  },
  {
    id: 4,
    title: "Hot Gulab Jamun Duo",
    subtitle: "Melting Moments",
    description: "Soft, golden-brown dumplings soaked in a warm saffron and cardamom syrup. Served hot, they offer a delicate melt-in-the-mouth texture that contrasts exquisitely with our signature cold ice cream.",
    img: gulabJamunImg,
    price: 349,
    highlights: ["Saffron Syrup", "Cardamom Notes", "Melt-in-mouth"]
  },
  {
    id: 5,
    title: "Choco Lava Molten Cake",
    subtitle: "The Infinite Flow",
    description: "A decadent dark chocolate cake with a molten liquid center that erupts with flavor. Served with a quenelle of madagascar vanilla ice cream and a dusting of gold leaf.",
    img: lavaCakeImg,
    price: 389,
    highlights: ["Molten Core", "Dark Cocoa", "Gold Leaf"]
  },
  {
    id: 6,
    title: "Artisanal Warm Malpua",
    subtitle: "A Saffron Dream",
    description: "Traditional Indian pancakes soaked in a fragrant saffron-infused syrup, topped with thick rabri and roasted nuts. A warm, comforting hug in a bowl.",
    img: malpuaImg,
    price: 369,
    highlights: ["Saffron Rabri", "Pistachio Garnish", "Cardamom Syrup"]
  }
];

export default function WarmSpecialsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  const cycleCompletedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setActiveIdx((prev) => {
          const next = prev + 1;
          if (next >= ALL_WARM_ITEMS.length) {
            cycleCompletedRef.current = true;
            setAutoPlayActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return prev; // stay on last item
          }
          return next;
        });
      }, 7000); // 7 seconds
    };

    if (autoPlayActive && !cycleCompletedRef.current) {
      startTimer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlayActive]);

  const handleManualSelect = (index: number) => {
    setAutoPlayActive(false);
    setActiveIdx(index);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const activeItem = ALL_WARM_ITEMS[activeIdx];

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <main className={styles.content}>
        <section className={styles.heroSection}>
          <motion.div 
            className={styles.heroBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
             <img src={premiumBg} className={styles.heroBgImage} alt="" />
             <div className={styles.heroOverlay} />
          </motion.div>

          <div className={styles.heroLayout}>
            <SteamEmbers />
            <div className={styles.cinematicOverlay} />
            
            <motion.div 
              className={styles.heroContent}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.4, delayChildren: 0.3 }
                }
              }}
            >
              <motion.div 
                className={styles.vintageTag}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 0.6, scale: 1 } }}
              >
                ESTD 2024
              </motion.div>
              
              <motion.p 
                className={styles.eyebrow}
                variants={{ 
                  hidden: { opacity: 0, y: 20 }, 
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } } 
                }}
              >
                — Seasonal Curations
              </motion.p>
              
              <motion.h1 
                className={styles.title}
                variants={{ 
                  hidden: { opacity: 0, y: 40 }, 
                  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } } 
                }}
              >
                Warm <br/>
                <span className={styles.glowText}>Specials</span>
              </motion.h1>
              
              <motion.p 
                className={styles.heroDesc}
                variants={{ 
                  hidden: { opacity: 0, y: 30 }, 
                  visible: { opacity: 0.7, y: 0, transition: { duration: 1.8 } } 
                }}
              >
                A curated symphony of heat and cold. Discover the perfect temperature contrast with our signature warm desserts, designed to melt your worries away.
              </motion.p>
              
              <motion.div 
                className={styles.floatingTag}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                PREMIUM ARTISANAL SELECTION
              </motion.div>
            </motion.div>
          </div>

          <div className={styles.scrollIndicator}>
            <div className={styles.mouse}>
              <div className={styles.wheel}></div>
            </div>
          </div>
        </section>

        <section id="collection" className={styles.collectionSection}>
           <div className={styles.collectionHeader}>
              <p className={styles.eyebrow}>— The Collection</p>
              <h2 className={styles.sectionTitle}>Signature Warm Pairings</h2>
           </div>

           <div className={styles.showcaseGrid}>
              <div className={styles.listColumn}>
                 {ALL_WARM_ITEMS.map((item, index) => (
                   <motion.div 
                    key={item.id}
                    className={`${styles.listItem} ${activeIdx === index ? styles.listItemActive : ''}`}
                    onMouseEnter={() => handleManualSelect(index)}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                   >
                     <span className={styles.listNum}>0{index + 1}</span>
                     <h3 className={styles.listTitle}>{item.title}</h3>
                     <span className={styles.listSubtitle}>{item.subtitle}</span>
                   </motion.div>
                 ))}
              </div>

              <div className={styles.displayColumn}>
                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeIdx}
                      className={styles.displayWrapper}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                       <div className={styles.imageBox}>
                          <img src={activeItem.img} alt={activeItem.title} className={styles.displayImage} />
                          <div className={styles.heatHazeOverlay} />
                          
                          {/* Steam Animation */}
                          <div className={styles.steamContainer}>
                             {[...Array(3)].map((_, i) => (
                               <div key={i} className={`${styles.steam} ${styles[`steam${i+1}`]}`} />
                             ))}
                          </div>
                       </div>

                       <div className={styles.displayInfo}>
                          <p className={styles.displayDesc}>{activeItem.description}</p>
                          <div className={styles.displayHighlights}>
                             {activeItem.highlights.map(h => (
                               <span key={h} className={styles.highlightTag}>{h}</span>
                             ))}
                          </div>
                          <p className={styles.displayPrice}>₹{activeItem.price}</p>
                       </div>
                    </motion.div>
                 </AnimatePresence>
                 
                 {autoPlayActive && (
                   <div className={styles.timerBar}>
                      <motion.div 
                        key={activeIdx}
                        className={styles.timerProgress}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 7, ease: "linear" }}
                      />
                   </div>
                 )}
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
