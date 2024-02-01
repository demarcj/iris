import { PropertyObject } from "@/_store";
import { PropertyCard } from "@/_components/ui";
import styles from "@/_styles/properties.module.css";

const Properties = () => {
  const cards = Object.values(PropertyObject);
  return (
    <main> 
      <div className={styles.properties_container} >
        { cards.map((slide, i) => <PropertyCard key={i} card={slide}/>) } 
      </div>
    </main>
  )
}

export default Properties