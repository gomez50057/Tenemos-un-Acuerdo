"use client";

import React, { useRef, useEffect } from "react";
import styles from "./Ejes.module.css";
import { ejesPlanEstatal } from "../../../utils/planEstal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Ejes = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const sliderEl = sliderRef.current;
    if (!sliderEl) return;

    // Obtenemos el contenedor interno que tendrá las fichas en fila.
    const wrapper = sliderEl.querySelector(`.${styles.wrapper}`);
    if (!wrapper) return;

    // Calculamos el desplazamiento horizontal total (la diferencia entre el ancho del wrapper y el contenedor visible)
    const horizontalScrollLength = wrapper.scrollWidth - sliderEl.offsetWidth;

    // Animamos el desplazamiento horizontal en función del scroll vertical
    gsap.to(wrapper, {
      x: -horizontalScrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: sliderEl,
        start: "top 100px",
        pin: true, // Fija la sección durante la animación
        scrub: 1,  // Sincroniza la animación con el scroll
        end: () => `+=${wrapper.scrollWidth}`, // La duración del scroll dependerá del ancho total del wrapper
        // Opcional: puedes agregar snap para que la animación se detenga en cada ficha
        snap: 1 / (ejesPlanEstatal.length - 1),
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.sliderContainer} ref={sliderRef}>
      {/* El contenedor interno (wrapper) organiza las fichas en una sola fila */}
      <div className={styles.wrapper}>
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
    </div>
  );
};

export default Ejes;
