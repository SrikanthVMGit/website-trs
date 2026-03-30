import styles from './GuestNotes.module.css';

const FAQS = [
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes. Guests can select the next available time slot, including late-evening delivery in supported zones."
  },
  {
    question: "Can I build a custom tasting box?",
    answer: "Yes. Mix mini pints, signature flavors, and live seasonal releases to create a discovery box with note cards."
  },
  {
    question: "Is gifting built into the app?",
    answer: "Yes. Choose delivery date, message, packaging tier, and recipient details in one luxury gifting workflow."
  }
];

export default function GuestNotes() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.testimonialCard}>
          <span className={styles.overline}>GUEST NOTES</span>
          <p className={styles.quote}>
            "The packaging felt like receiving perfume, the flavors tasted like dessert from a tasting menu, and the midnight delivery was flawless."
          </p>
          <div className={styles.authorInfo}>
            <div className={styles.author}>
              <span className={styles.authorName}>Rhea Malhotra</span>
              <span className={styles.authorTitle}>Collector Club member</span>
            </div>
            <span className={styles.rating}>4.9 average rating</span>
          </div>
        </div>

        <div className={styles.faqColumn}>
          <div className={styles.faqList}>
            {FAQS.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.question}>{faq.question}</h3>
                <p className={styles.answer}>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>Ready for your first rare scoop?</h3>
            <p className={styles.ctaDesc}>Order tonight, reserve a limited drop, or subscribe for monthly tasting deliveries designed for curious palates.</p>
            <button className={styles.startBtn}>START ORDER</button>
          </div>
        </div>
      </div>
    </section>
  );
}
