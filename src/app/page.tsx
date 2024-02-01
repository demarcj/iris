import styles from "./page.module.css";
import Image from 'next/image';
import { PropertyObject } from "@/_store";
import { Carousel } from "@/_components/ui";

export default function Home() {
  const main_sections = [`Popular Properties`, `Hot Deal Properties`];
  const slides = Object.values(PropertyObject);
  
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
        {main_sections.map((section, i) => (
          <section key={i} className={styles.carousel_container}>
            <h2 className={styles.carousel_header}>{ section }</h2>
            <Carousel items={slides}/>
          </section>
        ))}
      </main>
    </>
  );
}
