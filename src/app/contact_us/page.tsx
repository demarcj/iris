import { contact } from '@/_data_local';
import { format_phone_number } from "@/_function";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import styles from "@/_styles/contact.module.css";

const ContactUs = () => {
  const { email, facebook, line, phone_number } = contact;

  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.header}>Iris Pattaya Property</h1>
        <h2 className={styles.language}>Language</h2>
        <div>English, Thai</div>
      </div>
      <section className={styles.contact}>
        <a href={`tel:+${phone_number}`}>
          <FontAwesomeIcon icon={faPhone} />
          : {format_phone_number(phone_number)}
        </a>
        <div className={styles.email}>
          <a href={`mailto:${email}`} style={{marginRight: 0}}>
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          : {email}
        </div>
        <a 
            href={line}
            target="_blank"
        >
          <FontAwesomeIcon icon={['fab', 'line']}></FontAwesomeIcon>
          <div className={styles.label}>Line</div>
        </a>
        <a 
          href={facebook}
          target="_blank"
        >
          <FontAwesomeIcon icon={['fab', 'facebook']}></FontAwesomeIcon>
          <div className={styles.label}>Facebook</div>
        </a>
      </section>
      <section>
        Iris Pattaya Property will be your 1st company in Thailand you want to reach when you need any property, real estate agent, buy, sell, rental, house, villa, land, townhouse, etc. Don't hesitate to contact us anytime.
      </section>
    </main>
  )
}

export default ContactUs;