// Component
import { Carousel } from "@/_components/ui";

// Constants
import { LanguageToggleMap } from "@/_constants/locale";

// Model
import { PropertyModel } from '@/_models';

// Nextjs
import Image from 'next/image';

// Server
import { get_properties, get_hot_deal } from '@/_server';

// Style
import styles from "@/app/page.module.css";

type MainSection = {
  name: string;
  properties: PropertyModel[];
}

export const HomeLayout = async ({language}: {language: keyof typeof LanguageToggleMap}) => {
  const popular = await get_properties();
  const hot_deal = await get_hot_deal();

  const main_sections = [`Popular Properties`, `Hot Deal Properties`];
  
  const properties_section: MainSection[] = main_sections.map((section, index) => {
    const data = index === 0 ? popular : hot_deal;
    const properties = !!data.properties?.length ? data.properties : []; 

    return {
      name: section,
      properties: properties as PropertyModel[]
    }
  })
  return (
    <>
      <section className={styles.hero_container}>
        <Image
          className={styles.hero}
          src="/hero.jpg"
          width={2000}
          height={2000}
          alt="" 
        />
      </section>
      <main>
        {
          !!properties_section.length && properties_section.map((section, i) => (
            <section 
              key={i} 
              className={styles.carousel_container}
              style={{display: !!section.properties.length ? `block` : `none`}}
            >
              <h2 className={styles.carousel_header}>{ section.name }</h2>
              <Carousel
                properties={section.properties}
                language={language}
              />
            </section>
          ))
        }
      </main>
    </>
  )
}