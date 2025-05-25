"use client";

import { formatText } from "../shared/formatText";
import styles from "../../styles/EjesGenerales.module.css";

const EjeGeneral = ({ eje }) => {
  if (!eje) return <p>Eje General no fue encontrado</p>;

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
        <h2>Diagnóstico</h2>
        <p>{formatText(eje.diagnostico)}</p>
      </section>

      <section className={styles.section}>
        <h2>Participación</h2>
        <p>{formatText(eje.participacion)}</p>
      </section>

      <section className={styles.section}>
        <h2>Prospectiva</h2>
        <p>{formatText(eje.prospectiva)}</p>
      </section>

      <section className={styles.section}>
        <h2>Logros</h2>
        <p>{formatText(eje.logros)}</p>
      </section>

      <section className={styles.section}>
        <h2>Indicadores</h2>
        <p>{formatText(eje.indicadores)}</p>
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
