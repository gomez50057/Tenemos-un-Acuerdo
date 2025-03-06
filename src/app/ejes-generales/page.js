"use client";

import Link from "next/link";
import { ejesGenerales } from "../../utils/ejesGenerales";
import styles from "../../styles/EjesGenerales.module.css";

export default function EjesGeneralesPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Ejes Generales del Plan Estatal</h1>
      </header>
      <section className={styles.section}>
        <ul>
          {ejesGenerales.map((eje) => (
            <li key={eje.slug}>
              <Link href={`/ejes-generales/${eje.slug}`}>
                {/* Removemos * y _ para el texto del enlace */}
                {eje.title.replace(/[*_]/g, "")}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
