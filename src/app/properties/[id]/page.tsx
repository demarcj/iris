'use client'
import Image from 'next/image';
import { PropertyObject } from "@/_store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'next/navigation';
import styles from "@/_styles/properties.module.css";

const Property = () => {
  const param = useParams<{ id: string }>();
  const property = PropertyObject[param.id];

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
        <h2 className={styles.property_name}>{property.property_name} - Near {property.area}</h2>
        <section>
        <div className={styles.property_detail}>
          <div><FontAwesomeIcon icon={faBed} /> : {property.num_bedrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {property.property_type}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {property.size}</div>
        </div>
        </section>
      </main>
    </>
  )
}

export default Property