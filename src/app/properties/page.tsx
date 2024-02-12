'use client';
import {useState, useEffect} from "react";

import { PropertyCard } from "@/_components/ui";
import styles from "@/_styles/properties.module.css";

// Firebase
import { collection, getDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from "@/firebase/firebase"

const Properties = () => {
  const [cards, set_cards] = useState([] as any[])

  useEffect(() => {
    const q = query(collection(db, `properties`));
    onSnapshot(q, (querySnapshot) => {
      let items: any[] = [];
      querySnapshot.forEach(item => { items = [item.data().values, ...items]; });
      set_cards(items);
    })
  }, []);
  

  return (
    <main> 
      <div className={styles.properties_container} >
        { cards.map((slide, i) => <PropertyCard key={i} card={slide}/>) } 
      </div>
    </main>
  )
}

export default Properties