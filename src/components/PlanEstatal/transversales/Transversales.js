import React from "react";
import styles from "./Transversales.module.css";
import { TransversalesPlanEstatal } from "../../../utils/planEstal";

const Transversales = () => {
  return (
    <div className={styles.sliderContainer}>
      {TransversalesPlanEstatal.map((eje, index) => (
        <div key={index} className={styles.slide}>
          <div className={styles.text}>
            <h2>{eje.name}</h2>
            <p>{eje.description}</p>
          </div>
          <div className={styles.imgContainer}>
            <img src={eje.image} alt={eje.name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transversales;
