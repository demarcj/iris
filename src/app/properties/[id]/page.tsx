"use client";

// Nextjs
// import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// React
import { useEffect, useState } from "react";

// Joy UI
import Button from '@mui/joy/Button';

// Server
import { get_property, admin_check } from '@/_server';

// Model
import { PropertyModel } from '@/_models';

// Function
import { get_format_size } from '@/_function';

// Style
import styles from "@/_styles/property.module.css";

const Property = () => {
  const searchParams = useParams();
  const [property, set_property] = useState({} as PropertyModel);
  const [loading, set_loading] = useState(true);
  const [is_login, set_is_login] = useState(false);
  const [detail_list, set_detail_list] = useState([] as Record<string, any>[]);

  const details = [
    `type`,
    `bedrooms`,
    `bathrooms`,
    `furnished`,
    `size`,
    `useable_area`,
    `floor`,
    `stories`,
    `available_at`,
    `allows_marijuana`,
    `ownership`
  ];

  const convert_to_string = (key: string, value: unknown) => {
    if(key === `allows_marijuana`){
      return value ? `Yes` : `No`; 
    }
    if(key === `size` || key === `useable_area`){
      return get_format_size(value as string);
    }
    return `${value}`.replaceAll(`_`, ` `).toLowerCase();
  }
  
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

  useEffect(() => {
    if(!!Object.keys(property)?.length){
      const filter_details: Record<string, any>[] = details.filter(detail => !!property[detail as keyof typeof property])
      .map(detail => ({key: detail, value: property[detail as keyof typeof property]}));
      set_detail_list(filter_details);
    }
  }, [property]);

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
                <div className={styles.property_name}>
                  <h1>
                    {property.name} 
                    {property?.sub_district ? `- ${property.sub_district.replaceAll(`_`, ` `)}` : ``}
                  </h1>
                  <h2>
                    {
                      new Intl.NumberFormat(
                        `th-TH`, 
                        {
                          style: `currency`, 
                          currency: `THB`,
                          maximumSignificantDigits: 2
                        }
                      ).format(parseInt(property.price))
                    } 
                  </h2>
                </div>
                {
                  !!detail_list?.length && (
                    <section className={[styles.section, styles.section_detail].join(` `)}>
                      <h2 className={styles.header}>Property Details</h2>
                      <div className={styles.properties_container}>
                        {
                          detail_list.map(detail => (
                            <div key={detail.key}>
                              {detail.key.replaceAll(`_`, ` `).toLowerCase()}: {convert_to_string(detail.key, detail.value)}
                            </div>
                          ))
                        }
                      </div>
                    </section>
                  )
                }
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
                  !!property.facilities?.length && (
                    <section className={[styles.section, styles.section_detail].join(` `)}>
                      <h2 className={styles.header}>Property Facilites</h2>
                      <div className={styles.amenities}>
                        {
                          property.facilities.map((amenity, key) => (
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
                      <div className={styles.description}>{property.description}</div>
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