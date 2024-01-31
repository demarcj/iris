// import Image from "next/image";
import styles from "./page.module.css";
import Image from 'next/image';

import { Carousel } from "@/_components/carousel";

export default function Home() {
  const main_sections = [`Popular Properties`, `Hot Deal Properties`];

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
            <Carousel />
          </section>
        ))}
      </main>
    </>
  );
}
