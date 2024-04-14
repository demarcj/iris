"use client";

// Nextjs
// import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useEffect, useState } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel } from "@fortawesome/free-solid-svg-icons";

// Joy UI
import Button from '@mui/joy/Button';

// Server
import { get_property, admin_check } from '@/_server';

// Model
import { PropertyModel, LoginModel } from '@/_models';

// Style
import styles from "@/_styles/property.module.css";

const Property = () => {
  const searchParams = useParams();
  const [ property, set_property ] = useState({} as PropertyModel);
  const [ loading, set_loading ] = useState(true);
  const [ is_login, set_is_login ] = useState(false)
  
  useEffect(() => {
    (async() => {
      const has_login = await admin_check(localStorage.getItem(`user`));
      const id = (searchParams.id as string) || ``;
      const property_data = await get_property(id);
      set_property(property_data);
      set_is_login(has_login); 
      set_loading(false);
    })();
  }, []);

  return (
    <>
      {
        (!loading && !!property?.id.length) && (
          <main className={styles.main}>
            <section className={[styles.image_container, styles.section].join(` `)}>
              {/* <Image
                className={styles.hero}
                src={property.img}
                width={2000}
                height={2000}
                alt="" 
              /> */}
              <img
                className={styles.hero}
                src={property.img} 
                alt="" 
              />
              <div className={styles.hero_side_container}>
                { 
                  !!property.images?.length && property.images?.map((image, key) => (key < 2) && (
                    // <Image
                    //   className={styles.hero_side}
                    //   key={key}
                    //   src={image}
                    //   width={400}
                    //   height={400}
                    //   alt=''
                    // />
                    <img
                      className={styles.hero_side}
                      key={key}
                      src={image} 
                      alt="" 
                    />
                  ))
                }
              </div>
            </section>
            <div className={styles.section_detail_container}>
              <div>
                <h1 className={styles.property_name}>{property.name}</h1>
                <section className={[styles.section, styles.section_detail].join(` `)}>
                  <h2 className={styles.header}>Property Details</h2>
                  <div className={styles.properties_container}>
                    <div><FontAwesomeIcon icon={faBed} /> : {property.bedrooms}</div>
                    <div><FontAwesomeIcon icon={faHotel} /> : {property.type.replaceAll(`_`, ` `)}</div>
                    <div><FontAwesomeIcon icon={faMaximize} /> : {property.size}</div>
                  </div>
                </section>
                {
                  !!property.amenities?.length && (
                    <section className={[styles.section, styles.section_detail].join(` `)}>
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
                {
                  !!property.description?.length && (
                    <section className={[styles.section, styles.section_detail].join(` `)}>
                      <h2 className={styles.header}>About the Property</h2>
                      <div>{property.description}</div>
                    </section>
                  )
                }
                {
                  (!!property.agent_note?.length && is_login) && (
                    <section className={[styles.section, styles.section_detail].join(` `)}>
                      <h2 className={styles.header}>Notes</h2>
                      <div>{property.agent_note}</div>
                    </section>
                  )
                }
              </div>
              <section>
                <Link href='/contact_us' className={styles.contact_link}>
                  <Button > Contact Us </Button>
                </Link>
              </section>
            </div>
          </main>
        )
      }
    </>
  )
}

export default Property;