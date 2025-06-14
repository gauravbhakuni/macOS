import { useState } from "react";
import { useUIStore } from "../store/uiStore";

const wallpapers = [
  { id: 1, src: "/bg/1.jpg" },
  { id: 2, src: "/bg/2.jpg" },
  { id: 3, src: "/bg/11.jpg" },
  { id: 4, src: "/bg/16.jpg" },
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

export default function SettingsApp() {
  const [activeMenu, setActiveMenu] = useState("Desktop & Wallpaper");
  const { closeApp } = useUIStore();
  const { desktopBackground, setDesktopBackground } = useUIStore();

  return (
    <div className="flex flex-col w-full h-full">
      {/* Top bar (Window controls) */}
      <div className="h-10 bg-[#1a1a1c] flex items-center px-4 space-x-2 app-header">
        <button
          onClick={() => closeApp("System Settings")}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        />
        <span className="ml-4 text-sm font-medium">System Settings</span>
      </div>

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
        </div>
      </div>
    </div>
  );
}

