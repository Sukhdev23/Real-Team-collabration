import React from "react";

const Tooltip = ({ text, children, position = "bottom", showArrow = true, showColumn = false }) => {
  const positionClasses = {
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottomLeft: "top-full mt-2 left-0",
    bottomRight: "top-full mt-2 right-0",
  };

  // Support multiline tooltips using "||" as a separator
  const lines = text.split("||"); // Example: "Click to open||Drag to move"

  return (
    <div className="relative group ">
      {children}
      <div
        className={`absolute ${positionClasses[position]} px-2 py-1 bg-gray-800 text-white text-xs rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none`}
      >
        {showColumn ? (
          <div className="flex flex-col gap-1 text-xs text-gray-300 text-center">
            {lines.map((line, idx) => {
              const [bold, ...rest] = line.trim().split(" ");
              return (
                <div key={idx}>
                  <span className="font-bold text-white">{bold}</span>{" "}
                  {rest.join(" ")}
                </div>
              );
            })}
          </div>
        ) : (
          <span>
            <span className="font-bold text-white">{lines[0].split(" ")[0]}</span>{" "}
            {lines[0].split(" ").slice(1).join(" ")}
          </span>
        )}

        {/* Optional Arrow */}
        {showArrow && (
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 z-[-1]" />
        )}
      </div>
    </div>
  );
};

export default Tooltip;
