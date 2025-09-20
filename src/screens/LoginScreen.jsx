import { useState, useEffect } from "react";
import { preloadImages } from "../utils/preloadImages"; // we'll create this file
import { dockApps } from "../data/dockApps";

export default function LoginScreen({ onLoginSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPasswordField, setShowPasswordField] = useState(false);

  // update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔥 Preload desktop + dock assets silently in the background
  useEffect(() => {
    const preloadList = [
      "/bg/1.jpg",
      "/bg/desktop.jpg", // your DesktopScreen background
      ...dockApps.map((app) => app.icon), // all dock icons
    ];
    preloadImages(preloadList);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin") {
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  const handleIconClick = () => {
    setShowPasswordField(true);
    setTimeout(() => document.querySelector("input")?.focus(), 100);
  };

  // format time + date
  const dayName = currentTime.toLocaleDateString("en-US", { weekday: "long" });
  const date = currentTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="h-screen w-full flex flex-col items-center bg-[url('/bg/1.jpg')] bg-cover bg-center">
      {/* Top section with date and time */}
      <div className="mt-42 mb-12 text-center">
        <p className="text-white text-lg mt-2 font-medium">
          {dayName}, {date}
        </p>
        <h1 className="text-white text-6xl font-extrabold">{time}</h1>
      </div>

      {/* Middle section */}
      <div className="flex-grow flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div
            onClick={handleIconClick}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src="/avatar/luffy.jpg"
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-white mb-4 hover:brightness-110 transition"
            />
            <h2 className="text-white text-xl font-semibold mb-1">User</h2>
            <p className="text-white/80 text-sm">Click to unlock</p>
            <p className="text-white/80 text-sm mb-4">
              Password: <span className="text-amber-200">admin</span>
            </p>
          </div>

          {showPasswordField && (
            <form
              onSubmit={handleLogin}
              className="w-full flex flex-col items-center animate-[fadeIn_0.3s_ease-out]"
            >
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-60 px-4 py-2 rounded bg-black/50 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-black text-center"
                autoFocus
              />
              {error && (
                <p className="text-red-200 text-sm mt-2">Incorrect password</p>
              )}

              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-black/80 hover:bg-black text-white rounded transition"
              >
                Unlock
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
