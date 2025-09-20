import { motion } from "framer-motion";
import { useUIStore } from "../store/uiStore";
import { useState, useEffect } from "react";

import { backgrounds } from "../data/background";

export default function BackgroundModal() {
  const { desktopBackground, setDesktopBackground, setBgModalOpen } = useUIStore();
  const [selectedBg, setSelectedBg] = useState(desktopBackground);
  const [isMaximized, setIsMaximized] = useState(false);

  // Initialize with current background
  useEffect(() => {
    setSelectedBg(desktopBackground);
  }, [desktopBackground]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className={`bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden ${
          isMaximized ? "w-[90vw] h-[90vh]" : "w-[560px]"
        }`}
      >
        {/* macOS Window Controls */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200/50">
          <div className="flex space-x-2">
            <button 
              onClick={() => setBgModalOpen(false)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            />
            <button 
              onClick={() => setBgModalOpen(false)}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            />
          </div>
          <h2 className="text-sm font-medium text-gray-700 mx-auto">
            Desktop Pictures
          </h2>
        </div>

        <div className="p-6">
          <div className={`grid ${isMaximized ? "grid-cols-5" : "grid-cols-3"} gap-4 mb-6`}>
            {backgrounds.map((bg, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <img
                  src={bg}
                  alt="Background"
                  className={`w-full h-32 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedBg === bg 
                      ? "border-blue-500 ring-2 ring-blue-300" 
                      : "border-gray-200/80"
                  }`}
                  onClick={() => setSelectedBg(bg)}
                />
                {selectedBg === bg && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="white"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ backgroundColor: "rgba(0,122,255,0.9)" }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-1.5 rounded-md bg-blue-500 text-white text-sm font-medium"
              onClick={() => {
                setDesktopBackground(selectedBg);
                setBgModalOpen(false);
              }}
            >
              Set Desktop Picture
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}