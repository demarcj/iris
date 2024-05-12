"use client";

// Nextjs
// import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Models
import { PropertyModel } from "@/_models";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMaximize, faHotel, faBathtub, faLocationDot } from "@fortawesome/free-solid-svg-icons";

// Function
import { format_size, format_bedroom, format_money, route_edit } from "@/_function";

// Material
import Chip from '@mui/joy/Chip';
import { Button } from '@mui/joy';

// Styles
import 'swiper/css';
import styles from "@/_styles/property_card_vertical.module.css";

interface PropertyCardModel {
  display_amenities: (e: any, property: PropertyModel) => void;
  edit_mode: boolean;
  delete_property: (e: any, property: PropertyModel) => void;
  property: PropertyModel;
}

export const PropertyCardVertical: React.FC<PropertyCardModel> = ({property, display_amenities, delete_property, edit_mode}) => {
  const character_max = 75;
  const {id, name, amenities, description, bathrooms, bedrooms, img, size, type, sub_district, hot_deal, rental_price} = property;
  const price = typeof property.price === `string` ? property.price : `${property.price}`;
  const router = useRouter();

  const route_edit_mode = (e: any) => {
    e.preventDefault();
    router.push(route_edit(property));
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
          src={img} 
          alt="" 
        />
      </div>
      <div className={styles.carousel_content}>
        <div>
          <div className={styles.location_deal}>
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
              {` ${sub_district ? sub_district : `Pattaya`}`.toLowerCase().replaceAll(`_`, ` `)}
            </div>
            { hot_deal && <Chip color="danger" size="lg" variant="soft">Hot Deal</Chip> }
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
                <div className={styles.more} onClick={e => display_amenities(e, property)}>
                  +{amenities?.length ? (amenities?.length as number) - 3 : 0} More
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
            <span className={styles.elegant_style}>Price: </span> { format_money(price || rental_price) }  
          </div>
          <div className={styles.property_detail}>
            <div><FontAwesomeIcon icon={faBed} /> : {format_bedroom(bedrooms)}</div>
            <div><FontAwesomeIcon icon={faBathtub} /> : {bathrooms}</div>
            <div><FontAwesomeIcon icon={faHotel} /> : {type.replaceAll(`_`, ` `)}</div>
            <div><FontAwesomeIcon icon={faMaximize} /> : {format_size(size)}</div>
          </div>
        </div>
        { edit_mode && (
          <div className={styles.btn_group}>
            <Button onClick={e => route_edit_mode(e)}>Edit</Button>
            <Button color="danger" onClick={e => delete_property(e, property)}>Delete</Button>
          </div>
        )}
      </div>
    </Link>
  )
}