import React from 'react';
import styles from './Enquiry.module.css';

const Enquiry: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.getInTouch}>GET IN TOUCH</p>
          <h1 className={styles.title}>Bring rare scoops to your next occasion.</h1>
          <p className={styles.subtitle}>
            From private tastings and corporate gifting to custom dessert drops, we help you craft a premium ice cream experience with speed, elegance, and a cloud-kitchen edge.
          </p>
        </div>

        <div className={styles.infoCards}>
          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>RESPONSE WINDOW</span>
            <span className={styles.infoValue}>Under 24 <span className={styles.infoValueSmall}>hrs</span></span>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>DELIVERY COVERAGE</span>
            <span className={styles.infoValue}>Citywide Zones</span>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoLabel}>BULK ORDERS</span>
            <span className={styles.infoValue}>Custom Curated</span>
          </div>
        </div>

        <div className={styles.splitSection}>
          <div className={styles.leftPanel}>
            <div className={styles.contactDetails}>
              <div className={styles.helpWithHeader}>
                <div className={styles.iconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                    <path d="M14.05 6A5 5 0 0 1 18 10" />
                  </svg>
                </div>
                <h2 className={styles.panelTitle}>Contact details</h2>
              </div>
              <p className={styles.contactIntro}>Reach the right team faster for gifting, events, delivery partnerships, and custom flavour requests.</p>
              
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <span className={styles.contactLabel}>GENERAL ENQUIRIES</span>
                    <a href="mailto:hello@therarescoop.com" className={styles.contactValue}>hello@therarescoop.com</a>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 19.5L13.5 19.5M8 2H16C17.1046 2 18 2.89543 18 4V20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20V4C6 2.89543 6.89543 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <span className={styles.contactLabel}>CALL OR WHATSAPP</span>
                    <a href="tel:+919876543210" className={styles.contactValue}>+91 98765 43210</a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <span className={styles.contactLabel}>KITCHEN OPERATIONS</span>
                    <span className={styles.contactValue}>Monday – Sunday • 12:00 PM – 1:00 AM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.helpWith}>
              <div className={styles.helpWithHeader}>
                <div className={styles.iconBox}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                     <path d="M11 4C11 8.418 7.418 12 3 12C7.418 12 11 15.582 11 20C11 15.582 14.582 12 19 12C14.582 12 11 8.418 11 4Z"/>
                     <path d="M20 3V7M18 5H22"/>
                     <circle cx="6" cy="18" r="1"/>
                   </svg>
                </div>
                <h2 className={styles.panelTitle}>What we can help with</h2>
              </div>
              <div className={styles.helpGrid}>
                <div className={styles.helpCard}>
                  <h3 className={styles.helpCardTitle}>Corporate gifting</h3>
                  <p className={styles.helpCardText}>Seasonal gift boxes, branded sleeves, and premium pints for teams or clients.</p>
                </div>
                <div className={styles.helpCard}>
                  <h3 className={styles.helpCardTitle}>Private events</h3>
                  <p className={styles.helpCardText}>Small-format catering and dessert moments crafted for launches, dinners, and soirees.</p>
                </div>
                <div className={styles.helpCard}>
                  <h3 className={styles.helpCardTitle}>Custom flavours</h3>
                  <p className={styles.helpCardText}>Signature recipes inspired by your occasion, concept, or brand collaboration.</p>
                </div>
                <div className={styles.helpCard}>
                  <h3 className={styles.helpCardTitle}>Delivery support</h3>
                  <p className={styles.helpCardText}>Zone checks, bulk order coordination, and dispatch planning across service areas.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.formHeader}>
              <div>
                <span className={styles.formTag}>ENQUIRY FORM</span>
                <h2 className={styles.formTitle}>Tell us what you're planning.</h2>
                <p className={styles.formSubtitle}>Share the basics and our team will get back with flavour suggestions, package details, and next steps.</p>
              </div>
              <div className={styles.fastReplyBadge}>FAST REPLY</div>
            </div>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">FIRST NAME</label>
                  <input type="text" id="firstName" placeholder="Jane" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">LAST NAME</label>
                  <input type="text" id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">EMAIL ADDRESS</label>
                  <input type="email" id="email" placeholder="jane@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">PHONE NUMBER</label>
                  <input type="tel" id="phone" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="inquiryType">INQUIRY TYPE</label>
                  <select id="inquiryType" defaultValue="Corporate Gifting">
                    <option value="Corporate Gifting">Corporate Gifting</option>
                    <option value="Private Events">Private Events</option>
                    <option value="Custom Flavours">Custom Flavours</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="timeline">PREFERRED TIMELINE</label>
                  <select id="timeline" defaultValue="Within 2 weeks">
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2+ Months">2+ Months</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">MESSAGE</label>
                <textarea id="message" rows={4} placeholder="Tell us about the occasion, estimated quantity, preferred flavours, and delivery zone..."></textarea>
              </div>

              <p className={styles.disclaimer}>
                By submitting, you agree to receive a response from The Rare Scoop team regarding your enquiry.
              </p>

              <button type="submit" className={styles.submitBtn}>SUBMIT ENQUIRY</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enquiry;