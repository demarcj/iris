"use client";
import Image from "next/image";
import Link from 'next/link';
import { PropertyObject } from '@/_store';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from "@/_styles/carousel.module.css";

export const Carousel = () => {
  const slides = Object.values(PropertyObject);
  return(
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
    >
      { slides.map((slide, i) => { 
        return (
          <SwiperSlide key={i}>
            <Link
              className={styles.carousel_item}
              href={`/properties/${slide.id}`}
            >
              <Image
                className={styles.carousel_img}
                src={slide.img}
                width={2000}
                height={2000}
                alt=''
              />
              <div className={styles.carousel_content}>
                <h3 className={styles.property_name}>{slide.property_name}</h3>
                <div>${slide.price} </div>
                <div className={styles.property_detail}>
                  <div> No. Bedrooms: {slide.num_bedrooms} </div>
                  <div> Type: {slide.property_type} </div>
                  <div> Size: {slide.size} </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ) 
      })}
    </Swiper>
  )
}