'use client'
import { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { admin_check } from "@/_server";

import styles from "@/_styles/nav_menu.module.css";

type NavModel = {
  link: string,
  text: string,
  type: `link` | `button`,
}

export const NavMenu = () => {
  const [nav_menu, set_nav_menu] = useState([] as NavModel[]);

  const nav_default: NavModel[] = [
    {
      text: `Properties`,
      type: `link`,
      link: `/properties`
    },
    {
      text: `Contact`,
      type: `link`,
      link: `/contact_us`
    }
  ];
  
  useEffect(() => {
    (async () => {
      const login = await admin_check(localStorage.getItem(`user`));
      let new_nav: NavModel[] = nav_default;
      new_nav = login ? [...new_nav, {text: `List Your Property`, link: `/form`, type: `link`}] : new_nav;
      set_nav_menu([...new_nav]);
    })();
  }, []);

  return (
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
        {
          nav_menu.map((nav, i) => (
            <li key={i}>
              <div><Link href={nav.link}>{nav.text}</Link></div>
            </li>
          ))
        }
      </ul>
      
      {/* <ul className={[styles.nav, styles.setting].join(' ')}>
        <li>
          <div>Currency - Baht</div>
        </li>
        <li>
          <div>Language</div>
        </li>
      </ul> */}
    </header>
  )
}