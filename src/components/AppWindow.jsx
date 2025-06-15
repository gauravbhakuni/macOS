import Draggable from "react-draggable";
import { useRef, useState } from "react";

export default function AppWindow({ appName, onClose, children }) {
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".app-header"
      disabled={isMaximized} // Prevent dragging when maximized
    >
      <div
        ref={nodeRef}
        className={`absolute z-40 ${
          isMaximized
            ? "top-0 left-0 w-[100vw] h-[100vh]"
            : "top-1/2 left-1/2 w-[60vw] h-[70vh] -translate-x-1/2 -translate-y-1/2"
        } bg-[#101012] text-white rounded-xl shadow-2xl border border-white/10 overflow-hidden`}
      >
        {/* Window Controls */}
        <div className="h-10 bg-[#1a1a1c] flex items-center px-4 space-x-2 app-header select-none">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            title="Close"
          />
          <button
            onClick={() => setIsMaximized((v) => !v)}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            title="Maximize"
          />
          <span className="ml-4 text-sm font-medium">{appName}</span>
        </div>

        {/* App Content */}
        <div className="w-full h-[calc(100%-2.5rem)]">{children}</div>
      </div>
    </Draggable>
  );
}
