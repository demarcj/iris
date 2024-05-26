'use client';
// Fontawesome
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Material
import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

// Model
import { PropertyModel } from '@/_models';

// NPM
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { SwiperClass } from "swiper/react";

// React
import { useState, useEffect } from 'react'

// Style
import styles from "@/_styles/property.module.css";
import global from "@/_styles/global.module.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css';

interface ImgaeGalleryModel {
  property: PropertyModel
}

export const ImageGallery: React.FC<ImgaeGalleryModel> = ({property}) => {
  const [images, set_images] = useState<string[]>([]);
  const [image_dialog, set_image_dialog] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const [mobileSwiper, setmobileSwiper] = useState<SwiperClass>();

  const see_more_message = `Click on here to see more images`;
  const handle_image_close = () => {
    set_image_dialog(false);
  };

  const open_image_dialog = (index?: number) => {
    if(!property?.images?.length){
      return;
    }
    set_image_dialog(true);
  }

  useEffect(() => {
    (async () => {
      const get_images = !!property?.images?.length ? property.images : [];
      set_images([property.img, ...get_images])
    })();
  }, []);

  return (
    <>
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
        images.length > 0 && (
          <div className={styles.top_slider}>
            <Swiper
              slidesPerView={1}
              navigation={images.length > 1}
              modules={[Navigation, FreeMode, Thumbs]}
              thumbs={{swiper: mobileSwiper && !mobileSwiper.destroyed ? mobileSwiper : null}}
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
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              onSwiper={setmobileSwiper}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              { 
                images.map((image, i) => { 
                  return (
                    <SwiperSlide key={i}>
                      <div className={styles.mobile_thumb}>
                        <img className={styles.image_mobile_thumb} src={image} alt="" />
                      </div>
                    </SwiperSlide>
                  ) 
                })
              }
            </Swiper>
          </div>
        )
      }
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
            modules={[Navigation, FreeMode, Thumbs]}
            thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
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
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Navigation, Thumbs]}
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
    </>
  )
}