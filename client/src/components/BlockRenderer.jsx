import { Dot, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const BlockRenderer = React.memo(({ block, updateBlock }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);

  // 🧠 On mount only, set the initial text content
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerText = block.content || "";
    }
  }, []); // ⚠️ Important: only on mount!

  const handleInput = () => {
    if (contentRef.current) {
      const value = contentRef.current.innerText;
      updateBlock(value); // Update parent state
    }
  };

  const editableDiv = (placeholder) => (
    <div
      ref={contentRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      className="outline-none w-full whitespace-pre-wrap break-words text-left min-h-[1rem]"
      data-placeholder={placeholder}
    />
  );

  switch (block.type) {
    case "text":
      return <div className="my-2">{editableDiv("Type something...")}</div>;
    case "todo":
      return (
        <div className="flex items-start gap-2 my-2">
          <input type="checkbox" className="mt-1" />
          <div className="flex-1">{editableDiv("To-do")}</div>
        </div>
      );
    case "bullet":
      return (
        <div className="flex gap-2 my-2">
          <Dot className="mt-1"/>
          {editableDiv("Bullet point")}
        </div>
      );
    case "toggle":
      return (
        <div className="my-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex gap-1 items-start"
          >
            <span className="text-xs mt-1">{expanded ? "▾" : <Play/>}</span>
            <div>{editableDiv("Toggle title")}</div>
          </button>
          {expanded && (
            <div className="ml-6 mt-1 text-gray-500 text-sm">
              Toggle content...
            </div>
          )}
        </div>
      );
    case "divider":
      return <hr className="my-3 border-gray-300" />;
    case "quote":
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">
          {editableDiv("Quote...")}
        </blockquote>
      );
    case "callout":
      return (
        <div className="p-3 bg-yellow-100 border-l-4 border-yellow-400 my-2">
          {editableDiv("Callout...")}
        </div>
      );
    default:
      return null;
  }
});

export default BlockRenderer;
