"use client";
import { useState, useEffect } from "react";
import styles from "./BlogHeader.module.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import { normalizeName, items } from "../../utils/blogData";

const BlogHeader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Cambia la clave para forzar el reinicio de la animación
  const [manualChange, setManualChange] = useState(false); // Indica si se hizo un cambio manual

  useEffect(() => {
    // Actualizamos la clave de animación para reiniciar las animaciones
    setAnimationKey((prevKey) => prevKey + 1);
  }, [activeIndex]);

  useEffect(() => {
    // Configura el intervalo para cambiar el slider automáticamente
    if (!manualChange) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [items.length, manualChange]);

  const handleNext = () => {
    setManualChange(true); // Detiene el avance automático temporalmente
    setActiveIndex((prev) => (prev + 1) % items.length);
    restartAutoAdvance();
  };

  const handlePrev = () => {
    setManualChange(true); // Detiene el avance automático temporalmente
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    restartAutoAdvance();
  };

  const restartAutoAdvance = () => {
    setManualChange(false);
  };

  const getNextIndex = (index, offset) => {
    return (index + offset) % items.length;
  };

  const handlePreviewClick = (index) => {
    setManualChange(true); // Detiene el avance automático temporalmente
    setActiveIndex(index); // Cambiar la diapositiva al hacer clic en la previsualización
    restartAutoAdvance();
  };

  return (
    <div className={`${styles.container}`} style={{ backgroundImage: `url(${items[activeIndex].bg})` }}>
      <div className={styles.overlay}></div> {/* Capa semitransparente */}

      <div className={styles.content}>
        {/* Asignamos claves únicas para cada elemento */}
        <div key={`${animationKey}-name`} className={`${styles.name} ${styles.textAnimation} delay-1`}>
          {items[activeIndex].name}
        </div>
        <div key={`${animationKey}-des`} className={`${styles.des} ${styles.textAnimation} delay-2`}>
          {items[activeIndex].des}
        </div>
        <Link href={`/noticias/${normalizeName(items[activeIndex].name)}`} passHref>
          <button key={`${animationKey}-button`} className={`${styles.textAnimation} delay-3`}>
            Leer más
          </button>
        </Link>
      </div>

      <div className={styles.previewContainer}>
        {/* Previsualización de las siguientes imágenes */}
        {Array(2)
          .fill(null)
          .map((_, offset) => {
            const nextIndex = getNextIndex(activeIndex, offset + 1);
            return (
              <div
                key={nextIndex}
                className={`${styles.previewItem} ${styles.slideAnimation}`}
                style={{ backgroundImage: `url(${items[nextIndex].bg})` }}
                onClick={() => handlePreviewClick(nextIndex)} // Manejar clic para cambiar a esta diapositiva
              ></div>
            );
          })}
      </div>

      <div className={styles.button}>
        <button className={styles.prevButton} onClick={handlePrev}>
          <ArrowBackIos />
        </button>
        <button className={styles.nextButton} onClick={handleNext}>
          <ArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default BlogHeader;
