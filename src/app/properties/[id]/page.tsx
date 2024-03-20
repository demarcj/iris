// Nextjs
import Image from 'next/image';

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel } from "@fortawesome/free-solid-svg-icons";

import { get_property } from '@/_server';

import styles from "@/_styles/property.module.css";

const Property = async ({ params }: {params: {id: string}}) => {
  const property = await get_property(params.id);

  return (
    <main className={styles.main}>
      <section className={[styles.image_container, styles.section].join(` `)}>
        <Image
          className={styles.hero}
          src={property.img}
          width={2000}
          height={2000}
          alt="" 
        />
        <div className={styles.hero_side_container}>
          { 
            !!property.images?.length && property.images?.map((image, key) => (key < 2) && (
              <Image
                className={styles.hero_side}
                key={key}
                src={image}
                width={400}
                height={400}
                alt=''
              />
            ))
          }
        </div>
      </section>
      <h1 className={styles.property_name}>{property.name} - Near {property.area}</h1>
      {
        !!property.amenities?.length && (
          <section className={styles.section}>
            <h2 className={styles.header}>Property Amenities</h2>
            <div className={styles.amenities}>
              { 
                property.amenities.map((amenity, key) => (
                  <div key={key}>{ amenity.replaceAll(`_`, ` `) }</div>
                ))
              }
            </div>
          </section>
        )
      }
      <section className={styles.section}>
        <h2 className={styles.header}>Property Details</h2>
        <div className={styles.properties_container}>
          <div><FontAwesomeIcon icon={faBed} /> : {property.bedrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {property.type}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {property.size}</div>
        </div>
      </section>
      {
        !!property.description?.length && (
          <section className={styles.section}>
            <h2 className={styles.header}>About the Property</h2>
            <div>{property.description}</div>
          </section>
        )
      }
    </main>
  )
}

export default Property;