import { useEffect, useState } from "react";
import { useUIStore } from "../store/uiStore";
import { motion } from "framer-motion";
import {
  GrPowerShutdown,
  GrSettingsOption,
  GrMonitor,
  GrLock,
  GrRefresh,
  GrMoon,
} from "react-icons/gr";

export default function DesktopScreen() {
  const setScreen = useUIStore((state) => state.setScreen);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleShutdown = () => {
    // Step 1: Go to loading
    setScreen("loading");
    localStorage.setItem("macos-screen", "loading");

    // Step 2: After 2s (loading), go back to start screen
    setTimeout(() => {
      setScreen("start");
      localStorage.setItem("macos-screen", "start");
    }, 2000);
  };

  // Prevent default right-click and show custom menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  // Hide context menu on left click anywhere
  useEffect(() => {
    const hideMenu = () => setContextMenu({ ...contextMenu, visible: false });
    window.addEventListener("click", hideMenu);
    return () => window.removeEventListener("click", hideMenu);
  }, [contextMenu]);

  const [appleMenuOpen, setAppleMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setAppleMenuOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Sample apps for the dock
  const dockApps = [
    { name: "LaunchPad", icon: "/icons/apps/launchpad.png", padding: false },
    { name: "Finder", icon: "/icons/apps/Finder.png", padding: false },
    { name: "Safari", icon: "/icons/apps/safari.png", padding: false },
    { name: "Spotify", icon: "/icons/apps/spotify.png", padding: true },
    { name: "Messages", icon: "/icons/apps/imessage.png", padding: false },
    { name: "Mail", icon: "/icons/apps/mail.png", padding: false },
    { name: "Maps", icon: "/icons/apps/maps.png", padding: false },
    { name: "Notes", icon: "/icons/apps/notes.png", padding: false },
    { name: "Photos", icon: "/icons/apps/photos.png", padding: false },
    { name: "FaceTime", icon: "/icons/apps/facecam.png", padding: false },
    { name: "Calendar", icon: "/icons/apps/calender.png", padding: false },
    {
      name: "System Settings",
      icon: "/icons/apps/settings.png",
      padding: false,
    },
    { name: "Terminal", icon: "/icons/apps/terminal.png", padding: false },
    { name: "VS Code", icon: "/icons/apps/vscode.png", padding: false },
    { name: "Preview", icon: "/icons/apps/figma.png", padding: false },
    { name: "Trash", icon: "/icons/apps/trash.png", padding: false },
    {
      name: "Github",
      icon: "/icons/apps/github.png",
      padding: true,
      rounded: true,
    },
    {
      name: "Linkedin",
      icon: "/icons/apps/linkedin.png",
      padding: true,
      rounded: true,
    },
  ];

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      onContextMenu={handleContextMenu}
      className="h-screen bg-[url('/bg/2.jpg')] bg-cover bg-center flex flex-col select-none"
    >
      {/* Menu Bar */}
      <div className="bg-black/50 backdrop-blur-md text-white flex justify-between items-center px-4 text-sm">
        <div className="flex">
          <div className="relative">
            <div
              className="font-semibold cursor-pointer hover:bg-white/20 rounded px-1 py-0.5"
              onClick={(e) => {
                e.stopPropagation();
                setAppleMenuOpen(!appleMenuOpen);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 22.773 22.773"
                className="w-4 h-4"
              >
                <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573    c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334    c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0    c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019    c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464    c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648    c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
              </svg>
            </div>

            {/* Apple Menu Dropdown */}
            {appleMenuOpen && (
              <div className="absolute left-0 top-7 bg-gray-800/95 text-gray-300 rounded-md shadow-xl text-sm w-56 py-1 border z-50 border-gray-600">
                <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 hover:text-white text-left transition-colors">
                  <GrMonitor className="text-lg" />
                  <span>About This Mac</span>
                </button>

                <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 hover:text-white text-left transition-colors">
                  <GrSettingsOption className="text-lg" />
                  <span>System Settings</span>
                </button>

                <div className="border-t border-gray-600 my-1" />

                <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 hover:text-white text-left transition-colors">
                  <GrMoon className="text-lg" />
                  <span>Sleep</span>
                </button>

                <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 hover:text-white text-left transition-colors">
                  <GrLock className="text-lg" />
                  <span>Lock Screen</span>
                </button>

                <div className="border-t border-gray-600 my-1" />

                <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 hover:text-white text-left transition-colors">
                  <GrRefresh className="text-lg" />
                  <span>Restart</span>
                </button>

                <button
                  onClick={handleShutdown}
                  className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-blue-600 hover:text-white text-left transition-colors"
                >
                  <GrPowerShutdown className="text-lg" />
                  <span>Shut Down</span>
                </button>
              </div>
            )}
          </div>

          <span className="px-2 py-1 hover:bg-white/40 hover:text-black font-bold">
            Finder
          </span>
          <span className="px-2 py-1 hover:bg-white/40 hover:text-black">
            File
          </span>
          <span className="px-2 py-1 hover:bg-white/40 hover:text-black">
            Edit
          </span>
          <span className="px-2 py-1 hover:bg-white/40 hover:text-black">
            View
          </span>
          <span className="px-2 py-1 hover:bg-white/40 hover:text-black">
            Go
          </span>
          <span className="px-2 py-1 hover:bg-white/40 hover:text-black">
            Window
          </span>
          <span className="px-2 py-1 hover:bg-white/40 hover:text-black">
            Help
          </span>
        </div>
        <div className="flex">
          <span className="px-2 py-1 hover:bg-white/40 hover:text-black">
            Wi-Fi
          </span>
          <span className="px-2 py-1 hover:bg-white/40 hover:text-black">
            Battery
          </span>
          <span className="px-2 py-1 hover:bg-white/40 hover:text-black">
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className={`flex-grow relative ${appleMenuOpen ? "pointer-events-none" : ""}`}>
        {/* Custom Right Click Menu */}
        {contextMenu.visible && (
          <ul
            className="absolute bg-gray-600 text-white rounded-md shadow-md text-sm py-1 z-50 backdrop-blur-sm"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <li className="px-4 py-2 hover:bg-blue-500 cursor-pointer">
              New Folder
            </li>
            <li className="px-4 py-2 hover:bg-blue-500 cursor-pointer">
              Get Info
            </li>
            <li className="px-4 py-2 hover:bg-blue-500 cursor-pointer">
              Change Background
            </li>
            <li className="px-4 py-2 hover:bg-blue-500 cursor-pointer">
              Refresh
            </li>
          </ul>
        )}
      </div>

      {/* Dock */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 overflow-visible"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="overflow-visible"
          style={{ height: "116.5px", display: "flex", alignItems: "flex-end" }}
        >
          <motion.div
            className="flex items-center space-x-2 p-2 rounded-2xl shadow-lg mx-auto"
            style={{
              background: "rgba(28, 28, 30, 0.65)",
              backdropFilter: "blur(30px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              minHeight: "60px",
              alignSelf: "flex-end",
            }}
            whileHover={{ height: "80px" }}
            transition={{ type: "spring", damping: 10 }}
          >
            {dockApps.map((app, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center justify-end"
                whileHover={{
                  scale: 1.2,
                  y: -20,
                  transition: { type: "spring", damping: 10, mass: 0.5 },
                }}
              >
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-8 bg-white/90 text-black text-xs px-2 py-1 rounded whitespace-nowrap shadow-md pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {app.name}
                  <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45"></div>
                </motion.div>

                {/* Dock Icon */}
                <motion.div
                  className={`flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 cursor-pointer shadow-lg p-0 mb-1 ${
                    app.padding ? "p-[6px]" : ""
                  }`}
                  style={{ width: "48px", height: "48px" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.img
                    alt={app.name}
                    className={`object-contain ${
                      app.rounded ? "rounded-md" : ""
                    }`}
                    src={app.icon}
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
