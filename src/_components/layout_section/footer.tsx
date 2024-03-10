import { contact } from '@/_data_local';

import Link from 'next/link';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import styles from "@/_styles/footer.module.css";

export const Footer = () => {
  const { email, facebook, line, phone_number } = contact
  const year = new Date().getFullYear();

  const format_phone_number = (number: number) => {
    const number_list = `${number}`.split(``);
    return number_list.map((num, index) => {
      if(index < 2){
        return ``;
      } else if(index > 7) {
        return num;
      } else if(index === 4 || index === 7) {
        return num + ` `;
      }
      return num;
    });
  }

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