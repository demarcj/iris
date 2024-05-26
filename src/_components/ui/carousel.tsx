"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { PropertyCardHorizontal } from '.';

import { PropertyModel } from '@/_models';

import { LanguageType } from '@/_constants/locale'

// Styles
import 'swiper/css';
import 'swiper/css/navigation';

interface CarouselModel {
  properties: PropertyModel[];
  language: LanguageType;
}

export const Carousel: React.FC<CarouselModel> = ({properties, language}) => (
  <>
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      breakpoints={{
        600: {
          slidesPerView: 2,
          navigation: {enabled: properties.length > 2}
        },
        1200: {
          slidesPerView: 3,
          navigation: {enabled: properties.length > 3}
        }
      }}
      navigation={{ enabled: properties.length > 1}}
      modules={[Navigation]}
    >
      { 
        properties.map((property, i) => { 
          return (
            <SwiperSlide key={i}>
              <PropertyCardHorizontal 
                property={property} 
                language={language}
              />
            </SwiperSlide>
          ) 
        })
      }
    </Swiper>
  </>
)