"use client";
import React from 'react';
import Link from 'next/link';
import './Navbar.css';

const img = "/img/";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <ul>
        <div className="Navbar_img">
          <img src={`${img}Coordinación.png`} alt="Logo de Planeación" />
          <img src={`${img}headertxt.png`} alt="Logo de Tenemos un Acuedo" />

          <li><Link href="/"> Inicio </Link></li>
        </div>

        <div className="Navbar_inicio">
          <div className="navbar_opc">
            <li><Link href="/integrantes">Ejes</Link></li>
            <li><Link href="/noticias">Transversales</Link></li>
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
