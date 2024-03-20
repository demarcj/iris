import { contact } from '@/_data_local';
import { format_phone_number } from "@/_function";

import Link from 'next/link';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import styles from "@/_styles/footer.module.css";

export const Footer = () => {
  const { email, facebook, line, phone_number } = contact;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={[styles.footer_section, styles.footer_left].join(` `)}>
        <div> &#169;{year} IRis Pattaya Property </div>
        <Link href='/login'>Login</Link>
      </div>
      <div className={[styles.footer_section, styles.footer_right].join(` `)}>
        <div className={styles.contact}>
          <a 
            href={facebook}
            target="_blank"
          >
            <FontAwesomeIcon icon={['fab', 'facebook']}></FontAwesomeIcon>
          </a>
          <a 
            href={line}
            target="_blank"
          >
            <FontAwesomeIcon icon={['fab', 'line']}></FontAwesomeIcon>
          </a>
          <a href={`tel:+${phone_number}`}>
            <FontAwesomeIcon icon={faPhone} />
            : {format_phone_number(phone_number)}
          </a>
        </div>
        <div className={styles.email}>
          <a href={`mailto:${email}`} style={{marginRight: 0}}>
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          : {email}
        </div>
      </div>
    </footer> 
  )
}