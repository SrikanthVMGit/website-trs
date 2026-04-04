import { useEffect, useRef, useState } from 'react'
import styles from './LoadingScreen.module.css'
import rarelogo from '../../assets/rarelogo.png'

interface Props {
  progress: number
  onComplete: () => void
}

export default function LoadingScreen({ progress, onComplete }: Props) {
  const [phase, setPhase] = useState<'loading' | 'flyup' | 'done'>('loading')
  const hasRevealedRef = useRef(false)

  useEffect(() => {
    if (progress >= 100 && !hasRevealedRef.current) {
      hasRevealedRef.current = true
      setTimeout(() => {
        setPhase('flyup')
        setTimeout(() => {
          setPhase('done')
          onComplete()
        }, 750)
      }, 150)
    }
  }, [progress, onComplete])

  if (phase === 'done') return null

  return (
    <div className={`${styles.screen} ${phase === 'flyup' ? styles.flyup : ''}`}>
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />
      <div className={styles.lockup}>
        <div className={styles.logoWrap}>
          <img src={rarelogo} alt="The Rare Scoop" className={styles.logo} />
          <div className={styles.logoGlow} />
        </div>
        <div className={styles.trackWrap}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
            <div className={styles.dot} style={{ left: `${Math.min(progress, 100)}%` }} />
          </div>
          <span className={styles.pct}>{Math.round(progress)}%</span>
        </div>
        <span className={styles.brand}>The Rare Scoop</span>
        <p className={styles.tagline}>Crafting rare moments</p>
      </div>
    </div>
  )
}