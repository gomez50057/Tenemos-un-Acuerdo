"use client";

import { formatText } from "../shared/formatText";
import styles from "../../styles/EjesGenerales.module.css";

const EjeTransversal = ({ transversal }) => {
  if (!transversal) return <p>Eje Transversal no encontrado</p>;

  return (
    <div className={styles.container}>
        <header className={styles.header}>
        <h1>{formatText(transversal.title)}</h1>
      </header>

      <section className={styles.section}>
        <h2>Descripción</h2>
        <p>{formatText(transversal.description)}</p>
      </section>

      <section className={styles.section}>
        <h2>Diagnóstico</h2>
        <p>{formatText(transversal.diagnostico)}</p>
      </section>

      <section className={styles.section}>
        <h2>Participación</h2>
        <p>{formatText(transversal.participacion)}</p>
      </section>

      <section className={styles.section}>
        <h2>Prospectiva</h2>
        <p>{formatText(transversal.prospectiva)}</p>
      </section>

      <section className={styles.section}>
        <h2>Logros</h2>
        <p>{formatText(transversal.logros)}</p>
      </section>

      <section className={styles.section}>
        <h2>Indicadores</h2>
        <p>{formatText(transversal.indicadores)}</p>
      </section>

      <section className={styles.section}>
        <h2>Link del PED</h2>
        <a href={transversal.pedLink} target="_blank" rel="noopener noreferrer">
          Ver Plan Estatal de Desarrollo
        </a>
      </section>
    </div>
  );
};

export default EjeTransversal;
