import { useState, useEffect } from "react";
import { useUIStore } from "../store/uiStore";

const wallpapers = [
  { id: 1, src: "/bg/1.jpg" },
  { id: 2, src: "/bg/2.jpg" },
  { id: 3, src: "/bg/11.jpg" },
  { id: 4, src: "/bg/16.jpg" },
  { id: 5, src: "/bg/69.jpg" },
  { id: 6, src: "/bg/20.webp" },
];

const menuItems = [
  "Appearance",
  "Desktop & Wallpaper",
  "Wi-Fi",
  "Bluetooth",
  "Notifications",
  "Sound",
  "Focus",
  "Screen Time",
  "General",
  "Privacy & Security",
  "Users & Groups",
];

export default function SettingsApp({ defaultMenu = "General" }) {
  const [activeMenu, setActiveMenu] = useState(defaultMenu);
  useEffect(() => {
    setActiveMenu(defaultMenu);
  }, [defaultMenu]);
  const { desktopBackground, setDesktopBackground } = useUIStore();

  return (
    <div className="flex flex-col w-full h-full">
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[200px] bg-[#1a1a1c] p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => setActiveMenu(item)}
              className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
                activeMenu === item ? "bg-blue-600" : "hover:bg-white/10"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-6 bg-[#121217] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">{activeMenu}</h2>

          {activeMenu === "Desktop & Wallpaper" && (
            <>
              {/* Preview */}
              <div className="bg-[#1f1f25] rounded-xl p-4 mb-6">
                <div className="text-sm mb-2">Preview</div>
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={desktopBackground}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>

              {/* Wallpapers */}
              <div>
                <div className="text-sm mb-2">Wallpapers</div>
                <div className="grid grid-cols-4 gap-4">
                  {wallpapers.map((wp) => (
                    <div
                      key={wp.id}
                      onClick={() => setDesktopBackground(wp.src)}
                      className={`border-2 rounded-lg overflow-hidden cursor-pointer ${
                        desktopBackground === wp.src
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={wp.src}
                        alt={`Wallpaper ${wp.id}`}
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeMenu === "General" && (
            <div className="space-y-6 text-sm text-white/80">
              <div>
                <h3 className="text-base font-medium text-white mb-1">About</h3>
                <p>
                  macOS Portfolio v1.0 — A tribute to Apple’s sleek UI, built
                  using React, Tailwind, and Framer Motion.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-white mb-1">
                  Software Update
                </h3>
                <p>Your system is up to date.</p>
              </div>

              <div>
                <h3 className="text-base font-medium text-white mb-1">
                  Startup Disk
                </h3>
                <p>Macintosh HD</p>
              </div>

              <div>
                <h3 className="text-base font-medium text-white mb-1">
                  System Report
                </h3>
                <p>React: 18+, TailwindCSS: 3+, Framework: Vite</p>
              </div>
            </div>
          )}

          {activeMenu === "Appearance" && (
            <div className="space-y-6 text-sm text-white/80">
              <div>
                <h3 className="text-base font-semibold text-white mb-3">
                  Appearance Mode
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { mode: "Light", img: "/appearance/light.jpg" },
                    { mode: "Dark", img: "/appearance/dark.jpg" },
                    { mode: "Auto", img: "/appearance/auto.jpg" },
                  ].map((theme) => (
                    <div
                      key={theme.mode}
                      onClick={() =>
                        console.log(`Switched to ${theme.mode} mode`)
                      } // replace with your theme logic
                      className="cursor-pointer border border-white/10 hover:border-blue-500 rounded-lg overflow-hidden transition-all duration-200"
                    >
                      <img
                        src={theme.img}
                        alt={`${theme.mode} Mode`}
                        className="w-full h-24 object-cover"
                      />
                      <div className="text-center py-2 bg-[#1f1f25] text-white text-sm font-medium">
                        {theme.mode}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-3">
                  Accent Color
                </h3>
                <div className="flex space-x-3">
                  {[
                    "bg-blue-500",
                    "bg-red-500",
                    "bg-green-500",
                    "bg-yellow-400",
                    "bg-pink-500",
                    "bg-purple-500",
                    "bg-cyan-400",
                  ].map((color, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white/20 hover:border-white cursor-pointer ${color}`}
                      onClick={() => console.log(`Accent changed to ${color}`)} // hook into store or theme logic
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
