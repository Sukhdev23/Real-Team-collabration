// components/WorkspacePopover.jsx
import React, { useRef, useEffect } from "react";

const WorkspacePopover = ({ isOpen, onClose, anchorRef, children }) => {
  const panelRef = useRef(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute left-4 top-10 w-80 bg-white border shadow-lg rounded-xl z-50 p-2"
    >
      <button className="absolute top-2 right-2" onClick={onClose}>
        ✖
      </button>
      {children}
    </div>
  );
};

export default WorkspacePopover;
