// UI
import { PropertiesList } from '@/_components/ui/properties';
import { DefaultLayout } from '@/_components/layout_section'

// Server
import { get_properties } from "@/_server";

// Constants
import { LanguageType } from '@/_constants/locale';

// Nextjs
import Image from 'next/image';

// style
import styles from "@/_styles/properties.module.css";

const Properties = async ({params}: {params: {language: LanguageType}}) => {
  const { language } = params;
  const properties = (await get_properties()).properties;

  return (
    <DefaultLayout language={language}>
      <main className={[styles.main, `properties_main`].join(` `)}> 
        <PropertiesList
          properties={properties}
          language={language}
        />
        <div className={styles.map}>
          <Image
            className={styles.img}
            src="/hero.jpg" 
            width={2000}
            height={2000}
            alt=''
          />
        </div>
      </main>
    </DefaultLayout>
  )
}

export default Properties;