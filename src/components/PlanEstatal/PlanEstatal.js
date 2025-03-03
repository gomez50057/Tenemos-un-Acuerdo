import React from 'react';
import DualSlider from './dualSlider/DualSlider';
import { ejesPlanEstatal, TransversalesPlanEstatal } from '../../utils/planEstal';
import styles from "../../styles/Ejes.module.css";

export default function PlanEstatal() {
  return (
    <section className={styles.ejes}>
      <h2>Ejes del Plan Estatal de Desarrollo</h2>
      <h3>Visualización Simultánea en Filas</h3>
      <p>Aquí se muestran ambos sliders en filas separadas.</p>
      <DualSlider topItems={ejesPlanEstatal} bottomItems={TransversalesPlanEstatal} />
    </section>
  );
}