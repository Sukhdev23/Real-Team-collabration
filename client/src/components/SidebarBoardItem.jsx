import { useEffect, useRef, useState } from "react";
import { Plus, Ellipsis, Smile } from "lucide-react";
import MenuIcons from "./MenuIcons";
import EmojiPicker from "emoji-picker-react";

const SidebarBoardItem = ({
  board,
  isActive,
  onSelect,
  onRename,
  onDelete,
  onCreateTask,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(board.name);
  const [emoji, setEmoji] = useState(""); // selected emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [addItems, setAddItems] = useState(false);

  const iconMenuRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null); // button that toggles picker

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideMenu =
        iconMenuRef.current && !iconMenuRef.current.contains(event.target);
      const clickedOutsideEmoji =
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target);
      const clickedOutsideEmojiButton =
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target);

      if (
        clickedOutsideMenu &&
        clickedOutsideEmoji &&
        clickedOutsideEmojiButton
      ) {
        setAddItems(false);
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emojiData) => {
    setEmoji((prevInput) => prevInput + emojiData.emoji);
  };

  const handleRename = () => {
    setEditMode(false);
    setShowEmojiPicker(false);
    if (name.trim()) onRename(board.id, (emoji ? emoji + " " : "") + name);
  };
  console.log("Emoji button clicked, toggling:",!showEmojiPicker);


  return (
    <div
      className={`group flex gap-2 text-gray-500 relative justify-between items-center px-2 py-1 rounded-xl hover:bg-gray-300 cursor-pointer ${
        isActive ? "bg-gray-200 font-bold text-black" : ""
      }`}
      onClick={() => onSelect(board.id)}
    >
      {/* Left Side: Name / Input */}
      <div className="flex-1">
        {editMode ? (
          <div className="flex gap-2 items-center">
            <div ref={emojiButtonRef}>
              <button
                className="text-yellow-600"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("nothing");
                  setShowEmojiPicker((prev) => !prev);
                }}
              >
                <Smile size={34}/>
                {emoji}
              </button>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute left-full ml-2 top-0 bg-white border rounded shadow p-1 z-50"
                >
                 <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              className="px-1 py-0.5 w-full rounded border text-sm"
            />
          </div>
        ) : (
          <span>{board.name}</span>
        )}
      </div>

      {/* Right Side: Menu + Actions */}
      <div ref={iconMenuRef} className="flex gap-1 items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAddItems((prev) => !prev);
          }}
        >
          <Ellipsis size={14} />
        </button>

        {/* MenuIcons */}
        {addItems && (
          <div className="absolute top-1 z-50">
            <MenuIcons
              setEditMode={() => {
                setEditMode(true);
                setAddItems(false);
              }}
              onDelete={() => onDelete(board.id)}
              onCopy={() => console.log("Copy not yet implemented")}
              onMove={() => console.log("Move not yet implemented")}
              onStar={() => console.log("Star not yet implemented")}
            />
          </div>
        )}

        <button
          className="hover:text-green-600"
          onClick={(e) => {
            e.stopPropagation();
            onCreateTask(board.id);
          }}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default SidebarBoardItem;
