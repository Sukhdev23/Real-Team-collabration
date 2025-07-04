import { Copy, SquarePen, Trash, CornerUpRightIcon, Star } from "lucide-react";



const MenuIcons = ({ onStar, setEditMode, onDelete, onCopy, onMove}) => {
  console.log("MenuIcons rendered");
  

  return (
    <div className="z-[999] border rounded-xl  p-2 w-64 shadow bg-white overflow-y-auto h-56 custom-scrollbar">
      <span className="text-xs text-gray-500 block tracking-wide pb-3">
        Basic Blocks
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStar();
        }}
        className="flex items-center gap-2 w-full hover:bg-gray-100 px-3 py-2 text-sm text-gray-700 rounded"
      >
        <Star size={16} />
        Add as a favorite
      </button>
      <button
        onClick={(e) => {
          console.log("Rename clicked");
          
          e.stopPropagation();
          setEditMode()
        }}
        className="flex items-center gap-2 w-full hover:bg-gray-100 px-3 py-2 text-sm text-gray-700 rounded"
      >
        <SquarePen size={16} />
        Rename
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
        className="flex items-center gap-2 w-full hover:bg-gray-100 px-3 py-2 text-sm text-gray-700 rounded"
      >
        <Copy size={16} />
        Copy
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMove();
        }}
        className="flex items-center gap-2 w-full hover:bg-gray-100 px-3 py-2 text-sm text-gray-700 rounded"
      >
        <CornerUpRightIcon size={16} />
        Move
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:text-red-600 rounded"
      >
        <Trash size={16} />
        Delete
      </button>
    </div>
  );
};

export default MenuIcons;
