'use client';
import { useEffect, useState } from 'react';

// Firebase
import { collection, getDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from "@/firebase/firebase";

import styles from "./page.module.css";
import Image from 'next/image';
import { Carousel } from "@/_components/ui";


export default function Home() {
  const [properties, set_properties] = useState([] as any[]);

  const main_sections = [`Popular Properties`, `Hot Deal Properties`];
  
  useEffect(() => {
    const q = query(collection(db, `properties`));
    onSnapshot(q, (querySnapshot) => {
      let items: any[] = [];
      querySnapshot.forEach(item => items = !!Object.keys(item.data()).length ? [{...item.data()}, ...items] : items);
      !!items.length && set_properties(items);
    });
  }, []);
  
  return (
    <>
      <section className={styles.hero_container}>
        <Image
          className={styles.hero}
          src="/hero.jpg"
          width={2000}
          height={2000}
          alt="" 
        />
      </section>
      <main>
        {!!properties.length && main_sections.map((section, i) => (
          <section key={i} className={styles.carousel_container}>
            <h2 className={styles.carousel_header}>{ section }</h2>
            <Carousel items={properties}/>
          </section>
        ))}
      </main>
    </>
  );
}
