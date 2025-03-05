"use client";
import React, { useEffect, useRef, useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import 'leaflet/dist/leaflet.css';
import './ProjectMap.css';
import { ZMP_Info } from './ZM';

const ProjectMap = () => {
  const mapRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [L, setL] = useState(null);
  const [visibleZones, setVisibleZones] = useState({ ZMP: true });

  const toggleZoneVisibility = (zone) => {
    setVisibleZones((prevState) => ({
      ...prevState,
      [zone]: !prevState[zone],
    }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet')
        .then((module) => {
          setL(module.default);
        })
        .catch((err) => console.error("Error al cargar Leaflet:", err));
    }
  }, []);

  useEffect(() => {
    if (!L) return;

    const commonStyle = (fillColor, color, weight = 2) => ({
      fillColor,
      fillOpacity: 0.3,
      color,
      weight,
    });

    const createPopupContent = (feature) => {
      const {
        POBMUN,
        POBFEM,
        POBMAS,
        Superficie,
        NO_Zona,
        NOM_MUN,
        POB_ESTATA,
        PMDU,
        NOM_LINK_P,
        FECH,
        LINKPMDU,
        LINKPMD,
        FECHPMD,
        ATLAS,
        LINKATLAS,
        FECHATLAS,
      } = feature.properties;

      const poblacionMunicipal = POBMUN ? POBMUN.toLocaleString() : "No disponible";
      const poblacionFemenina = POBFEM ? POBFEM.toLocaleString() : "No disponible";
      const poblacionMasculina = POBMAS ? POBMAS.toLocaleString() : "No disponible";
      const superficieMunicipal = Superficie ? `${Superficie.toFixed(3)} km²` : "No disponible";
      const poblacionMetropolitana = POB_ESTATA ? POB_ESTATA.toLocaleString() : "No disponible";

      let popupContent = `
        <div class='PopupT'><b>Zona Metropolitana de </b>${NO_Zona || "Desconocida"}</div>
        <b>Municipio:</b> ${NOM_MUN || "Desconocido"}
        <br><b>Población Municipal:</b> ${poblacionMunicipal}
        <br><b>Mujeres:</b> ${poblacionFemenina}
        <br><b>Hombres:</b> ${poblacionMasculina}
        <br><b>Superficie:</b> ${superficieMunicipal}
        <br><b>Población Metropolitana:</b> ${poblacionMetropolitana}
        <div class='PopupSubT'><b>Instrumentos de Planeación </b></div>
      `;

      if (PMDU !== "No existe") {
        popupContent += `<b>PMDU:</b> <a href='${LINKPMDU || "#"}' target='_blank'>${NOM_LINK_P || "Consultar"}</a><b> (${FECH || "N/A"})</b>`;
      } else {
        popupContent += `<b>PMDU:</b> ${PMDU}`;
      }

      popupContent += `<br><b>PMD:</b> <a href='${LINKPMD || "#"}' target='_blank'><b>Consultar</b></a><b> (${FECHPMD || "N/A"})</b>`;

      if (ATLAS !== "No existe") {
        popupContent += `<br><b>Atlas de Riesgos:</b> <a href='${LINKATLAS || "#"}' target='_blank'><b>Consultar</b></a><b> (${FECHATLAS || "N/A"})</b>`;
      } else {
        popupContent += `<br><b>Atlas de Riesgos:</b> ${ATLAS}`;
      }

      return popupContent;
    };

    const addZMPZone = () => {
      if (!L) return;
      return L.geoJSON(ZMP_Info, {
        style: commonStyle('#DEC9A3', '#DEC9A3'),
        onEachFeature: (feature, layer) => {
          layer.bindPopup(createPopupContent(feature));
        }
      }).addTo(mapRef.current);
    };

    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) {
          mapRef.current.removeLayer(layer);
        }
      });
      if (visibleZones.ZMP) {
        addZMPZone();
      }
    } else {
      mapRef.current = L.map('map', {
        center: [20.44819465937593, -98.41534285830343],
        zoom: 8,
        zoomControl: false,
        minZoom: 9,
        maxZoom: 18,
      });

      L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(mapRef.current);

      if (visibleZones.ZMP) {
        addZMPZone();
      }
    }
  }, [L, visibleZones]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    setTimeout(() => mapRef.current?.invalidateSize(), 300);
  };

  const toggleFullScreen = () => {
    if (typeof window !== 'undefined') {
      if (!isFullScreen && mapRef.current) {
        mapRef.current.getContainer().requestFullscreen();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsFullScreen((prev) => !prev);
    }
  };

  return (
    <section className="mapaConte">
      <div id="map">
        <button
          id="toggleSidebar"
          onClick={toggleSidebar}
          className={isSidebarOpen ? 'open' : ''}
        >
          {isSidebarOpen ? 'Cerrar' : 'Abrir panel de información'}
        </button>

        <div id="fullscreenButton" onClick={toggleFullScreen}>
          {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </div>

        <div id="sidebar" className={isSidebarOpen ? 'open' : ''}>
          <p className="sidebar-title">Proyectos</p>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Zonas Metropolitanas
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu glass-effect">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="checkboxZMP"
                    checked={visibleZones.ZMP}
                    onChange={() => toggleZoneVisibility('ZMP')}
                  />
                  <label htmlFor="checkboxZMP">
                    Zona Metropolitana de Pachuca
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectMap;
