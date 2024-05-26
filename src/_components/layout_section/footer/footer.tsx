// Component
import { FooterActivities } from './';

// Constants
import { Contact } from '@/_constants';
import { LanguageType } from '@/_constants/locale';

// Function
import { format_phone_number } from "@/_function";

// Next
import Link from 'next/link';

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Style
import styles from "@/_styles/footer.module.css";

library.add(fab);

export const Footer = ({language}: {language: LanguageType}) => {
  const { email, facebook, line, phone_number } = Contact;
  const year = new Date().getFullYear();

  return (
    <>
      <footer className={styles.footer}>
        <div className={[styles.footer_section, styles.footer_left].join(` `)}>
          <div> &#169;{year} IRis Pattaya Property </div>
          <Link className={styles.login} href={`/${language}/login`}>
            Sign In
          </Link>
          <FooterActivities language={language} />
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
    </>
  )
}