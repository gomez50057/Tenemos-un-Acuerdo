"use client";

import { formatText } from "../shared/formatText";
import styles from "../../styles/EjesGenerales.module.css";
const imgEjesGenerales = "/img/Ejes/Generales/";


const EjeGeneral = ({ eje }) => {
  if (!eje) return <p>Eje General no fue encontrado</p>;

  return (
    <div className={styles.container}>
      <div className={styles.section01}>
        <div className={styles.section01Img}>
          <img src={`${imgEjesGenerales}${eje.img01}`} alt={eje.title} />
        </div>
        <div className={styles.section01Text}>
          <h1>{formatText(eje.title)}</h1>
          <h2>Descripción</h2>
          <p>{formatText(eje.description)}</p>
        </div>
      </div>

      <div className={styles.section02}>
        <span className={styles.cornerBottomLeft}></span>
        <h2>Participación</h2>
        <p>{formatText(eje.participacion)}</p>
      </div>

      <div className={styles.section03}>
        <span className={styles.cornerTopRight}></span>
        <h2>Prospectiva</h2>
        <p>{formatText(eje.prospectiva)}</p>
      </div>

      <div className={styles.section04}>
        <div className={styles.columnLeft}>
          <h2>Logros</h2>
          <p>{formatText(eje.logros)}</p>
        </div>

        <div className={styles.columnRight}>
          <h2>Indicadores</h2>
          <p>{formatText(eje.indicadores)}</p>
        </div>
      </div>

      <div className={styles.sectionLink}>
        <a href="/pdf/PDU.pdf" target="_blank" rel="noopener noreferrer" className={styles.Button}>
          Ver Plan Estatal de Desarrollo
        </a>
      </div>
    </div>
  );
};

export default EjeGeneral;
