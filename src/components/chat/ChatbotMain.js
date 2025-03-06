"use client";

import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import styles from "./ChatbotMain.module.css";
import ChatForms from "./ChatForms";

const ChatbotMain = () => {
  const [formData, setFormData] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState("menu");
  const [selectedZone, setSelectedZone] = useState("");

  const handleCollapseChat = () => setIsChatOpen(false);

  const handleMenuClick = (step, zone = "") => {
    setFormData({});
    setCurrentStep(step);
    if (zone) setSelectedZone(zone);
  };

  const resetToMainMenu = () => {
    setCurrentStep("menu");
    setFormData({ name: "", description: "", municipalities: "" });
    setSelectedZone("");
  };

  const renderMenu = () => (
    <div className={styles.menu}>
      <div className={styles.header}>
        <img src="img/sidebarRecurso.png" alt="Chatbot Logo" className={styles.logo} />
        <div>
          <img src="img/headertxt.png" alt="Metrópoli Hidalgo" className={styles.logotxt} />
          <div className={styles.welcomeText}>
            <p>¡HOLA!<span>¿Cómo puedo ayudarte?</span></p>
          </div>
        </div>
      </div>
      <ul className={styles.options}>
        <li onClick={() => handleMenuClick("proposal")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/proposal.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Quiero hacer una propuesta metropolitana</h4>
            <p>Desarrolla una idea pensando en el futuro Metropolitano.</p>
          </div>
        </li>
        <li onClick={() => handleMenuClick("zoneInfo")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/zoneInfo.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Quiero información acerca de alguna de las zonas metropolitanas</h4>
            <p>Conoce lo más relevante de cada zona Metropolitana.</p>
          </div>
        </li>
        <li onClick={() => handleMenuClick("authorities")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/authorities.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Quiero conocer el trabajo de las autoridades en materia metropolitana</h4>
            <p>Descubre cómo las autoridades gestionan y coordinan el desarrollo y bienestar de las zonas metropolitanas.</p>
          </div>
        </li>
        <li onClick={() => handleMenuClick("projects")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/projects.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Quiero conocer los proyectos metropolitanos</h4>
            <p>Explora los proyectos metropolitanos a través de un mapa interactivo y conoce su impacto en la región.</p>
          </div>
        </li>
        <li onClick={() => handleMenuClick("planning")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/planning.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Quiero conocer los instrumentos de planeación</h4>
            <p>Accede a la biblioteca digital y descubre herramientas clave para la coordinación metropolitana.</p>
          </div>
        </li>
        <li onClick={() => handleMenuClick("cartography")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/cartography.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Quiero Explora la Cartografía las Zonas Metropolitanas</h4>
            <p>Visualiza el mapa en PDF con las delimitaciones de cada Zona Metropolitana, sus límites territoriales y los municipios que las integran.</p>
          </div>
        </li>
      </ul>
    </div>
  );

  const renderProposalForm = () => (
    <div className={styles.step}>
      <ChatForms handleMenuClick={handleMenuClick} />
    </div>
  );

  const renderResponseWithLink = (message, link) => (
    <div className={styles.chatbotStep}>
      <p>{message}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.linkInline}>Consulta</a>
      <button className={styles.iconButtonXl} onClick={resetToMainMenu}><HomeIcon className={styles.iconHeader} />Regresar al menú principal</button>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case "menu":
        return renderMenu();
      case "proposal":
        return renderProposalForm();
      case "proposalThanks":
        return (
          <div className={styles.step}>
            <div>
              <p>¡Gracias por compartir tu propuesta! La tomaremos en cuenta para seguir construyendo juntos un mejor futuro metropolitano. </p>
              <p>Tu participación es clave para construir un futuro más sostenible e innovador para Hidalgo. ¡Sigue contribuyendo</p>
              <p>¡Tu voz es el motor del cambio!</p>
            </div>
            <button className={styles.iconButtonXl} onClick={resetToMainMenu}><HomeIcon className={styles.iconHeader} />Regresar al menú principal</button>
          </div>
        );


      case "consultaDigital":
        return renderResponseWithLink(
          "¡Participa en la Consulta Ciudadana! Comparte tu opinión y ayúdanos a construir mejores políticas públicas.",
          "https://link-a-consulta-digital.com"
        );

      case "subeProyecto":
        return renderResponseWithLink(
          "Comparte tu iniciativa y contribuye al desarrollo de tu comunidad. Llena el formulario y sé parte del cambio.",
          "https://link-a-formulario-proyectos.com"
        );

      case "buzonCiudadano":
        return renderResponseWithLink(
          "Tu opinión es clave. Envíanos tus sugerencias, quejas o propuestas a través de nuestro Buzón Ciudadano.",
          "https://link-a-buzon-ciudadano.com"
        );

      case "mapaMegaproyectos":
        return renderResponseWithLink(
          "Consulta el mapa interactivo con los megaproyectos en desarrollo y conoce su impacto en tu comunidad.",
          "https://link-a-mapa-megaproyectos.com"
        );

      case "eventosResultados":
        return renderResponseWithLink(
          "Descubre los últimos eventos y conoce los avances y logros de las iniciativas más recientes.",
          "https://link-a-eventos-resultados.com"
        );

      case "inscripcionForo":
        return renderResponseWithLink(
          "Regístrate en los foros ciudadanos y participa en debates sobre el futuro de tu comunidad.",
          "https://link-a-inscripcion-foro.com"
        );

      case "preguntasFrecuentes":
        return renderResponseWithLink(
          "Consulta las respuestas a las preguntas más frecuentes sobre participación ciudadana.",
          "https://link-a-preguntas-frecuentes.com"
        );

      case "normatividad":
        return renderResponseWithLink(
          "¡Genial! Ya estás a un clic de acceder a la Biblioteca Digital. Descubre información completa sobre Programas, Planes y Guías que impulsan el crecimiento de Hidalgo.",
          "https://bibliotecadigitaluplaph.hidalgo.gob.mx/"
        );

      case "avisoPrivacidad":
        return renderResponseWithLink(
          "Tu información está protegida. Consulta nuestro aviso de privacidad aquí:",
          "https://gobierno.hidalgo.gob.mx/AvisoPrivacidad"
        );

      default:
        return renderMenu();
    }
  };

  return (
    <>
      {!isChatOpen ? (
        // Estado colapsado: se muestra solo el logo
        <img
          src="img/sidebarRecurso.png"
          alt="Chatbot Logo"
          className={styles.logoCollapsed}
          onClick={() => setIsChatOpen(true)}
        />
      ) : (
        // Estado expandido: se muestra la interfaz principal del chat
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <button
              className={styles.iconButtonXs}
              onClick={() => setIsChatOpen(false)}
            >
              <CloseIcon className={styles.iconHeader} />
            </button>
            <button
              className={styles.iconButtonXs}
              onClick={resetToMainMenu}
            >
              <HomeIcon className={styles.iconHeader} />
            </button>
          </div>
          <div className={styles.containerMain}>{renderContent()}</div>
        </div>
      )}
    </>
  );
};

export default ChatbotMain;
