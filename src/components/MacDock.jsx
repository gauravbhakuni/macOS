import { useState } from "react";
import { motion } from "framer-motion";
import { useUIStore } from "../store/uiStore";

import SettingsApp from "./SettingsApp";
import ComingSoon from "./ComingSoon";
import AppWindow from "./AppWindow";
import Spotify from "./Spotify";
import Launchpad from "./Launchpad";
import Safari from "./Safari";

import { dockApps } from "../data/dockApps";

const MacDock = () => {
  const openApps = useUIStore((state) => state.openApps);
  const openApp = useUIStore((state) => state.openApp);
  const closeApp = useUIStore((state) => state.closeApp);
  const settingsDefaultMenu = useUIStore((state) => state.settingsDefaultMenu);

  const [showLaunchpad, setShowLaunchpad] = useState(false);

  const appScreenMap = {
    "System Settings": <SettingsApp defaultMenu={settingsDefaultMenu} />,
    LaunchPad: <ComingSoon appName="LaunchPad" />,
    Finder: <ComingSoon appName="Finder" />,
    Safari: <Safari />,
    Spotify: <Spotify />,
    Messages: <ComingSoon appName="Messages" />,
    Mail: <ComingSoon appName="Mail" />,
    Maps: <ComingSoon appName="Maps" />,
    Notes: <ComingSoon appName="Notes" />,
    Photos: <ComingSoon appName="Photos" />,
    FaceTime: <ComingSoon appName="FaceTime" />,
    Calendar: <ComingSoon appName="Calendar" />,
    Terminal: <ComingSoon appName="Terminal" />,
    "VS Code": <ComingSoon appName="VS Code" />,
    Preview: <ComingSoon appName="Preview" />,
    Trash: <ComingSoon appName="Trash" />,
    Github: <ComingSoon appName="Github" />,
    Linkedin: <ComingSoon appName="Linkedin" />,
  };

  return (
    <div>
      {openApps.map((appName) => (
        <AppWindow
          key={appName}
          appName={appName}
          onClose={() => closeApp(appName)}
        >
          {appScreenMap[appName]}
        </AppWindow>
      ))}

      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30 overflow-visible"
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
            {dockApps.map((app, index) => {
              const isOpen = openApps.includes(app.name);
              return (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center justify-end"
                  whileHover={{
                    scale: 1.2,
                    y: -20,
                    transition: { type: "spring", damping: 10, mass: 0.5 },
                  }}
                  onClick={() => {
                    if (app.name === "LaunchPad") {
                      setShowLaunchpad(true);
                    } else if (app.name === "System Settings") {
                      openApp("System Settings", "General");
                    } else {
                      openApp(app.name);
                    }
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
                  {/* Open app indicator */}
                  {isOpen && (
                    <div
                      className="w-2 h-2 rounded-full bg-blue-400 mt-1 shadow-md"
                      style={{ boxShadow: "0 0 6px #60a5fa" }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {showLaunchpad && (
        <Launchpad apps={dockApps} onClose={() => setShowLaunchpad(false)} />
      )}
    </div>
  );
};

export default MacDock;
