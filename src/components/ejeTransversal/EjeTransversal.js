"use client";

import { formatText } from "../shared/formatText";
import styles from "../../styles/EjesGenerales.module.css";
const imgEjesGenerales = "/img/Ejes/Generales/";

const EjeTransversal = ({ transversal }) => {
  if (!transversal) return <p>Eje Transversal no encontrado</p>;

  return (
    <div className={styles.container}>
      <div className={styles.section01}>
        <div className={styles.section01Img}>
          <img src={`${imgEjesGenerales}${transversal.img01}`} alt={transversal.title} />
        </div>
        <div className={styles.section01Text}>
          <h1>{formatText(transversal.title)}</h1>
          <h2>Descripción</h2>
          <p>{formatText(transversal.description)}</p>
        </div>
      </div>

      <div className={styles.section02}>
        <span className={styles.cornerBottomLeft}></span>
        <h2>Participación</h2>
        <p>{formatText(transversal.participacion)}</p>
      </div>

      <div className={styles.section03}>
        <span className={styles.cornerTopRight}></span>
        <h2>Prospectiva</h2>
        <p>{formatText(transversal.prospectiva)}</p>
      </div>

      <div className={styles.section04}>
        <div className={styles.columnLeft}>
          <h2>Logros</h2>
          <p>{formatText(transversal.logros)}</p>
        </div>

        <div className={styles.columnRight}>
          <h2>Indicadores</h2>
          <p>{formatText(transversal.indicadores)}</p>
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

export default EjeTransversal;
