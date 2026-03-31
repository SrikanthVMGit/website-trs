import { useEffect, useRef, useState } from 'react'
import styles from './LoadingScreen.module.css'
import rarelogo from '../../assets/rarelogo.png'

interface Props {
  progress: number   // 0–100
  onComplete: () => void
}

export default function LoadingScreen({ progress, onComplete }: Props) {
  const [phase, setPhase] = useState<'loading' | 'flyup' | 'done'>('loading')
  const hasRevealedRef = useRef(false)

  useEffect(() => {
    if (progress >= 100 && !hasRevealedRef.current) {
      hasRevealedRef.current = true

      // 400ms pause at 100%, then start fly-up
      setTimeout(() => {
        setPhase('flyup')

        // Fly-up takes ~900ms, then fade the whole screen
        setTimeout(() => {
          setPhase('done')
          onComplete()
        }, 1100)
      }, 400)
    }
  }, [progress, onComplete])

  if (phase === 'done') return null

  return (
    <div className={`${styles.screen} ${phase === 'flyup' ? styles.flyup : ''}`}>
      {/* Decorative corner brackets */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />

      {/* Centre lockup: logo → progress bar → brand name */}
      <div className={styles.lockup}>
        {/* Logo with glow */}
        <div className={styles.logoWrap}>
          <img src={rarelogo} alt="The Rare Scoop" className={styles.logo} />
          <div className={styles.logoGlow} />
        </div>

        {/* Progress bar — sits between logo and text */}
        <div className={styles.trackWrap}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
            <div
              className={styles.dot}
              style={{ left: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className={styles.pct}>{Math.round(progress)}%</span>
        </div>

        {/* Brand name */}
        <span className={styles.brand}>The Rare Scoop</span>

        {/* Tagline — hides on fly-up */}
        <p className={styles.tagline}>Crafting rare moments</p>
      </div>
    </div>
  )
}
