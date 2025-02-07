import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Create from "./pages/Create";
import Tasks from "./pages/Tasks";
import Wellcome from "./pages/Wellcome";

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

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    console.log({ userAgent });
    
    const isMobileDevice =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      );
      
    console.log("Is mobile device?", isMobileDevice); // Depuración
    setIsMobile(isMobileDevice);

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
      {isMobile && deferredPrompt && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <p>¿Te gustaría instalar esta aplicación en tu dispositivo?</p>
          <button
            onClick={handleInstallClick}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
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
