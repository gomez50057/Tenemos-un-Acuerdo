"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import styles from "../styles/Linesvg.module.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function AnimatePath() {
  useEffect(() => {
    const containerEl = document.querySelector("#aboutTren");
    if (!containerEl) return;

    // Aseguramos que el SVG esté visible
    gsap.set("#linesvg", { opacity: 1 });

    const motionPathEl = document.querySelector("#motionPath");
    if (!motionPathEl) return;

    // Si es necesario ajustar verticalmente el inicio, aplica un offset (en este ejemplo, 0)
    const yOffset = 0;

    // Colocamos la imagen en el inicio del path
    gsap.set("#tractorImg", {
      motionPath: {
        path: "#motionPath",
        align: "#motionPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
      },
      y: -yOffset,
    });

    gsap.to("#tractorImg", {
      scrollTrigger: {
        trigger: containerEl,
        start: "top center",
        end: () => "+=" + containerEl.offsetHeight,
        scrub: 0.5,
        markers: true, // Quita en producción
      },
      ease: "none",
      motionPath: {
        path: "#motionPath",
        align: "#motionPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
      },
    });
  }, []);

  return (
    <div id="aboutTren" className={styles.aboutTren}>
      <svg
        id="linesvg"
        viewBox="0 0 1366 768"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="motionPath"
          className={styles.st0}
          d="m-3.8-12.6c62.4,169.5,124.8,339,187.2,508.5,8.8,18.4,26.3,31,46.5,33.6,403.9,52.1,807.8,104.2,1211.8,156.4"
        />
      </svg>
      {/* Imagen del tren */}
      <img
        id="tractorImg"
        src="/img/tren.svg"
        alt="Tren"
        style={{
          position: "absolute",
          width: "200px",
          height: "auto",
        }}
      />
    </div>
  );
}
