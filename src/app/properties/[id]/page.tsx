"use client";

// Nextjs
// import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// NPM
import { ToastContainer, toast } from 'react-toastify';

// UI
import { DeletePropertyDialog } from "@/_components/ui";

// Fontawesome
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// React
import { useEffect, useState } from "react";

// Material
import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

// Server
import { get_property, admin_check, delete_property } from '@/_server';

// Model
import { PropertyModel } from '@/_models';

// Function
import { format_size, format_bedroom, format_money, route_edit } from '@/_function';

// Style
import styles from "@/_styles/property.module.css";
import global from "@/_styles/global.module.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const Property = () => {
  const [property, set_property] = useState({} as PropertyModel);
  const [loading, set_loading] = useState(true);
  const [images, set_images] = useState([] as string[]);
  const [image_ref, set_image_ref] = useState(0);
  const [language, set_language] = useState(`th`);
  const [is_login, set_is_login] = useState(false);
  const [detail_list, set_detail_list] = useState([] as Record<string, any>[]);
  const [image_dialog, set_image_dialog] = useState(false);
  const [delete_dialog, set_delete_dialog] = useState(false);

  const details = [
    `allows_marijuana`,
    `available_at`,
    `bathrooms`,
    `bedrooms`,
    `building`,
    `floor`,
    `furnished`,
    `option`,
    `ownership`,
    `price`,
    `rental_price`,
    `size`,
    `stories`,
    `type`,
    `useable_area`,
  ];
  const see_more_message = `Click on here to see more images`;
  const searchParams = useParams();
  const router = useRouter();

  const convert_to_string = (key: string, value: unknown) => {
    const key_map = {
      allows_marijuana: value ? `Yes` : `No`,
      size: format_size(value as string),
      price: format_money(value as string),
      rental_price: format_money(value as string),
      useable_area: format_size(value as string),
      option: Array.isArray(value) && (value as string[]).join(` / `),
      bedrooms: format_bedroom(value as number)
    }
    return Object.hasOwn(key_map, key) ? key_map[key as keyof typeof key_map] : `${value}`.replaceAll(`_`, ` `).toLowerCase();
  }

  const route_edit_mode = (e: any) => router.push(route_edit(property));

  const handle_delete_property = async () => set_delete_dialog(true);

  const handle_delete_close = () =>  set_delete_dialog(false);

  const confirmed_delete = async () => {
    const confirmation = await delete_property(property);
    if(confirmation){
      router.push(`/message?type=delete&property_name=${property.name}`);
    } else {
      toast(`Something went wrong. Try again.`);
      set_delete_dialog(false);
    }
  }

  const handle_image_close = () => {
    set_image_ref(0);
    set_image_dialog(false);
  };

  const open_image_dialog = (index?: number) => {
    if(!property?.images?.length){
      return;
    }
    if(index){
      set_image_ref(index + 1);
    }
    set_image_dialog(true);
  }
  
  useEffect(() => {
    (async() => {
      const has_login = await admin_check(localStorage.getItem(`user`));
      const id = (searchParams.id as string) || ``;
      const property_data = await get_property(id);
      const images_check = property_data?.images || []; 
      set_images([property_data.img, ...images_check]);
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
            <section className={styles.section}>
              <div className={[styles.image_container].join(` `)}>
                {/* <Image
                  className={styles.hero}
                  src={property.img}
                  width={2000}
                  height={2000}
                  alt="" 
                /> */}
                <div 
                  className={styles.image_wrapper}
                  onClick={() => open_image_dialog()}
                >
                  <img
                    className={styles.hero}
                    src={property.img} 
                    alt=""
                  />
                  {
                    !!property?.images?.length && (
                      <div className={styles.image_more}>
                        {see_more_message} <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </div>
                    )
                  }
                </div>
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
                      <div
                        className={[styles.image_wrapper, styles.hero_wrapper].join(` `)}
                        onClick={() => open_image_dialog(key)}
                        key={key}
                      >
                        <img
                          className={styles.hero_side}
                          src={image}
                          alt="" 
                        />
                        <div className={styles.image_more}>
                          {see_more_message} <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              {
                images.length && (
                  <div className={styles.top_slider}>
                    <Swiper
                      slidesPerView={1}
                      navigation={images.length > 1}
                      modules={[Navigation, Pagination]}
                      pagination={{ type: 'bullets' }}
                    >
                      { 
                        images.map((image, i) => { 
                          return (
                            <SwiperSlide key={i}>
                              <div className={styles.image_slide_mobile_wrapper}>
                                <img className={styles.image_slide_mobile} src={image} alt="" />
                              </div>
                            </SwiperSlide>
                          ) 
                        })
                      }
                    </Swiper>
                  </div>
                )
              }
            </section>
            <div className={styles.section_detail_container}>
              <div>
                <div className={styles.property_name}>
                  <h1>
                    {property.name} 
                    {property?.sub_district ? `- ${property.sub_district.replaceAll(`_`, ` `)}` : ``}
                  </h1>
                  <h2> { format_money(property?.price || property?.rental_price) } </h2>
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
                <div className={styles.button_group}>
                <Button
                  color="success" 
                  onClick={() => router.push(`/contact_us`)}
                > Contact Us </Button>
                  {
                    is_login && (
                      <div className={[styles.button_group, styles.section_detail].join(` `)}>
                        <h2>Admin</h2>
                        <Button onClick={e => route_edit_mode(e)}>Edit</Button>
                        <Button color="danger" onClick={e => handle_delete_property()}>Delete</Button>
                      </div>
                    )
                  }
                </div>
              </section>
              <Dialog 
                open={image_dialog}
                onClose={handle_image_close}
              >
                <div className={[global.dialog, styles.dialog].join(' ')}>
                  {/* <div className="swiper-button">
                    <div className="button_prev">
                      <FontAwesomeIcon icon={faChevronLeft}/>
                    </div>
                    <div className="button_next">
                      <FontAwesomeIcon icon={faChevronRight}/>
                    </div>
                  </div> */}
                  <Swiper
                    slidesPerView={1}
                    // navigation={{
                    //   nextEl: `.button_next`,
                    //   prevEl: `.button_prev`,
                    //   disabledClass: `swiper-button-disabled`
                    // }} 
                    navigation={true}
                    modules={[Navigation, Pagination]}
                    pagination={{ type: 'progressbar' }}
                    autoHeight={true}
                  >
                    { 
                      images.map((image, i) => { 
                        return (
                          <SwiperSlide key={i}>
                            <div className={styles.image_slide_wrapper}>
                              <img className={styles.image_slide} src={image} alt="" />
                            </div>
                          </SwiperSlide>
                        ) 
                      })
                    }
                  </Swiper>
                  <DialogActions>
                    <Button onClick={handle_image_close}>
                      Close
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
              <DeletePropertyDialog
                confirmed_delete={confirmed_delete} 
                open={delete_dialog}
                on_close={handle_delete_close}
                property={property}
              />
            </div>
            <ToastContainer />
          </main>
        )
      }
    </>
  )
}

export default Property;