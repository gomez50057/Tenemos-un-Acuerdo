import React from "react";
import styles from "./Ejes.module.css";
import { ejesPlanEstatal } from "../../../utils/planEstal";

const Ejes = () => {
  return (
    <div className={styles.sliderContainer}>
      {ejesPlanEstatal.map((eje, index) => (
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

export default Ejes;
