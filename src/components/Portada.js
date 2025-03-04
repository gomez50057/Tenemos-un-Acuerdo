"use client";

import { useEffect, useRef } from 'react';
import styles from "../styles/Portada.module.css";
const imgBasePath = "/img/";

export default function Portada() {
  const txtRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (txtRef.current) {
        txtRef.current.classList.add(styles.fadeIn);
      }
      if (imgRef.current) {
        imgRef.current.classList.add(styles.fadeIn);
      }
    },50);

    return () => clearTimeout(timeout);
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
