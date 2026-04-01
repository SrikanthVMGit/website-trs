import React, { useState } from "react";
import styles from "./Enquiry.module.css";

const Enquiry = () => {
  const [formData, setFormData] = useState({ type: "", timeline: "" });

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
                <select 
                  required 
                  value={formData.type} 
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="" disabled></option>
                  <option value="corporate">Corporate</option>
                  <option value="event">Event</option>
                  <option value="custom">Custom flavours</option>
                </select>
                <label>Type of enquiry</label>
              </div>

              <div className={styles.inputGroup}>
                <select 
                  required 
                  value={formData.timeline} 
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                >
                  <option value="" disabled></option>
                  <option value="2weeks">Within 2 weeks</option>
                  <option value="1month">1 month</option>
                  <option value="later">Later</option>
                </select>
                <label>Timeline</label>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <textarea required placeholder=" " />
              <label>Your idea</label>
            </div>

            <button className={styles.flowBtn}>
              <span className={styles.flowText}>Submit enquiry</span>
              <span className={styles.flowFill}></span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Enquiry;