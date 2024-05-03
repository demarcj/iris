"use client";

// Nextjs
// import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Models
import { PropertyCardModel } from "@/_models";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel, faBathtub, faLocationDot } from "@fortawesome/free-solid-svg-icons";

// Material
import Chip from '@mui/joy/Chip';
import { Button } from '@mui/joy';

// Styles
import 'swiper/css';
import styles from "@/_styles/property_card_vertical.module.css";

export interface PropertyCardVerticalModel extends PropertyCardModel {
  display_amenities: (e: any, amenities_list: string[]) => void;
  edit_mode: boolean;
}

export const PropertyCardVertical: React.FC<PropertyCardVerticalModel> = ({card, display_amenities, edit_mode}) =>  {
  const character_max = 75;
  const {id, name, amenities, description, bathrooms, bedrooms, size, type} = card;
  const price = typeof card.price === `string` ? card.price : `${card.price}`;
  const router = useRouter();

  const route_edit_mode = (e: any) => {
    e.preventDefault();
    router.push(`/form?edit=true&id=${id}`)
  }

  return (
    <Link
      className={styles.carousel_item}
      href={`/properties/${id}`}
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
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
              {` ${card.sub_district ? card.sub_district : `Pattaya`}`.toLowerCase().replaceAll(`_`, ` `)}
            </div>
            { card.hot_deal && <Chip color="danger" size="lg" variant="soft">Hot Deal</Chip> }
          </div>
          <h2 className={styles.property_name}>{name}</h2>
          <div>
            <div className={styles.amenities}>
              {
                amenities?.filter((amenity, i) => i < 3)
                  .map((amenity, i) => <Chip color="primary" size="lg" variant="outlined" key={i}>{ amenity.replaceAll(`_`, ` `) }</Chip>)
              }
            </div>
            {
              (amenities && amenities?.length > 3) && (
                <div className={styles.more} onClick={e => display_amenities(e, card.amenities)}>
                  +{card.amenities?.length ? (card.amenities?.length as number) - 3 : 0} More
                </div>
              )
            }
          </div>
          { !!description && (
              <div className={styles.description}>
                {description.substring(0, character_max).trim()}
                {description.length > character_max && `...`}
              </div>
            )
          }
        </div>
        <div>
          <div>
            <span className={styles.elegant_style}>Price: </span> 
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
        { edit_mode && <Button onClick={e => route_edit_mode(e)}>Edit Property</Button>}
      </div>
    </Link>
  )
}