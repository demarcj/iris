"use client";
import Image from "next/image";
import Link from 'next/link';
import { PropertyCardModel } from "@/_models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import styles from "@/_styles/card.module.css";

export const PropertyCard: React.FC<PropertyCardModel> = ({card}) =>  {

  return (
    <Link
      className={styles.carousel_item}
      href={`/properties/${card.id}`}
    >
      <Image
        className={styles.carousel_img}
        src={card.img}
        width={2000}
        height={2000}
        alt=''
      />
      <div className={styles.carousel_content}>
        <h3 className={styles.property_name}>{card.property_name}</h3>
        <div><span className={styles.elegant_style}>Price: </span> ${card.price} </div>
        <div className={styles.property_detail}>
          <div><FontAwesomeIcon icon={faBed} /> : {card.num_bedrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {card.property_type}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {card.size}</div>
        </div>
      </div>
    </Link>
  )
}