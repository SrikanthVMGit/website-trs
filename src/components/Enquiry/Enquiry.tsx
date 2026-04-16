import styles from "./Enquiry.module.css";

const Enquiry = () => {
  return (
    <section className={styles.section} id="enquiry">
      <div className={styles.bgAnimation}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.container}>
        <div className={styles.hero}>
          <p className={styles.tag}>Get in Touch</p>
          <h1 className={styles.title}>Bulk orders & enquiries.</h1>
          <p className={styles.subtitle}>
            Placing a bulk order, planning ahead, or just have a question?
    Drop us a message and we'll get back to you within 24 hours.
          </p>
        </div>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <input type="text" required placeholder=" " />
              <label>Name</label>
            </div>
            <div className={styles.inputGroup}>
              <input type="tel" required placeholder=" " />
              <label>Phone Number</label>
            </div>
            <div className={styles.inputGroup}>
              <input type="text" required placeholder=" " />
              <label>Type of Enquiry</label>
            </div>
            <div className={styles.inputGroup}>
              <textarea rows={5} required placeholder=" " />
              <label>Write your enquiry</label>
            </div>
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.btnPrimary}>
                <span className={styles.btnText}>SUBMIT</span>
                <span className={styles.shimmer}></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Enquiry;