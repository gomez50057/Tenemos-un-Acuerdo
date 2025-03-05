"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const imgBasePath = "/img/";

const Navbar = () => {
  const [showEjes, setShowEjes] = useState(false);
  const [showTransversales, setShowTransversales] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);

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
    <nav
      className={`${styles.Navbar} ${visible ? styles.active : styles.hidden} ${scrollPosition > 100 ? styles.scrolled : ""
        }`}
    >
      <ul className={styles.NavbarList}>
        <div className={styles.NavbarImg}>
          <img src={`${imgBasePath}Coordinación.png`} alt="Logo de Planeación" />
          <img src={`${imgBasePath}headertxt.png`} alt="Logo de Tenemos un Acuerdo" />
          <li>
            <Link href="/">Inicio</Link>
          </li>
        </div>
        <div className={styles.NavbarInicio}>
          <div className={styles.NavbarOpc}>
            <li
              className={styles.dropdown}
              onMouseEnter={() => setShowEjes(true)}
              onMouseLeave={() => setShowEjes(false)}
            >
              <span className={styles.dropdownToggle} onClick={() => setShowEjes((prev) => !prev)}>
                Ejes
              </span>
              {showEjes && (
                <ul className={styles.dropdownMenu}>
                  <li><Link href="/integrantes/sub1">Sub Eje 1</Link></li>
                  <li><Link href="/integrantes/sub2">Sub Eje 2</Link></li>
                </ul>
              )}
            </li>
            <li
              className={styles.dropdown}
              onMouseEnter={() => setShowTransversales(true)}
              onMouseLeave={() => setShowTransversales(false)}
            >
              <span className={styles.dropdownToggle} onClick={() => setShowTransversales((prev) => !prev)}>
                Transversales
              </span>
              {showTransversales && (
                <ul className={styles.dropdownMenu}>
                  <li><Link href="/noticias/sub1">Sub Transversal 1</Link></li>
                  <li><Link href="/noticias/sub2">Sub Transversal 2</Link></li>
                </ul>
              )}
            </li>
          </div>
          <div className={styles.NavbarCirculo}>
            <img src={`${imgBasePath}estrella.webp`} alt="Estrella de Hidalgo" />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
