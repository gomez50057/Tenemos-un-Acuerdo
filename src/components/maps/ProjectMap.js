"use client";
import React, { useEffect, useRef, useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import 'leaflet/dist/leaflet.css';
import './ProjectMap.css';
import { ZMP_Info } from './ZM'; // Zona de Pachuca
import { escMediaSupPrivada } from './educacionHidalgo'; // Capa de educación (puntos)

const ProjectMap = () => {
  const mapRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [L, setL] = useState(null);
  const [visibleZones, setVisibleZones] = useState({ 
    ZMP: true,
    escMediaSupPrivada: true,
  });

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

    // Función de estilo común para polígonos
    const commonStyle = (fillColor, color, weight = 2) => ({
      fillColor,
      fillOpacity: 0.3,
      color,
      weight,
    });

    // Capa ZMP_Info (polígono)
    const addZMPZone = () => {
      if (!L) return;
      return L.geoJSON(ZMP_Info, {
        style: commonStyle('#DEC9A3', '#DEC9A3'),
        onEachFeature: (feature, layer) => {
          // Popup de información
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

          layer.bindPopup(popupContent);
        }
      }).addTo(mapRef.current);
    };

    // Capa escMediaSupPrivada (puntos)
    const addEducationLayer = () => {
      if (!L) return;
      return L.geoJSON(escMediaSupPrivada, {
        // Se usa pointToLayer para mostrar un marcador personalizado
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 6,
            fillColor: "#2E86AB",
            color: "#1B4F72",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
          });
        },
        onEachFeature: (feature, layer) => {
          const { nom_estab, nom_loc, nom_mun, codigo_act, telefono, www } = feature.properties;
          let popupContent = `<b>${nom_estab || "Escuela"}</b><br>`;
          popupContent += nom_loc ? `<b>Localidad:</b> ${nom_loc}<br>` : "";
          popupContent += nom_mun ? `<b>Municipio:</b> ${nom_mun}<br>` : "";
          popupContent += codigo_act ? `<b>Código Actividad:</b> ${codigo_act}<br>` : "";
          popupContent += telefono ? `<b>Teléfono:</b> ${telefono}<br>` : "";
          popupContent += www && www !== "-999" ? `<b>Web:</b> <a href='${www}' target='_blank'>Ver sitio</a>` : "";
          layer.bindPopup(popupContent);
        }
      }).addTo(mapRef.current);
    };

    // Removemos capas existentes del mapa de tipo GeoJSON y agregamos las visibles
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) {
          mapRef.current.removeLayer(layer);
        }
      });
      if (visibleZones.ZMP) addZMPZone();
      if (visibleZones.escMediaSupPrivada) addEducationLayer();
    } else {
      // Inicializamos el mapa
      mapRef.current = L.map('map', {
        center: [19.6296533, -98.9263916],
        zoom: 9,
        zoomControl: false,
        minZoom: 8,
        maxZoom: 18,
      });

      L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(mapRef.current);

      if (visibleZones.ZMP) addZMPZone();
      if (visibleZones.escMediaSupPrivada) addEducationLayer();
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
              Zonas Metropolitanas y Educación
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
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="checkboxEdu"
                    checked={visibleZones.escMediaSupPrivada}
                    onChange={() => toggleZoneVisibility('escMediaSupPrivada')}
                  />
                  <label htmlFor="checkboxEdu">
                    Educación Media Superior Privada (Hidalgo)
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
