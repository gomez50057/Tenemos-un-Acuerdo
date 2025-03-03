import styles from "../styles/Portada.module.css";

export default function Portada() {
  return (
    <section className={styles.portada}>
      <h2>Bienvenido a "Tenemos un Acuerdo"</h2>
      <button>Acceder a la Consulta Digital</button>
    </section>
  );
}