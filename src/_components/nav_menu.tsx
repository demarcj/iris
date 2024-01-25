import Link from 'next/link';

import styles from "@/_styles/nav_menu.module.css";

export const NavMenu = () => (
  <header className={styles.header}>
    <ul className={styles.nav}>
      <li>
        <div><Link href="./" >Home</Link></div>
      </li>
    </ul>
    <div className={styles.logo_wrapper}>
      <Link href="./">
        <img
          className={styles.logo}
          src="logo.png" alt="" 
        />
      </Link>
    </div>
    <ul className={[styles.nav, styles.setting].join(' ')}>
      <li>
        <div>Currency - Baht</div>
      </li>
      <li>
        <div>Language</div>
      </li>
      <li>
        <div>
          <Link href="/forum"> List Your Property </Link> 
        </div>
      </li>
    </ul>
  </header>
)