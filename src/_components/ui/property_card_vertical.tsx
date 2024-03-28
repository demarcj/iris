"use client";
// import Image from "next/image";
import Link from 'next/link';

import { PropertyCardModel } from "@/_models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Chip from '@mui/joy/Chip';
import { faBed, faMaximize, faHotel } from "@fortawesome/free-solid-svg-icons";
import 'swiper/css';
import styles from "@/_styles/property_card_vertical.module.css";

export interface PropertyCardVerticalModel extends PropertyCardModel {
  display_amenities: (e: any, amenities_list: string[]) => void;
}

export const PropertyCardVertical: React.FC<PropertyCardVerticalModel> = ({card, display_amenities}) =>  {
  const character_max = 75;

  return (
    <Link
      className={styles.carousel_item}
      href={`/properties/${card.id}`}
    >
      <div className={styles.image_container}>
        {/* <Image
          className={styles.carousel_img}
          src={card.img}
          width={2000}
          height={2000}
          alt=''
        /> */}
        <img
          className={styles.carousel_img}
          src={card.img} 
          alt="" 
        />
      </div>
      <div className={styles.carousel_content}>
        <div>
          <div className={styles.location_deal}>
            <div>Pattaya</div>
            { card.hot_deal && <Chip color="danger" size="lg" variant="soft">Hot Deal</Chip> }
          </div>
          <h2 className={styles.property_name}>{card.name}</h2>
          <div>
            <div className={styles.amenities}>
              {
                card.amenities?.filter((amenity, i) => i < 3)
                  .map((amenity, i) => <Chip color="primary" size="lg" variant="soft" key={i}>{ amenity.replaceAll(`_`, ` `) }</Chip>)
              }
            </div>
            {
              (card?.amenities && card.amenities?.length > 3) && (
                <div className={styles.more} onClick={e => display_amenities(e, card.amenities)}>
                  +{card.amenities?.length ? (card.amenities?.length as number) - 3 : 0} More
                </div>
              )
            }
          </div>
          { !!card?.description && (
              <div className={styles.description}>
                {card.description.substring(0, character_max).trim()}
                {card.description.length > character_max && `...`}
              </div>
            )
          }
        </div>
        <div>
          <div><span className={styles.elegant_style}>Price: </span> ${card.price} </div>
          <div className={styles.property_detail}>
            <div><FontAwesomeIcon icon={faBed} /> : {card.bedrooms}</div>
            <div><FontAwesomeIcon icon={faHotel} /> : {card.type}</div>
            <div><FontAwesomeIcon icon={faMaximize} /> : {card.size}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}