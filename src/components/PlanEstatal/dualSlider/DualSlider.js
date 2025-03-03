"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './DualSlider.module.css';

gsap.registerPlugin(ScrollTrigger);

const DualSlider = ({ topItems, bottomItems }) => {
  const containerRef = useRef(null);
  const topWrapperRef = useRef(null);
  const bottomWrapperRef = useRef(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const topWrapper = topWrapperRef.current;
    const bottomWrapper = bottomWrapperRef.current;
    if (!containerEl || !topWrapper || !bottomWrapper) return;

    // Calcula el desplazamiento horizontal de cada fila para el movimiento final.
    const topScrollLength = topWrapper.scrollWidth - containerEl.offsetWidth;
    const bottomScrollLength = bottomWrapper.scrollWidth - containerEl.offsetWidth;

    // El desplazamiento total a animar es el ancho completo del wrapper.
    const maxScroll = Math.max(topWrapper.scrollWidth, bottomWrapper.scrollWidth);

    // Definimos los estados iniciales:
    // Fila superior: inicia fuera del viewport a la derecha.
    gsap.set(topWrapper, { x: containerEl.offsetWidth });
    // Fila inferior: inicia fuera del viewport a la izquierda.
    gsap.set(bottomWrapper, { x: -containerEl.offsetWidth });

    // Creamos una línea de tiempo común para ambas animaciones.
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl,
        start: 'top top', // Puedes ajustar este valor según necesites.
        pin: true,
        scrub: 1,
        end: () => `+=${maxScroll}`,
      },
    });

    // Animación de la fila superior: de x = containerEl.offsetWidth a -topScrollLength.
    timeline.to(topWrapper, {
      x: -topScrollLength,
      ease: 'none',
    }, 0);

    // Animación de la fila inferior: de x = -containerEl.offsetWidth a +bottomScrollLength.
    timeline.to(bottomWrapper, {
      x: bottomScrollLength,
      ease: 'none',
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [topItems, bottomItems]);

  return (
    <div className={styles.dualContainer} ref={containerRef}>
      {/* Fila superior */}
      <div className={styles.row}>
        <div className={styles.wrapper} ref={topWrapperRef}>
          {topItems.map((item, index) => (
            <div key={item.id || index} className={styles.slide}>
              <div className={styles.text}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
              <div className={styles.imgContainer}>
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="responsive"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fila inferior */}
      <div className={styles.row}>
        <div className={styles.wrapper} ref={bottomWrapperRef}>
          {bottomItems.map((item, index) => (
            <div key={item.id || index} className={styles.slide}>
              <div className={styles.text}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
              <div className={styles.imgContainer}>
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="responsive"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

DualSlider.propTypes = {
  topItems: PropTypes.array.isRequired,
  bottomItems: PropTypes.array.isRequired,
};

export default DualSlider;
