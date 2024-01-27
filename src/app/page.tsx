// import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.hero_container}>
        <img
          className={styles.hero}
          src="hero.jpg" alt="" 
        />
      </section>
      <section>
        <h2 id="popular_deal">Popular Deal</h2>
      </section>
    </>
  );
}
