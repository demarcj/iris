"use client";
// import Image from "next/image";
import Link from 'next/link';
import { PropertyCardModel } from "@/_models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import styles from "@/_styles/property_card_horizontal.module.css";

export const PropertyCardHorizontal: React.FC<PropertyCardModel> = ({card}) =>  {
  const {id, img, name, bedrooms, price, size, type} = card;

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
        <div><span className={styles.elegant_style}>Price: </span> ${price} </div>
        <div className={styles.property_detail}>
          <div><FontAwesomeIcon icon={faBed} /> : {bedrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {type}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {size}</div>
        </div>
      </div>
    </Link>
  )
}