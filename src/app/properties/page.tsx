'use client';
import {useState, useEffect} from "react";

import { PropertyCardVertical } from "@/_components/ui";
import styles from "@/_styles/properties.module.css";

// Nextjs
import Image from 'next/image';

// Firebase
import { collection, getDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from "@/firebase/firebase";

const Properties = () => {
  const [cards, set_cards] = useState([] as any[])

  useEffect(() => {
    const q = query(collection(db, `properties`));
    onSnapshot(q, (querySnapshot) => {
      let items: any[] = [];
      querySnapshot.forEach(item => { items = [item.data(), ...items]; });
      set_cards(items);
    })
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