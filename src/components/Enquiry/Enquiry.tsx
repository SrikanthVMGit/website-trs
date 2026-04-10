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
          <p className={styles.tag}>Enquiry</p>
          <h1 className={styles.title}>Craft something unforgettable.</h1>
          <p className={styles.subtitle}>
            Whether it’s an intimate celebration or a statement event,
            let’s create a dessert experience that feels rare.
          </p>
        </div>

        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <input type="text" required placeholder=" " />
                <label>First Name</label>
              </div>
              <div className={styles.inputGroup}>
                <input type="text" required placeholder=" " />
                <label>Last Name</label>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <input type="email" required placeholder=" " />
                <label>Email</label>
              </div>
              <div className={styles.inputGroup}>
                <input type="tel" required placeholder=" " />
                <label>Phone</label>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <input type="text" required placeholder=" " />
                <label>Type of enquiry</label>
              </div>

              <div className={styles.inputGroup}>
                <input type="text" required placeholder=" " />
                <label>Timeline</label>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <textarea required placeholder=" " />
              <label>Your idea</label>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.btnPrimary}>
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Enquiry;