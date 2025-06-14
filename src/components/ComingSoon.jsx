import { useState } from "react";
import { useUIStore } from "../store/uiStore";

export default function ComingSoon({ appName = "This app" }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const { closeApp } = useUIStore();
  return (
    <div className="flex items-center justify-center">
      <div className={`${
          isMaximized ? "w-[100vw] h-[100vh]" : "w-[60vw] h-[70vh]"
        }  bg-[#101012] text-white rounded-xl flex flex-col overflow-hidden shadow-2xl border border-white/10`}>
        {/* Top Bar with macOS-style buttons */}
        <div className="app-header h-10 bg-[#1a1a1c] flex items-center px-4 space-x-2">
          <button
            onClick={() => closeApp(appName)}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          />
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
          />
          <button
            onClick={() => closeApp(appName)}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
          />
        </div>

        {/* Centered Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-2xl font-bold mb-2">{appName}</h2>
          <p className="text-white/70">Coming soon... 🚧</p>
        </div>
      </div>
    </div>
  );
}
