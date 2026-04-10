import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useGSAP(() => {
    const video = videoRef.current
    if (!video) return

    const initAnimation = () => {
      const duration = video.duration

      // Video scrub animation
      gsap.to(video, {
        currentTime: duration,
        ease: 'none',
        scrollTrigger: {
          trigger: `.${styles.hero}`,
          start: 'top top',
          end: '+=2000', // Scroll distance
          scrub: 1, // Smooth scrub
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }

    if (video.readyState >= 1) {
      initAnimation()
    } else {
      video.addEventListener('loadedmetadata', initAnimation)
    }

    return () => {
      video.removeEventListener('loadedmetadata', initAnimation)
    }
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Premium Icecream</p>
        <h1 className={styles.title}>Created for the Curious</h1>

        <div className={styles.buttonGroup}>
          <button className={styles.btnPrimary} onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
            EXPLORE MORE
          </button>
          <button className={styles.btnSecondary} onClick={() => document.getElementById('our-story-2')?.scrollIntoView({ behavior: 'smooth' })}>
            OUR STORY
          </button>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <video
          ref={videoRef}
          src="/Fruits_falling_into_202603292025.mp4"
          muted
          playsInline
          preload="auto"
          className={styles.heroVideo}
        />
      </div>
    </section>
  )
}
