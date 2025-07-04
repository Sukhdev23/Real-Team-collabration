// src/components/BoardHeader.jsx
import {
  Share2,
  MessageSquare,
  Star,
  MoreVertical,
  Lock,
  Users,
  User,
  Ellipsis,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Modal from "./modal";
import AuthForm from "../pages/AuthForm";
import Tooltip from "./toolTip";
import MenuIcons from "./MenuIcons";

const BoardHeader = ({
  boardName ,
  visibility 
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [addItems, setAddItems] = useState();

  const iconMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iconMenuRef.current && !iconMenuRef.current.contains(event.target)) {
        setAddItems(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  return (
    <div className="flex items-center justify-between px-4 p-2  bg-white">
      {/* Left Side */}
      <div className="flex items-center gap-1">
        <h1 className="text-[14px] text-[rgb(51,49,45)] cursor-pointer hover:bg-gray-200 p-1 px-2 rounded-lg ">
          {boardName}
        </h1>
        <Tooltip
          showArrow={false}
          text={"Only you can access"}
          position="right"
        >
          <span
            className={`text-[14px] px-2 py-1 rounded-lg ${
              visibility === "private"
                ? "hover:bg-gray-200 cursor-pointer text-gray-400"
                : "hover:bg-blue-100 cursor-pointer text-blue-600"
            } flex items-center gap-1`}
          >
            {visibility === "private" ? (
              <Lock className="text-gray-400" size={12} />
            ) : (
              <Users size={12} />
            )}
            {visibility}
          </span>
        </Tooltip>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 text-gray-600">
        <div className=" relative group space-x-3">
          <button onClick={() => setShowLogin(true)} className="text-gray-600 ">
            <Tooltip position={"bottom"} text="Click to Login/Regiter">
              <User className="h-5 w-5" />
            </Tooltip>
          </button>
        </div>

        <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
          <AuthForm />
        </Modal>
        <button className="hover:text-black">
          <Tooltip text={"Share"}>
            <Share2 size={18} />
          </Tooltip>
        </button>
        <button className="hover:text-black">
          <Tooltip text={"View Comments"}>
            <MessageSquare size={18} />
          </Tooltip>
        </button>
        <button className="hover:text-yellow-500">
          <Tooltip text={"Add to your favorite"}>
            <Star size={18} />
          </Tooltip>
        </button>
        <div 
        ref={iconMenuRef}
        className="relative ">
          <button
            onClick={() => setAddItems((prev) => !prev)}
            className="hover:text-black"
          >
            <Tooltip
              text={"Delete , Duplicate , Move to trash"}
              showArrow={false}
              position="bottomRight"
            >
              <Ellipsis size={18} />
            </Tooltip>
          </button>
          {addItems && (
            <div className=" absolute right-4 mt-2 z-50">
              <MenuIcons
                onSelect={(type) => {
                  // handle select block type if needed
                  setAddItems(false);
                }}
            onDelete={() => console.log("delete not yet implemented")}
            onCopy={() => console.log("Copy not yet implemented")}
            onMove={() => console.log("Move not yet implemented")}
            onStar={() => console.log("Star not yet implemented")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
