"use client";

import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import styles from "./ChatbotMain.module.css";
import ChatForms from "./ChatForms";
import ForumForm from "./ForumForm";


const ChatbotMain = () => {
  const [formData, setFormData] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState("menu");

  const handleMenuClick = (step, zone = "") => {
    setFormData({});
    setCurrentStep(step);
    if (zone) setSelectedZone(zone);
  };

  const resetToMainMenu = () => {
    setCurrentStep("menu");
    setFormData({ name: "", description: "", municipalities: "" });
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
            <h4>eujmeplo de formulario</h4>
            <p>Desarrolla una idea pensando en el futuro Metropolitano.</p>
          </div>
        </li>


        <li onClick={() => handleMenuClick("consultaDigital")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/consulta.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>¡Participa en la Consulta Ciudadana!</h4>
            <p>Comparte tu opinión y ayúdanos a construir mejores políticas públicas. Accede al formulario digital y haz que tu voz cuente.</p>
          </div>
        </li>

        <li onClick={() => handleMenuClick("subeProyecto")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/proyecto.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Propón tu Proyecto para tu Comunidad</h4>
            <p>Comparte tu iniciativa y contribuye al desarrollo de tu localidad. Llena el formulario y sé parte del cambio.</p>
          </div>
        </li>

        <li onClick={() => handleMenuClick("buzonCiudadano")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/buzon.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Tu Opinión Nos Importa</h4>
            <p>Envíanos tus sugerencias, quejas o propuestas. Tu voz es clave para mejorar juntos.</p>
          </div>
        </li>

        <li onClick={() => handleMenuClick("eventosResultados")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/eventos.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Entérate de los Últimos Eventos y Resultados</h4>
            <p>Descubre los encuentros ciudadanos y conoce los avances y logros de las iniciativas más recientes.</p>
          </div>
        </li>

        <li onClick={() => handleMenuClick("inscripcionForo")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/foro.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Únete a los Foros de Participación</h4>
            <p>Regístrate en los foros ciudadanos y participa en debates sobre el futuro de tu comunidad.</p>
          </div>
        </li>

        <li onClick={() => handleMenuClick("preguntasFrecuentes")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/faqs.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Resolvemos tus Dudas</h4>
            <p>Consulta las respuestas a las preguntas más frecuentes sobre participación ciudadana.</p>
          </div>
        </li>

        <li onClick={() => handleMenuClick("normatividad")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/normatividad.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Consulta la Normativa Vigente</h4>
            <p>Accede a la biblioteca digital y conoce los Programas, Planes y Guías que ayudan al crecimiento de Hidalgo.</p>
          </div>
        </li>

        <li onClick={() => handleMenuClick("avisoPrivacidad")}>
          <div className={styles.icon}>
            <img src="/img/chatBot/privacidad.png" alt="Icono" />
          </div>
          <div className={styles.content}>
            <h4>Tu Información Está Protegida</h4>
            <p>Consulta nuestro aviso de privacidad y conoce cómo resguardamos tus datos personales.</p>
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

  const RenderingForumForm = () => (
    <div className={styles.step}>
      <ForumForm handleMenuClick={handleMenuClick} />
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
          "https://rbs8k6pucna.typeform.com/to/k8doyust"
        );

      case "subeProyecto":
        return renderProposalForm();

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
        return RenderingForumForm();

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
