import React from 'react';
import DualSlider from './dualSlider/DualSlider';
import { ejesPlanEstatal, TransversalesPlanEstatal } from '../../utils/planEstal';
import styles from "../../styles/Ejes.module.css";

export default function PlanEstatal() {
  return (
    <section className={styles.ejes}>
      <div className={styles.planEstatalTxt}>
        <h2><span className='spanVino'>Plan Estatal de Desarrollo</span> </h2>
      </div>
      <DualSlider topItems={ejesPlanEstatal} bottomItems={TransversalesPlanEstatal} />
    </section>
  );
}