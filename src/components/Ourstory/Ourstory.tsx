import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import styles from './Ourstory.module.css'

const CARD_DATA = [
  {
    number: '01',
    title: 'Live delivery slots',
    desc: 'Book priority, standard, or late-night delivery windows with instant availability shown before checkout.',
    note: 'Real-time timing visibility',
  },
  {
    number: '02',
    title: 'Luxury gifting',
    desc: 'Send curated pint boxes, handwritten notes, and scheduled celebrations from one seamless gifting flow.',
    note: 'Curated for memorable moments',
  },
  {
    number: '03',
    title: 'Tasting flights',
    desc: 'Create chef-picked mini flights for events, first-time discovery, or rare-ingredient exploration.',
    note: 'Discovery in every set',
  },
  {
    number: '04',
    title: 'Scheduled moments',
    desc: 'Plan recurring deliveries, office celebrations, and dinner-party arrivals months in advance.',
    note: 'Set once, delight often',
  },
  {
    number: '05',
    title: 'Exclusive drop alerts',
    desc: 'Save favorites and get notified when seasonal releases return or sell-out inventory opens again.',
    note: 'Never miss a seasonal release',
  },
  {
    number: '06',
    title: 'Smart delivery zones',
    desc: 'Zone-aware estimates help guests discover coverage, timing, and insulated packaging options.',
    note: 'Coverage with confidence',
  },
]

interface Spark {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

interface CardProps {
  number: string
  title: string
  desc: string
  note: string
}

function TiltCard({ title, desc, note }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const [sparks, setSparks] = useState<Spark[]>([])
  const counterRef = useRef(0)

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 })

  const rotateX = useTransform(mouseYSpring, [0, 1], [12, -12])
  const rotateY = useTransform(mouseXSpring, [0, 1], [-12, 12])
  const glareX = useTransform(mouseXSpring, [0, 1], [-50, 150])
  const glareY = useTransform(mouseYSpring, [0, 1], [-50, 150])

  const spawnSparks = useCallback((clientX: number, clientY: number) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const localX = clientX - rect.left
    const localY = clientY - rect.top
    const count = 5 + Math.floor(Math.random() * 4) // 5 to 8 subtle glowing sparks
    const newSparks: Spark[] = Array.from({ length: count }, () => {
      counterRef.current += 1
      return {
        id: counterRef.current,
        x: localX + (Math.random() - 0.5) * 60,
        y: localY + (Math.random() - 0.5) * 40,
        size: 2 + Math.random() * 3, // Tiny, elegant dust motes 2-5px
        opacity: 0.4 + Math.random() * 0.6 // Variable brightness
      }
    })
    setSparks(prev => [...prev, ...newSparks])
    newSparks.forEach(s => {
      window.setTimeout(() => {
        setSparks(prev => prev.filter(spark => spark.id !== s.id))
      }, 1500) // Longer, slower fade out for luxury feel
    })
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    spawnSparks(e.clientX, e.clientY)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    spawnSparks(touch.clientX, touch.clientY)
  }

  return (
    <motion.article
      ref={ref}
      tabIndex={0}
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      onTouchStart={handleTouchStart}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ scale: 1.07, zIndex: 20 }}
      whileTap={{ scale: 0.97, zIndex: 20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className={styles.card}>
        <motion.div
          className={styles.glare}
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 230, 180, 0.1) 0%, rgba(255,255,255,0) 65%)',
            left: useTransform(glareX, v => `${v}%`),
            top: useTransform(glareY, v => `${v}%`),
          }}
        />



        <motion.div
          className={styles.cardContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
          >
            {title}
          </motion.h3>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
          >
            {desc}
          </motion.p>

          <motion.small
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
          >
            {note}
          </motion.small>
        </motion.div>
      </div>

      {/* Orbital ring visible on hover */}
      <div className={styles.orbitalRing} aria-hidden="true">
        <div className={styles.ringPath1} />
        <div className={styles.ringPath2} />
        <div className={styles.ringPath3} />
        <motion.div

          className={styles.particleWrapper}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        >
          <div className={styles.particle} />
        </motion.div>
      </div>

      <AnimatePresence>
        {sparks.map(s => (
          <motion.div
            key={s.id}
            initial={{ opacity: s.opacity, y: 0, x: 0, scale: 0.5 }}
            animate={{
              opacity: 0,
              y: -(80 + Math.random() * 70), // Fluid floating dynamics
              x: (Math.random() - 0.5) * 50,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 + Math.random() * 0.6, ease: 'easeOut' }}
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              backgroundColor: '#ffd180',
              boxShadow: '0 0 12px 2px rgba(255, 200, 100, 0.5)',
              borderRadius: '50%',
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: 30
            }}
          />
        ))}
      </AnimatePresence>
    </motion.article>
  )
}

export default function Ourstory() {
  const duplicatedCards = [...CARD_DATA, ...CARD_DATA, ...CARD_DATA]
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInteracting = useRef(false)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    isInteracting.current = true
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeftStart.current = scrollRef.current.scrollLeft
  }

  const handlePointerRelease = () => {
    isInteracting.current = false
    isDragging.current = false
  }

  const handlePointerMove = (clientX: number) => {
    if (!scrollRef.current || !isDragging.current) return
    const x = clientX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    e.preventDefault()
    handlePointerMove(e.pageX)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    isInteracting.current = true
    isDragging.current = true
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft
    scrollLeftStart.current = scrollRef.current.scrollLeft
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    handlePointerMove(e.touches[0].pageX)
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    if (Math.abs(e.deltaX) > 0) {
      scrollRef.current.scrollLeft += e.deltaX
    } else if (Math.abs(e.deltaY) > 0 && e.shiftKey) {
      scrollRef.current.scrollLeft += e.deltaY
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    el.scrollLeft = el.scrollWidth / 3

    let rafId = 0
    let inView = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(el)

    const scroll = () => {
      if (!isDragging.current && inView) {
        el.scrollLeft += 1
      }
      if (el.scrollLeft >= (el.scrollWidth / 3) * 2) {
        el.scrollLeft -= el.scrollWidth / 3
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += el.scrollWidth / 3
      }
      rafId = requestAnimationFrame(scroll)
    }

    rafId = requestAnimationFrame(scroll)
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <section className={styles.ourstory}>
      <div className={styles.container}>

        <motion.p
          className={styles.overline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          THE EXPERIENCE
        </motion.p>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Built beyond simple ordering.
        </motion.h2>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          From custom tasting flights to scheduled gifting and members-only drops,
          the web app supports a modern premium dessert operation end to end.
        </motion.p>

        <div
          className={styles.carousel}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handlePointerRelease}
          onMouseLeave={handlePointerRelease}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handlePointerRelease}
          onWheel={handleWheel}
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          <div className={styles.carouselTrack}>
            {duplicatedCards.map((card, idx) => (
              <TiltCard key={idx} {...card} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
