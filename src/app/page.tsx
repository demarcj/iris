// import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <img
        className={styles.hero}
        src="hero.jpg" alt="" 
      />
    </main>
  );
}
