// Components
import { LoginNav } from './'

// Constants
import { NavList, NavMap } from '@/_constants';
import { LanguageToggleMap } from '@/_constants/locale';

// Nextjs
import Link from 'next/link';
import Image from 'next/image';

// Styles
import styles from "@/_styles/nav_menu.module.css";

export const NavMenu = async ({language}: {language: keyof typeof LanguageToggleMap}) => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo_wrapper} href={`/${Object.is(language, `en`) ? `` : language}`}>
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
          NavList.map((nav, i) => (
            <li key={i}>
              <div>
                <Link 
                  href={NavMap[nav][language].link}
                >
                  {NavMap[nav][language].text}
                </Link>
              </div>
            </li>
          ))
        }
        <LoginNav language={language} />
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