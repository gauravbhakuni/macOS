import Draggable from "react-draggable";
import { useRef } from "react";

export default function AppWindow({ appName, onClose, children }) {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".app-header">
      <div
        ref={nodeRef}
        className="absolute top-24 left-24 w-[60vw] h-[70vh] bg-[#101012] text-white rounded-xl shadow-2xl border border-white/10 overflow-hidden"
      >
        {children}
      </div>
    </Draggable>
  );
}
