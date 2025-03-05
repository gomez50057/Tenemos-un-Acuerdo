"use client";
import React, { useEffect, useRef, useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import 'leaflet/dist/leaflet.css';
import './ProjectMap.css';
import { Hgo_Info } from './ZM';
import { escMediaSupPrivada } from './educacionHidalgo';

const ProjectMap = () => {
  const mapRef = useRef(null);
  const [L, setL] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState({
    Hgo: true,
    escMediaSupPrivada: true,
  });

  // Función para alternar la visibilidad de cada capa
  const toggleLayerVisibility = (layerKey) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  // Carga dinámica de Leaflet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet')
        .then((module) => setL(module.default))
        .catch((err) => console.error("Error al cargar Leaflet:", err));
    }
  }, []);

  // Función de estilo común para capas poligonales
  const commonStyle = (fillColor, color, weight = 2) => ({
    fillColor,
    fillOpacity: 0.3,
    color,
    weight,
  });

  // Función para crear el popup de la capa Hgo_Info
  const createPopupHgo = (feature) => {
    // Se reemplaza la cabecera del popup según lo solicitado
    const popupHeader = `<div class='PopupT'><b>Hidalgo</b></div>`;
    const {
      NOM_MUN,
      POBMUN,
      POBFEM,
      POBMAS,
      Superficie,
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

    let content = popupHeader;
    content += `<b>Municipio:</b> ${NOM_MUN || "Desconocido"}<br>`;
    content += `<b>Población Municipal:</b> ${poblacionMunicipal}<br>`;
    content += `<b>Mujeres:</b> ${poblacionFemenina}<br>`;
    content += `<b>Hombres:</b> ${poblacionMasculina}<br>`;
    content += `<b>Superficie:</b> ${superficieMunicipal}<br>`;
    content += `<b>Población Metropolitana:</b> ${poblacionMetropolitana}<br>`;
    content += `<div class='PopupSubT'><b>Instrumentos de Planeación</b></div>`;

    content += PMDU !== "No existe"
      ? `<b>PMDU:</b> <a href='${LINKPMDU || "#"}' target='_blank'>${NOM_LINK_P || "Consultar"}</a> <b>(${FECH || "N/A"})</b>`
      : `<b>PMDU:</b> ${PMDU}`;
      
    content += `<br><b>PMD:</b> <a href='${LINKPMD || "#"}' target='_blank'>Consultar</a> <b>(${FECHPMD || "N/A"})</b>`;
      
    content += ATLAS !== "No existe"
      ? `<br><b>Atlas de Riesgos:</b> <a href='${LINKATLAS || "#"}' target='_blank'>Consultar</a> <b>(${FECHATLAS || "N/A"})</b>`
      : `<br><b>Atlas de Riesgos:</b> ${ATLAS}`;

    return content;
  };

  // Función para crear el popup de la capa de educación
  const createPopupEducation = (feature) => {
    const { nom_estab, nom_loc, nom_mun, codigo_act, telefono, www } = feature.properties;
    let content = `<b>${nom_estab || "Escuela"}</b><br>`;
    if (nom_loc) content += `<b>Localidad:</b> ${nom_loc}<br>`;
    if (nom_mun) content += `<b>Municipio:</b> ${nom_mun}<br>`;
    if (codigo_act) content += `<b>Código Actividad:</b> ${codigo_act}<br>`;
    if (telefono) content += `<b>Teléfono:</b> ${telefono}<br>`;
    if (www && www !== "-999") content += `<b>Web:</b> <a href='${www}' target='_blank'>Ver sitio</a>`;
    return content;
  };

  // Agrega la capa de Hgo_Info (polígono)
  const addHgoZone = () => {
    return L.geoJSON(Hgo_Info, {
      style: commonStyle('#DEC9A3', '#DEC9A3'),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(createPopupHgo(feature));
      }
    }).addTo(mapRef.current);
  };

  // Agrega la capa de educación (puntos)
  const addEducationLayer = () => {
    return L.geoJSON(escMediaSupPrivada, {
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 6,
          fillColor: "#2E86AB",
          color: "#1B4F72",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        }),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(createPopupEducation(feature));
      }
    }).addTo(mapRef.current);
  };

  // Maneja la inicialización y actualización de las capas en el mapa
  useEffect(() => {
    if (!L) return;

    // Si el mapa ya existe, removemos las capas GeoJSON para evitar duplicados
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) {
          mapRef.current.removeLayer(layer);
        }
      });
    } else {
      // Inicializa el mapa
      mapRef.current = L.map('map', {
        center: [20.44819465937593, -98.41534285830343],
        zoom: 9,
        zoomControl: false,
        minZoom: 8,
        maxZoom: 18,
      });

      L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(mapRef.current);
    }

    // Agregar capas según el estado de visibilidad
    if (visibleLayers.Hgo) addHgoZone();
    if (visibleLayers.escMediaSupPrivada) addEducationLayer();

  }, [L, visibleLayers]);

  // Alterna la visibilidad del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    setTimeout(() => mapRef.current?.invalidateSize(), 300);
  };

  // Alterna el modo de pantalla completa
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
              Educación
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu glass-effect">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="checkboxHgo"
                    checked={visibleLayers.Hgo}
                    onChange={() => toggleLayerVisibility('Hgo')}
                  />
                  <label htmlFor="checkboxHgo">
                    Hidalgo
                  </label>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="checkboxEdu"
                    checked={visibleLayers.escMediaSupPrivada}
                    onChange={() => toggleLayerVisibility('escMediaSupPrivada')}
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
