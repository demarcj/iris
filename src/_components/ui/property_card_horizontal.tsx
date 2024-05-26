"use client";
// React 
import { useState } from "react";

// import Image from "next/image";
import Link from 'next/link';

// function
import { format_size, format_bedroom, format_money } from "@/_function";

import { PropertyModel } from "@/_models";

// Constants
import { LanguageType, TypeMap, PropertyMap } from "@/_constants/locale";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel, faBathtub } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import styles from "@/_styles/property_card_horizontal.module.css";

interface PropertyCardModel {
  property: PropertyModel;
  language: LanguageType;
}

export const PropertyCardHorizontal: React.FC<PropertyCardModel> = ({property, language}) => {

  const {id, img, name, bedrooms, bathrooms, size, type, rental_price} = property;
  const price = typeof property.price === `string` ? property.price : `${property.price}`;

  return (
    <Link
      className={styles.carousel_item}
      href={`${language}/properties/${id}`}
    >
      {/* <Image
        className={styles.carousel_img}
        src={img}
        width={2000}
        height={2000}
        alt=''
      /> */}
      <img 
        className={styles.carousel_img} 
        src={img} 
        alt="" 
      />
      <div className={styles.carousel_content}>
        <h3 className={styles.property_name}>{name}</h3>
        <div className={styles.price_container}>
          {
            !!price && (
              <span className={styles.price}>
                <span className={styles.elegant_style}>
                  {PropertyMap.price[language]}:&nbsp;&nbsp;
                </span>
                {format_money(price)}
              </span>
            )
          }
          {
            !!rental_price && (
              <span className={styles.price}>
                <span className={styles.elegant_style}>
                  {PropertyMap.rental_price[language]}:&nbsp;&nbsp;
                </span>
                {format_money(rental_price)}
              </span>
            )
          }
        </div>
        <div className={styles.property_detail}>
          <div><FontAwesomeIcon icon={faBed} /> : {format_bedroom(bedrooms, language)}</div>
          <div><FontAwesomeIcon icon={faBathtub} /> : {bathrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {TypeMap[type as keyof typeof TypeMap][language]}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {format_size(size, language)}</div>
        </div>
      </div>
    </Link>
  )
}