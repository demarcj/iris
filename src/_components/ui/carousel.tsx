"use client";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PropertyCardHorizontal } from './';
import { CarouselModel } from "@/_models"
import 'swiper/css';

export const Carousel: React.FC<CarouselModel> = ({items}) => {
  const [slide_view, set_slide_view] = useState(3);

  useEffect(() => {
    const test = (
      window.innerWidth >= 1200 ? 3 
      : window.innerWidth < 1200 && window.innerWidth >= 600 ? 2 
      : 1
    );
    set_slide_view(test);
  }, []);

  return(
    <Swiper
      spaceBetween={50}
      slidesPerView={slide_view}
    >
      { 
        items.map((item, i) => { 
          return (
            <SwiperSlide key={i}>
              <PropertyCardHorizontal card={item} />
            </SwiperSlide>
          ) 
        })
      }
    </Swiper>
  )
}