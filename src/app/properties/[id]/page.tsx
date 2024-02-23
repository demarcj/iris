'use client';
import { useState, useEffect } from "react";

// Firebase
import { collection, getDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from "@/firebase/firebase"

// Nextjs
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel } from "@fortawesome/free-solid-svg-icons";

import { PropertyModel } from "@/_models";

import styles from "@/_styles/properties.module.css";

const Property = () => {
  const [property, set_property] = useState({} as PropertyModel);

  const param = useParams<{ id: string }>();

  useEffect(() => {
    const q = query(collection(db, `properties`));
    onSnapshot(q, (querySnapshot) => {
      let items: any[] = [];
      querySnapshot.forEach(item => { items = [item.data(), ...items]; });
      const item = items.find(item => item.id === param.id);
      set_property(item);
    })
  }, []);

  return (
    <>
      <div>
        <Image
          className={styles.hero}
          src={property.img}
          width={2000}
          height={2000}
          alt="" 
        />
      </div>
      <main>
        <h2 className={styles.property_name}>{property.name} - Near {property.area}</h2>
        <section>
        <div className={styles.property_detail}>
          <div><FontAwesomeIcon icon={faBed} /> : {property.bedrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {property.type}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {property.size}</div>
        </div>
        </section>
      </main>
    </>
  )
}

export default Property