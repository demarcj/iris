// Nextjs
// import Image from 'next/image';
import Link from 'next/link';

// UI
import { AdminButton, AdminNote, ImageGallery } from '@/_components/ui/property';
import { DefaultLayout } from "@/_components/layout_section";

// Material
import Button from '@mui/joy/Button';

// Server
import { get_property } from '@/_server';

// Constant
import { 
  AmenitiesMap, 
  FacilitiesMap,
  FurnishedMap, 
  LanguageType, 
  OptionMap,
  OwnershipMap,
  PropertyMap,
  TransferFeesMap,
  TypeMap
} from '@/_constants/locale';

// Function
import { format_size, format_bedroom, format_money } from '@/_function';

// Style
import styles from "@/_styles/property.module.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const Property = async ({params}: {params: {id: string, language: LanguageType}}) => {
  const { id, language } = params;
  let property = await get_property(id);
  let loading = true;
  let detail_list = [] as {key: keyof typeof property, value: unknown}[];

  type DetailModel = {key: keyof typeof property, value: unknown};
  const details = [
    `allows_marijuana`,
    `available_at`,
    `bathrooms`,
    `bedrooms`,
    `building`,
    `floor`,
    `furnished`,
    `option`,
    `ownership`,
    `price`,
    `rental_price`,
    `size`,
    `stories`,
    `type`,
    `useable_area`,
  ];

  const convert_to_string = (key: keyof typeof property, value: unknown): string => {
    const key_map = {
      allows_marijuana: value ? `Yes` : `No`,
      bedrooms: format_bedroom(value as number),
      furnished: FurnishedMap?.[value as keyof typeof FurnishedMap]?.[language] || value,
      option: Array.isArray(value) && (
        (value as string[]).map(val => OptionMap[val as keyof typeof OptionMap][language]).join(` / `)
      ),
      ownership: OwnershipMap?.[value as keyof typeof OwnershipMap]?.[language] || value,
      price: format_money(value as string),
      rental_price: format_money(value as string),
      transfer_fees: TransferFeesMap?.[value as keyof typeof TransferFeesMap]?.[language] || value,
      type: TypeMap?.[value as keyof typeof TypeMap]?.[language] || value,
      size: format_size(value as string, language),
      useable_area: format_size(value as string, language),
    }
    return Object.hasOwn(key_map, key) ? `${key_map[key as keyof typeof key_map]}` : `${value}`;
  }

  if(!!Object.keys(property)?.length){
    const filter_details: DetailModel[] = details.filter(detail => !!property[detail as keyof typeof property])
      .map(detail => ({key: detail as keyof typeof property, value: property[detail as keyof typeof property]}));
    detail_list = filter_details;
  }

  loading = false;
  return (
    !!property?.id.length && !loading) && (
      <DefaultLayout language={language}>
        <main className={styles.main}>
          <section className={styles.section}>
            <ImageGallery property={property}/>
          </section>
          <div className={styles.section_detail_container}>
            <div>
              <div className={styles.property_name}>
                <h1>
                  {property.name} 
                  {property?.sub_district ? `- ${property.sub_district.replaceAll(`_`, ` `)}` : ``}
                </h1>
              </div>
              <div className={styles.price_container}>
                {
                  !!property?.price && (
                    <div>
                      <span className={styles.elegant_style}>
                        {PropertyMap.price[language]}:&nbsp;&nbsp;
                      </span>
                      {format_money(property.price)}
                    </div>
                  )
                }
                {
                  !!property?.rental_price && (
                    <div>
                      <span className={styles.elegant_style}>
                        {PropertyMap.rental_price[language]}:&nbsp;&nbsp;
                      </span>
                      {format_money(property.rental_price)}
                    </div>
                  )
                }
              </div>
              {
                !!detail_list?.length && (
                  <section className={[styles.section, styles.section_detail].join(` `)}>
                  <h2 className={styles.header}>Property Details</h2>
                  <div className={styles.properties_container}>
                    {
                      detail_list.map((detail: DetailModel) => (
                        <div key={detail.key}>
                          {PropertyMap[detail.key as keyof typeof PropertyMap][language]}: {convert_to_string(detail.key, detail.value)}
                        </div>
                      ))
                    }
                  </div>
                </section>
              )
            }
            {
              !!property.amenities?.length && (
                <section className={[styles.section, styles.section_detail].join(` `)}>
                  <h2 className={styles.header}>Property Amenities</h2>
                  <div className={styles.amenities}>
                    {
                      property.amenities.map((amenity, key) => (
                        <div key={key}>{ AmenitiesMap[amenity as keyof typeof AmenitiesMap][language] }</div>
                      ))
                    }
                  </div>
                </section>
              )
            }
            {
              !!property.facilities?.length && (
                <section className={[styles.section, styles.section_detail].join(` `)}>
                  <h2 className={styles.header}>Property Facilites</h2>
                  <div className={styles.amenities}>
                    {
                      property.facilities.map((facility, key) => (
                        <div key={key}>{ FacilitiesMap[facility as keyof typeof FacilitiesMap][language] }</div>
                      ))
                    }
                  </div>
                </section>
              )
            }
            {
              !!property.description?.length && (
                <section className={[styles.section, styles.section_detail].join(` `)}>
                  <h2 className={styles.header}>About the Property</h2>
                  <div className={styles.description}>{property.description}</div>
                </section>
              )
            }
            { !!property.agent_note?.length && <AdminNote property={property} /> }
          </div>
          <section>
            <div className={styles.button_group}>
              <Link className={styles.link} href={`/contact_us`}>
                <Button color="success" > Contact Us </Button>
              </Link>
              <AdminButton 
                property={property} 
                language={language} 
              />
            </div>
          </section>
        </div>
      </main>
    </DefaultLayout>
  )
}

export default Property;