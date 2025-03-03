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

    // Ancho del contenedor visible.
    const containerWidth = containerEl.offsetWidth;
    // Ancho total de cada wrapper.
    const topWrapperWidth = topWrapper.scrollWidth;
    const bottomWrapperWidth = bottomWrapper.scrollWidth;

    // Ajuste de 80px:
    const offset = 80;

    // Slider superior:
    // - Inicial: casi fuera, pero 80px adentro.
    // - Final: desplazado hasta que todo el contenido esté visible, con el mismo offset.
    const topInitial = containerWidth - offset;
    const topFinal = containerWidth - topWrapperWidth - offset;

    // Slider inferior:
    // - Inicial: casi fuera a la izquierda, pero 80px adentro.
    // - Final: se mueve hasta quedar completamente visible con 80px desde el borde izquierdo.
    const bottomInitial = -bottomWrapperWidth + offset;
    const bottomFinal = offset;

    // Definimos los estados iniciales.
    gsap.set(topWrapper, { x: topInitial });
    gsap.set(bottomWrapper, { x: bottomInitial });

    // Se usa el mayor recorrido entre ambos para determinar la duración del scroll.
    const maxScroll = Math.max(topWrapperWidth, bottomWrapperWidth);

    // Línea de tiempo común para ambas animaciones.
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl,
        start: 'top top',
        pin: true,
        scrub: 1,
        end: () => `+=${maxScroll}`,
      },
    });

    // Animación del slider superior: de topInitial a topFinal.
    timeline.to(topWrapper, {
      x: topFinal,
      ease: 'none',
    }, 0);

    // Animación del slider inferior: de bottomInitial a bottomFinal.
    timeline.to(bottomWrapper, {
      x: bottomFinal,
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
