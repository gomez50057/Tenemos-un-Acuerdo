"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const img = "/img/";

const Navbar = () => {
  const [showEjes, setShowEjes] = useState(false);
  const [showTransversales, setShowTransversales] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  // Eventos para manejar hover en escritorio
  const handleEjesMouseEnter = () => setShowEjes(true);
  const handleEjesMouseLeave = () => setShowEjes(false);
  const handleTransMouseEnter = () => setShowTransversales(true);
  const handleTransMouseLeave = () => setShowTransversales(false);

  // Evento de clic para dispositivos táctiles
  const toggleEjes = () => setShowEjes(prev => !prev);
  const toggleTransversales = () => setShowTransversales(prev => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < scrollPosition || currentScrollPos < 10);
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  return (
    <nav className={`${styles.Navbar} ${visible ? styles.active : styles.hidden} ${scrollPosition > 100 ? styles.scrolled : ''}`}>
      <ul className={styles.NavbarList}>
        <div className={styles.NavbarImg}>
          <img src={`${img}Coordinación.png`} alt="Logo de Planeación" />
          <img src={`${img}headertxt.png`} alt="Logo de Tenemos un Acuedo" />
          <li>
            <Link href="/">Inicio</Link>
          </li>
        </div>
        <div className={styles.NavbarInicio}>
          <div className={styles.navbarOpc}>
            <li
              className={styles.dropdown}
              onMouseEnter={handleEjesMouseEnter}
              onMouseLeave={handleEjesMouseLeave}
            >
              <span className={styles.dropdownToggle} onClick={toggleEjes}>Ejes</span>
              {showEjes && (
                <ul className={styles.dropdownMenu}>
                  <li><Link href="/ejes/sub1">Sub Eje 1</Link></li>
                  <li><Link href="/ejes/sub2">Sub Eje 2</Link></li>
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
                  <li><Link href="/transversales/sub1">Sub Transversal 1</Link></li>
                  <li><Link href="/transversales/sub2">Sub Transversal 2</Link></li>
                </ul>
              )}
            </li>
          </div>
          <div className={styles.NavbarCirculo}>
            <img src={`${img}estrella.webp`} alt="Estrella de Hidalgo" />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
