import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path d="M8 12h32M8 20h20M8 28h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="36" cy="32" r="10" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M32 32l2.5 2.5L40 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Browse & Choose',
    desc: 'Explore our handcrafted flavours — from seasonal specials to all-time classics. Every scoop is made fresh in small batches.',
    highlight: 'New flavours every week',
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M16 10V8a2 2 0 0 1 4 0v2M28 10V8a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="24" cy="28" r="6" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M24 25v3l2 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Order in Minutes',
    desc: 'Place your order through Swiggy or Zomato in just a few taps. No account needed — just pick, order, and relax.',
    highlight: 'Available on Swiggy & Zomato',
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path d="M6 28h28l4-12H10L6 28z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <circle cx="16" cy="36" r="4" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="32" cy="36" r="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M34 28v-6a2 2 0 0 1 2-2h4l2 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Delivered Fresh',
    desc: 'Your ice cream is packed with dry ice in insulated boxes, ensuring it arrives at the perfect temperature — every time.',
    highlight: 'Packed with dry ice',
  },
  {
    number: '04',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path d="M24 8C15.2 8 8 15.2 8 24s7.2 16 16 16 16-7.2 16-16S32.8 8 24 8z" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M16 24l5 5 11-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 14v4M30 16l-2 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    title: 'Savour Every Bite',
    desc: 'Enjoy premium ice cream crafted with the finest ingredients — an indulgent experience designed to be shared or savoured solo.',
    highlight: 'Premium, small-batch craft',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">

      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>Simple as that</span>
        <h2 className={styles.title}>
          Premium ice cream, <em>at your door</em>
        </h2>
        <p className={styles.subtitle}>
          From our cloud kitchen to your doorstep — here's how the magic happens in four easy steps.
        </p>
      </div>

      {/* ── Steps ── */}
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div key={step.number} className={styles.step}>

            {/* Connector line between steps */}
            {i < steps.length - 1 && (
              <div className={styles.connector} aria-hidden="true">
                <div className={styles.connectorLine} />
                <div className={styles.connectorArrow}>›</div>
              </div>
            )}

            {/* Card */}
            <div className={styles.card}>
              <div className={styles.numberBadge}>{step.number}</div>
              <div className={styles.iconWrap}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              <span className={styles.highlight}>✦ {step.highlight}</span>
            </div>

          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className={styles.cta}>
        <p className={styles.ctaText}>Ready to treat yourself?</p>
        <div className={styles.ctaBtns}>
          <a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${styles.swiggy}`}
          >
            Order on Swiggy
          </a>
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaBtn} ${styles.zomato}`}
          >
            Order on Zomato
          </a>
        </div>
      </div>

    </section>
  )
}
