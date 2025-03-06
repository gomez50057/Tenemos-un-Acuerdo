"use client";

import Link from "next/link";
import { ejesTransversales } from "../../utils/ejesTransversales";
import styles from "../../styles/EjesTransversal.module.css";

export default function EjesTransversalesPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Ejes Transversales del Plan Estatal</h1>
      </header>
      <section className={styles.section}>
        <ul className={styles.list}>
          {ejesTransversales.map((transversal) => (
            <li key={transversal.slug} className={styles.listItem}>
              <Link href={`/ejes-trasversales/${transversal.slug}`}>
                {transversal.title.replace(/[*_]/g, "")}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
