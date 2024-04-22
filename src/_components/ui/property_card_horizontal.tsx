"use client";
// import Image from "next/image";
import Link from 'next/link';
import { PropertyCardModel } from "@/_models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel, faBathtub } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import styles from "@/_styles/property_card_horizontal.module.css";

export const PropertyCardHorizontal: React.FC<PropertyCardModel> = ({card}) =>  {
  const {id, img, name, bedrooms, bathrooms, size, type} = card;
  const price = typeof card.price === `string` ? card.price : `${card.price}`

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
          <div><FontAwesomeIcon icon={faBed} /> : {bedrooms}</div>
          <div><FontAwesomeIcon icon={faBathtub} /> : {bathrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {type.replaceAll(`_`, ` `)}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {new Intl.NumberFormat(`en-US`).format(parseInt(`${size}`))} sqm</div>
        </div>
      </div>
    </Link>
  )
}