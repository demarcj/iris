'use client';

// Contsants
import { LanguageType, LanguageList } from "@/_constants/locale";

// Models
import { NavModel } from '@/_models';

// Nextjs
import Link from 'next/link';
import { useParams } from 'next/navigation';

// React
import { useState, useEffect } from 'react';

// Server
import { admin_check } from '@/_server';

export const LoginNav = ({language}: {language: LanguageType}) => {
  const [admin_menu, set_admin_menu] = useState<NavModel[]>([]);
  const params = useParams<{ language: LanguageType; }>()

  useEffect(() => {
    (async () => {
      const login = await admin_check(localStorage.getItem(`user`));
      const new_nav: NavModel[] = login ? [{text: `List Your Property`, link: `/${language}/form`, type: `link`}] : [];
      set_admin_menu([...new_nav]);
    })()
  }, [])

  return (
    <>
      {
        admin_menu?.length > 0 && (
          admin_menu.map((nav, i) => (
            <li key={i}>
              <div><Link href={nav.link}>{nav.text}</Link></div>
            </li>
          ))
        )
      }
    </>
  )
}