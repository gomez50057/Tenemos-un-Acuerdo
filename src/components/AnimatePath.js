"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import styles from "../styles/Linesvg.module.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function AnimatePath() {
  const [width, setWidth] = useState(window.innerWidth * 1.2); // 120% del ancho

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth * 1.2);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const containerEl = document.querySelector("#aboutTren");
    if (!containerEl) return;

    // Aseguramos que el SVG se muestre
    gsap.set("#linesvg", { opacity: 1 });

    const motionPathEl = document.querySelector("#motionPath");
    if (!motionPathEl) return;

    const yOffset = 0;

    // Posiciona la imagen al inicio del path, con rotación fija a 180°
    gsap.set("#tractorImg", {
      rotation: 0,
      motionPath: {
        path: "#motionPath",
        align: "#motionPath",
        alignOrigin: [0, 1],
        autoRotate: false,
        start: 0,
      },
      y: -yOffset,
    });

    gsap.to("#tractorImg", {
      scrollTrigger: {
        trigger: containerEl,
        start: "top center",
        end: () => "+=" + containerEl.offsetHeight,
        scrub: 12,
        markers: true,
      },
      ease: "none",
      motionPath: {
        path: "#motionPath",
        align: "#motionPath",
        alignOrigin: [0, 1],
        autoRotate: false,
        start: 0,
      },
      rotation: 0,
    });
  }, []);

  return (
    <div id="aboutTren" className={styles.aboutTren}>
      <svg
        id="linesvg"
        className={styles.linesvg}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} 10`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"

      >
        <path
          id="motionPath"
          className={styles.st0}
          d={`M-${width * 0.1},10 L${width},10`}
        />
      </svg>
      <img
        id="tractorImg"
        src="/img/tren.svg"
        alt="Tren"
        style={{
          position: "absolute",
          bottom: 0,
          width: "200px",
          height: "auto",
          zIndex: 10,
        }}
      />
    </div>
  );
}
