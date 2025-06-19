// src/components/Launchpad.jsx
import { useEffect, useState } from "react";
import { useUIStore } from "../store/uiStore";

export default function Launchpad({ apps, onClose }) {
  const openApp = useUIStore((state) => state.openApp);
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  useEffect(() => {
    const showDivMountedTimer = setTimeout(() => {
      setIsVisible(true);
      const startFadeInTimer = setTimeout(() => {
        setIsFadingIn(true);
      }, 300);
      return () => clearTimeout(startFadeInTimer);
    }, 1000);

    const startFadeOutTimer = setTimeout(() => {
      setIsFadingIn(false);
      const hideDivUnmountedTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(hideDivUnmountedTimer);
    }, 5500);

    return () => {
      clearTimeout(showDivMountedTimer);
      clearTimeout(startFadeOutTimer);
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-8 flex flex-col items-center justify-center">
      {isVisible && (
        <div
          className={`
            absolute top-4 px-8 py-4 bg-red-400 text-white rounded-full
            transition-opacity duration-500 ease-in-out
            ${isFadingIn ? "opacity-100" : "opacity-0"}
          `}
        >
          <h1>To exit fullscreen, press ESC</h1>
        </div>
      )}
      <h2 className="text-white text-3xl font-semibold mb-6">Launchpad</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
        {apps.map((app) => (
          <div
            key={app.name}
            className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              openApp(app.name);
              onClose();
            }}
          >
            <img
              src={app.icon}
              alt={app.name}
              className="w-16 h-16 rounded-xl shadow-md"
            />
            <span className="text-sm text-white/80">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
