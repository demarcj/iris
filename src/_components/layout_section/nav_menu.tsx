import Link from 'next/link';
import Image from 'next/image';
import styles from "@/_styles/nav_menu.module.css";

export const NavMenu = () => (
  <header className={styles.header}>
    <Link className={styles.logo_wrapper} href="/">
      <Image
        className={styles.logo}
        src="/logo.png" 
        alt=""
        width={75}
        height={75}
      />
    </Link>
    <ul className={styles.nav}>
      {/* <li>
        <div><Link href="/">Home</Link></div>
      </li> */}
      <li>
        <div><Link href="/properties">Properties</Link></div>
      </li>
      <li>
        <div><Link href="/contact_us">Contact</Link></div>
      </li>
      <li>
        <div>
          <Link href="/form"> List Your Property </Link> 
        </div>
      </li>
    </ul>
    
    {/* <ul className={[styles.nav, styles.setting].join(' ')}>
      <li>
        <div>Currency - Baht</div>
      </li>
      <li>
        <div>Language</div>
      </li>
      <li>
        <div>
          <Link href="/form"> List Your Property </Link> 
        </div>
      </li>
    </ul> */}
  </header>
)