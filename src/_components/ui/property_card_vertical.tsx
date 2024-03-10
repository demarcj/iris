"use client";
import Image from "next/image";
import Link from 'next/link';
import { PropertyCardModel } from "@/_models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import styles from "@/_styles/property_card_vertical.module.css";

export const PropertyCardVertical: React.FC<PropertyCardModel> = ({card}) =>  {

  return (
    <Link
      className={styles.carousel_item}
      href={`/properties/${card.id}`}
    >
      <div className={styles.image_container}>
        <Image
          className={styles.carousel_img}
          src={card.img}
          width={2000}
          height={2000}
          alt=''
        />
      </div>
      <div className={styles.carousel_content}>
        <h3 className={styles.property_name}>{card.name}</h3>
        <div className={styles.property_detail}>
          <div><FontAwesomeIcon icon={faBed} /> : {card.bedrooms}</div>
          <div><FontAwesomeIcon icon={faHotel} /> : {card.type}</div>
          <div><FontAwesomeIcon icon={faMaximize} /> : {card.size}</div>
        </div>
        <div><span className={styles.elegant_style}>Price: </span> ${card.price} </div>
      </div>
    </Link>
  )
}