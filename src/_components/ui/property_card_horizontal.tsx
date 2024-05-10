"use client";
// import Image from "next/image";
import Link from 'next/link';

// function
import { get_format_size, format_bedroom } from "@/_function";

import { PropertyModel } from "@/_models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel, faBathtub } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import styles from "@/_styles/property_card_horizontal.module.css";

interface PropertyCardModel {
  property: PropertyModel;
}

export const PropertyCardHorizontal: React.FC<PropertyCardModel> = ({property}) =>  {
  const {id, img, name, bedrooms, bathrooms, size, type} = property;
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
        <div><span className={styles.elegant_style}>Price: </span> 
          {
            new Intl.NumberFormat(
              `th-TH`, 
              {
                style: `currency`, 
                currency: `THB`,
                maximumSignificantDigits: 2
              }
            ).format(parseInt(price))
          } 
        </div>
        <div className={styles.property_detail}>
          <div><FontAwesomeIcon icon={faBed} /> : {format_bedroom(bedrooms)}</div>
          <div><FontAwesomeIcon icon={faBathtub} /> : {bathrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {type.replaceAll(`_`, ` `)}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {get_format_size(size)}</div>
        </div>
      </div>
    </Link>
  )
}