'use client';
import { useEffect, useState } from 'react';

// server
import { get_properties, get_hot_deal } from '@/_server';

import styles from "./page.module.css";
import Image from 'next/image';
import { Carousel } from "@/_components/ui";
import { PropertyModel } from '@/_models';

type MainSection = {
  name: string;
  properties: PropertyModel[];
}

export default function Home() {
  const [properties_section, set_properties_section] = useState([] as MainSection[]);

  const main_sections = [`Popular Properties`, `Hot Deal Properties`];
  
  useEffect(() => {
    (async() => {
      const popular = await get_properties();
      const hot_deal = await get_hot_deal();
      const main_list: MainSection[] = main_sections.map((section, index) => {
        const data = index === 0 ? popular : hot_deal;
        const properties = !!data.properties?.length ? data.properties : []; 
  
        return {
          name: section,
          properties: properties as PropertyModel[]
        }
      })
      set_properties_section(main_list);
    })()
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
        {
          !!properties_section.length && properties_section.map((section, i) => (
            <section 
              key={i} 
              className={styles.carousel_container}
              style={{display: !!section.properties.length ? `block` : `none`}}
            >
              <h2 className={styles.carousel_header}>{ section.name }</h2>
              <Carousel items={section.properties}/>
            </section>
          ))
        }
      </main>
    </>
  );
}
