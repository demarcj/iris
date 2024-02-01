"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { PropertyCard } from './';
import { CarouselModel } from "@/_models"
import 'swiper/css';

export const Carousel: React.FC<CarouselModel> = ({items}) => {
  return(
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
    >
      { 
        items.map((item, i) => { 
          return (
            <SwiperSlide key={i}>
              <PropertyCard card={item} />
            </SwiperSlide>
          ) 
        })
      }
    </Swiper>
  )
}