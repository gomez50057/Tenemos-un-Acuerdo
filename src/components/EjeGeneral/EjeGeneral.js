"use client";

import { formatText } from "../shared/formatText";
import styles from "../../styles/EjesGenerales.module.css";

const EjeGeneral = ({ eje }) => {
  if (!eje) return <p>Eje no encontrado</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{formatText(eje.title)}</h1>
      </header>
      <section className={styles.section}>
        <h2>Descripción</h2>
        <p>{formatText(eje.description)}</p>
      </section>
      <section className={styles.section}>
        <h2>Objetivos</h2>
        <p>{formatText(eje.objectives)}</p>
      </section>
      <section className={styles.section}>
        <h2>Incidencia con los Transversales</h2>
        <p>{formatText(eje.incidencia)}</p>
      </section>
      <section className={styles.section}>
        <h2>Link del PED</h2>
        <a href={eje.pedLink} target="_blank" rel="noopener noreferrer">
          Ver Plan Estatal de Desarrollo
        </a>
      </section>
    </div>
  );
};

export default EjeGeneral;
