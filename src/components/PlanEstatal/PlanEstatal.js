import styles from "../../styles/Ejes.module.css";
import Ejes from "./ejes/Ejes";
import Transversales from "./transversales/Transversales";

export default function PlanEstatal() {
  return (
    <section className={styles.ejes}>
      <h2>Ejes del Plan Estatal de Desarrollo</h2>
      <h3>Los 4 Ejes</h3>
      <p>Estratégocos para el Desarollo</p>
      <Ejes />
      <h3>Los 3 Temas Transversales</h3>
      <p>Impulso para un Futuro Sostenible</p>
      <Transversales />
    </section>
  );
}