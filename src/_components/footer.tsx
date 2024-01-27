import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import styles from "@/_styles/footer.module.css";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_section}>
        &#169;{year} IRis Pattaya Property
      </div>
      <div className={styles.footer_section}>
        <a 
          href="https://www.facebook.com/profile.php?id=100082976690132&mibextid=ZbWKwL"
          target="_blank"
        >
          <FontAwesomeIcon icon={['fab', 'facebook']}></FontAwesomeIcon>
        </a>
        <a 
          href="https://line.me/ti/p/dG5qKVAVIg"
          target="_blank"
        >
          <FontAwesomeIcon icon={['fab', 'line']}></FontAwesomeIcon>
        </a>
        <a href="tel:+660942693647">
          <FontAwesomeIcon icon={faPhone} />
          : 094 269 3647
        </a>
        <div>
          <a href="mailto:irispattayaproperty@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          : irispattayaproperty@gmail.com
        </div>
      </div>
    </footer> 
  )
}