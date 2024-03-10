'use client';
import { useEffect, useState } from 'react';

// Firebase
import { collection, getDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from "@/firebase/firebase";

import styles from "./page.module.css";
import Image from 'next/image';
import { Carousel } from "@/_components/ui";
import { PropertyModel } from '@/_models';

type MainSection = {
  name: string;
  properties: PropertyModel[]
}

export default function Home() {
  const [properties_section, set_properties_section] = useState([] as MainSection[])

  const main_sections = [`Popular Properties`, `Hot Deal Properties`];
  
  useEffect(() => {
    const q = query(collection(db, `properties`));
    onSnapshot(q, (querySnapshot) => {
      let items: PropertyModel[] = [];
      querySnapshot.forEach(item => items = !!Object.keys(item.data()).length ? [{...item.data()}, ...items] as PropertyModel[] : items);
      const main_list: MainSection[] = main_sections.map((section, index) => {
        let properties;
        if(index === 0){
          properties = !!items.length ? items : [];
        }
        if(index === 1){
          properties = !!items.length ? items.filter(item => item.hot_deal) : [];
        }
        return {
          name: section,
          properties: properties as PropertyModel[]
        }
      });
      set_properties_section(main_list);
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
        {!!properties_section.length && properties_section.map((section, i) => (
          <section key={i} className={styles.carousel_container}>
            <h2 className={styles.carousel_header}>{ section.name }</h2>
            <Carousel items={section.properties}/>
          </section>
        ))}
      </main>
    </>
  );
}
