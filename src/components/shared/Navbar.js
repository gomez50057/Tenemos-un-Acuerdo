"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import './Navbar.css';

const img = "/img/escudos/";
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState(''); // Supón que obtienes el nombre de usuario de algún lugar
  const circuloRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < scrollPosition || currentScrollPos < 10);
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  const handleCirculoClick = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <nav className={`Navbar ${visible ? 'active' : 'hidden'} ${scrollPosition> 100 ? 'scrolled' : ''}`}>
      <ul>
        <div className="Navbar_img">
          <img src={`${img}Coordinación.png`} alt="Logo de Planeación" />
          <img src={`/img/headertxt.png`} alt="Logo de Tenemos un Acuedo" />

          <li><Link href="/"> Inicio </Link></li>
        </div>

        <div className="Navbar_inicio">
          <div className="navbar_opc">
            <li><Link href="/integrantes">Ejes</Link></li>
            <li><Link href="/noticias">Transversales</Link></li>
          </div>
          <div className="Navbar_circulo" ref={circuloRef} onClick={handleCirculoClick}>
            <img src={`${imgBasePath}estrella.webp`} alt="Estrella de Hidalgo" />
          </div>
        </div>
      </ul>

    </nav>
  );
};

export default Navbar;
