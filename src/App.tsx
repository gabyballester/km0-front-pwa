import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Create from "./pages/Create";
import Tasks from "./pages/Tasks";
import Wellcome from "./pages/Wellcome";

// Definimos el tipo para el evento beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

const Content = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Efecto para manejar la transición de páginas
  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  // Efecto para detectar si el usuario está en un dispositivo móvil y escuchar el evento beforeinstallprompt
  useEffect(() => {
    // Detectar si el usuario está en un dispositivo móvil
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      );

    console.log("Is mobile device?", isMobileDevice); // Depuración
    setIsMobile(isMobileDevice);

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("beforeinstallprompt event fired!"); // Depuración
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Función para manejar la instalación de la PWA
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(
        (choiceResult: { outcome: "accepted" | "dismissed" }) => {
          if (choiceResult.outcome === "accepted") {
            console.log("Usuario aceptó instalar la PWA");
          } else {
            console.log("Usuario rechazó instalar la PWA");
          }
          setDeferredPrompt(null);
        }
      );
    }
  };

  return (
    <div
      className={transitionStage}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setDisplayLocation(location);
          setTransistionStage("fadeIn");
        }
      }}
    >
      {/* Mostrar el banner de instalación solo si es un dispositivo móvil y el evento beforeinstallprompt está disponible */}
      {isMobile && deferredPrompt && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo casi transparente
            padding: "15px 20px",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "15px",
            fontFamily: "Arial, sans-serif",
            color: "#333",
            fontSize: "14px",
            maxWidth: "90%",
            width: "100%",
          }}
        >
          <p style={{ margin: 0 }}>
            ¿Te gustaría instalar esta aplicación en tu dispositivo?
          </p>
          <button
            onClick={handleInstallClick}
            style={{
              backgroundColor: "#34A853", // Verde de Google
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2E8B57")
            } // Efecto hover
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#34A853")
            }
          >
            Instalar
          </button>
        </div>
      )}

      <Routes location={displayLocation}>
        <Route path="/" element={<Wellcome />} />
        <Route path="/create" element={<Create />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
};

export default App;
