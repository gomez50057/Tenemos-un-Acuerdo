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
        <h2>Objetivos</h2>
        <p>{formatText(transversal.objectives)}</p>
      </section>
      <section className={styles.section}>
        <h2>Incidencia con los Transversales</h2>
        <p>{formatText(transversal.incidencia)}</p>
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
