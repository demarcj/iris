"use client";
// import Image from "next/image";
import Link from 'next/link';

// function
import { format_size, format_bedroom, format_money } from "@/_function";

import { PropertyModel } from "@/_models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel, faBathtub } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import styles from "@/_styles/property_card_horizontal.module.css";

interface PropertyCardModel {
  property: PropertyModel;
}

export const PropertyCardHorizontal: React.FC<PropertyCardModel> = ({property}) =>  {
  const {id, img, name, bedrooms, bathrooms, size, type, rental_price} = property;
  const price = typeof property.price === `string` ? property.price : `${property.price}`

  return (
    <Link
      className={styles.carousel_item}
      href={`/properties/${id}`}
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
        <div>
          <span className={styles.elegant_style}>Price: </span> { format_money(price || rental_price) } 
        </div>
        <div className={styles.property_detail}>
          <div><FontAwesomeIcon icon={faBed} /> : {format_bedroom(bedrooms)}</div>
          <div><FontAwesomeIcon icon={faBathtub} /> : {bathrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {type.replaceAll(`_`, ` `)}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {format_size(size)}</div>
        </div>
      </div>
    </Link>
  )
}