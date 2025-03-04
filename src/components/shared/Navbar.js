"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Navbar.css';
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
  const toggleEjes = () => setShowEjes((prev) => !prev);
  const toggleTransversales = () => setShowTransversales((prev) => !prev);

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
    <nav className={`Navbar ${visible ? 'active' : 'hidden'} ${scrollPosition > 100 ? 'scrolled' : ''}`}>

      <ul>
        <div className="Navbar_img">
          <img src={`${img}Coordinación.png`} alt="Logo de Planeación" />
          <img src={`${img}headertxt.png`} alt="Logo de Tenemos un Acuedo" />
          <li>
            <Link href="/">Inicio</Link>
          </li>
        </div>
        <div className="Navbar_inicio">
          <div className="navbar_opc">
            <li
              className="dropdown"
              onMouseEnter={handleEjesMouseEnter}
              onMouseLeave={handleEjesMouseLeave}
            >
              <span className="dropdown-toggle" onClick={toggleEjes}>Ejes</span>
              {showEjes && (
                <ul className="dropdown-menu">
                  <li><Link href="/integrantes/sub1">Sub Eje 1</Link></li>
                  <li><Link href="/integrantes/sub2">Sub Eje 2</Link></li>
                </ul>
              )}
            </li>
            <li
              className="dropdown"
              onMouseEnter={handleTransMouseEnter}
              onMouseLeave={handleTransMouseLeave}
            >
              <span className="dropdown-toggle" onClick={toggleTransversales}>Transversales</span>
              {showTransversales && (
                <ul className="dropdown-menu">
                  <li><Link href="/noticias/sub1">Sub Transversalaaaaaaaaaaaaaa 1</Link></li>
                  <li><Link href="/noticias/sub2">Sub Transversal 2</Link></li>
                </ul>
              )}
            </li>
          </div>
          <div className="Navbar_circulo">
            <img src={`${img}estrella.webp`} alt="Estrella de Hidalgo" />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
