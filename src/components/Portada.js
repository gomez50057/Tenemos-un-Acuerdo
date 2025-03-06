"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from "../styles/Portada.module.css";
const imgBasePath = "/img/";

gsap.registerPlugin(ScrollTrigger);

export default function Portada() {
  const txtRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (txtRef.current) {
      // Obtenemos la sección actual (header) y la siguiente sección
      const headerSection = document.getElementById("header");
      const nextSection = headerSection?.nextElementSibling;

      // Obtenemos el rectángulo del elemento actual
      const headerTxtEl = txtRef.current;
      const headerTxtRect = headerTxtEl.getBoundingClientRect();
      // Definimos headerTxtDocBottom como la posición absoluta inferior del elemento
      const headerTxtDocBottom = window.scrollY + headerTxtRect.bottom;

      let distance = 0;
      if (nextSection) {
        // Obtenemos el rectángulo de la siguiente sección
        const nextSectionRect = nextSection.getBoundingClientRect();
        // Buscamos el contenedor interno "logoAcuerdo" dentro de la siguiente sección.
        // Usamos un selector que verifique que la clase contenga "logoAcuerdo".
        const innerContainer = nextSection.querySelector('[class*="logoAcuerdo"]');
        let nextSectionCenter = 0;
        if (innerContainer) {
          const innerRect = innerContainer.getBoundingClientRect();
          nextSectionCenter = window.scrollY + innerRect.top + innerRect.height;
        } else {
          // Si no se encuentra, se usa el centro de la sección completa
          nextSectionCenter = window.scrollY + nextSectionRect.top + nextSectionRect.height / 2;
        }
        distance = nextSectionCenter - headerTxtDocBottom;
      }
      
      // Estado inicial: sin transformación
      gsap.set(txtRef.current, { y: 0, opacity: 1, filter: 'none' });
      
      // Animación con ScrollTrigger: se desplaza el elemento hasta el centro de la siguiente sección,
      // aplicando además el efecto "marca de agua"
      gsap.to(txtRef.current, {
        scrollTrigger: {
          trigger: headerSection,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: false,
        },
        y: distance,
        opacity: 0.5,
        filter: "grayscale(100%) brightness(200%)",
        ease: "none"
      });
    }

    if (imgRef.current) {
      // Animación simple para la imagen secundaria: fadeIn
      gsap.set(imgRef.current, { opacity: 0 });
      gsap.to(imgRef.current, {
        delay: 0.1,
        opacity: 1,
        duration: 1,
        ease: "power1.out"
      });
    }
  }, []);

  return (
    <section id="header">
      <div className={styles.contentHeader}>
        <div className={`${styles.headerTxt} ${styles.fadeInTarget}`} ref={txtRef}>
          <img src={`${imgBasePath}headertxt.png`} alt="img_representativa" />
        </div>
        <div className={`${styles.headerImg} ${styles.fadeInTarget}`} ref={imgRef}>
          <img src={`${imgBasePath}headerimg.svg`} alt="img_representativa" className={styles.floatingImg} />
        </div>
      </div>
    </section>
  );
}
