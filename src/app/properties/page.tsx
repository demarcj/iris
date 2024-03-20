'use client';
import {useState, useEffect} from "react";

import { PropertyCardVertical } from "@/_components/ui";
import styles from "@/_styles/properties.module.css";

import { get_properties } from "@/_server";
import { PropertyModel } from "@/_models";

// Nextjs
import Image from 'next/image';

const Properties = () => {
  const [cards, set_cards] = useState([] as PropertyModel[]);

  useEffect(() => {
    (async () => {
      const data = await get_properties();
      set_cards(data.properties);
    })();
  }, []);
  

  return (
    <main className={[styles.main, `property_main`].join(` `)}> 
      <div className={styles.properties_container} >
        { cards.map((slide, i) => <PropertyCardVertical key={i} card={slide}/>) } 
      </div>
      <div className={styles.map}>
        <Image
          className={styles.img}
          src="/hero.jpg" 
          width={2000}
          height={2000}
          alt=''
        />
      </div>
    </main>
  )
}

export default Properties