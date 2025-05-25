"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const img = "/img/";

const Navbar = () => {
  const [showEjes, setShowEjes] = useState(false);
  const [showTransversales, setShowTransversales] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollPos = useRef(0);

  // Handlers para hover (escritorio)
  const handleEjesMouseEnter = useCallback(() => setShowEjes(true), []);
  const handleEjesMouseLeave = useCallback(() => setShowEjes(false), []);
  const handleTransMouseEnter = useCallback(() => setShowTransversales(true), []);
  const handleTransMouseLeave = useCallback(() => setShowTransversales(false), []);

  // Handler para dispositivos táctiles (toggle)
  const toggleEjes = useCallback(() => setShowEjes(prev => !prev), []);
  const toggleTransversales = useCallback(() => setShowTransversales(prev => !prev), []);

  // Manejo optimizado del scroll con requestAnimationFrame y ref para almacenar la posición anterior
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Se muestra el navbar si se hace scroll hacia arriba o se está casi al tope
          setVisible(currentScrollPos < lastScrollPos.current || currentScrollPos < 10);
          lastScrollPos.current = currentScrollPos;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.Navbar} ${visible ? styles.active : styles.hidden} ${lastScrollPos.current > 100 ? styles.scrolled : ''}`}>
      <div className={styles.NavbarList}>
        <div className={styles.NavbarImg}>
          <img src={`${img}Coordinación.png`} alt="Logo de Planeación" />
          <img src={`${img}headertxt.png`} alt="Logo de Tenemos un Acuedo" />
        </div>
        <div className={styles.NavbarInicio}>
          <ul className={styles.navbarOpc}>
            <li><Link href="/">Inicio</Link></li>
            <li
              className={styles.dropdown}
              onMouseEnter={handleEjesMouseEnter}
              onMouseLeave={handleEjesMouseLeave}
            >
              <span className={styles.dropdownToggle} onClick={toggleEjes}>Ejes</span>
              {showEjes && (
                <ul className={styles.dropdownMenu}>
                  {[...Array(9)].map((_, index) => (
                    <li key={index + 1}><Link href={`/ejes-generales/eje-0${index + 1}`}>Sub Eje {index + 1}</Link></li>
                  ))}
                </ul>
              )}
            </li>
            <li
              className={styles.dropdown}
              onMouseEnter={handleTransMouseEnter}
              onMouseLeave={handleTransMouseLeave}
            >
              <span className={styles.dropdownToggle} onClick={toggleTransversales}>Transversales</span>
              {showTransversales && (
                <ul className={styles.dropdownMenu}>
                  {[...Array(3)].map((_, index) => (
                    <li key={index + 1}><Link href={`/ejes-trasversales/eje-0${index + 1}`}>Sub Transversal {index + 1}</Link></li>
                  ))}
                </ul>
              )}

            </li>
          </ul>
          <div className={styles.NavbarCirculo}>
            <img src={`${img}estrella.webp`} alt="Estrella de Hidalgo" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
