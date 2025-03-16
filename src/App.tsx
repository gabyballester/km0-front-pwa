import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/favicon.svg";
import "./App.css";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function App() {
  const [count, setCount] = useState(0);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      if (sessionStorage.getItem("installMessageClosed") !== "true") {
        setShowInstallMessage(true);
      }
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
      deferredPrompt.userChoice.then(({ outcome }) => {
        if (outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallMessage(false);
      });
    }
  };

  const handleCloseMessage = () => {
    setShowInstallMessage(false);
    sessionStorage.setItem("installMessageClosed", "true");
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + Reac</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {deferredPrompt && (
        <button onClick={handleInstallClick} className="install-button">
          Instalar App
        </button>
      )}
      {showInstallMessage && (
        <div className="install-message">
          <p>¿Quieres usar la aplicación?</p>
          <div className="install-message-buttons">
            <button onClick={handleInstallClick}>Instalar</button>
            <button onClick={handleCloseMessage}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
