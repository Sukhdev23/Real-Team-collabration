import { useEffect, useRef, useState } from "react";
import SidebarBoardItem from "./SidebarBoardItem";
import AllWorkspaces from "../pages/workshop/ProfileWorkspaces";
import {
  UserCircle,
  Bell,
  Settings,
  Trash2,
  Plus,
  ChevronsLeft,
  ChevronsRight,
  Home,
  Inbox,
  Search,
  SquarePen,
  ChevronDown,
} from "lucide-react";
import Tooltip from "./toolTip";

const Sidebar = ({
  boards,
  currentBoardId,
  onSelectBoard,
  onAddBoard,
  onRenameBoard,
  onDeleteBoard,
  collapsed,
  toggleCollapse,
  workspaceId,
  tasks,
}) => {
  const [newBoardName, setNewBoardName] = useState("");
  const [workshopOpen, setWorkshopOpen] = useState(true);
  const [ProfileMenu , setProfilemenu] = useState(null)

  const ProfileMenuRef = useRef(null)

    // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ProfileMenuRef.current && !ProfileMenuRef.current.contains(event.target)) {
        setProfilemenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddBoard = () => {
    if (newBoardName.trim()) {
      onAddBoard({ name: newBoardName.trim(), workspaceId });
      setNewBoardName("");
    }
  };

  const handleCreateTask = (boardId) => {
    alert(`Create task in board: ${boardId}`);
    // Yahan modal ya redirect logic aayega
  };
  return (
    <div
      className={`relative h-screen bg-[rgb(247,247,247)] border-r top-0 transition-all duration-300 
  ${collapsed ? "w-16" : "w-64"} flex flex-col`}
    >
      {/* Collapse Button */}
      <button
        onClick={toggleCollapse}
        className="absolute top-3 right-[12px] z-10 hover:bg-gray-200  rounded"
      >
        {collapsed ? (
          <Tooltip text={"Open sidebar"}>
            <ChevronsRight className="w-6 h-6" />
          </Tooltip>
        ) : (
          <Tooltip text={"Close sidebar"}>
            <ChevronsLeft className="w-6 h-6" />
          </Tooltip>
        )}
      </button>

      {/* Scrollable Main Content */}
      {!collapsed && (
        <div
        className=" flex-1 px-4 py-1">
          {/* User Info */}
          <div
            className="flex items-center gap-3 mb-2 rounded-lg hover:bg-gray-200 p-2 cursor-pointer group max-w-[200px]"
             onClick={()=>setProfilemenu((prev)=> !prev)}
          >
            <img
              src="https://i.pravatar.cc/100?img=5"
              alt="avatar"
              className="w-5 h-5 rounded-lg"
            />

            {/* Email - truncate only on hover */}
            <div className="flex-1 overflow-hidden">
              <p
                className="text-sm font-medium text-[rgb(51,49,45)] transition-all duration-200 
        whitespace-nowrap 
        group-hover:truncate group-hover:overflow-hidden group-hover:text-ellipsis
      "
              >
                sukhdev@dev.com
              </p>
            </div>

            {/* Chevron icon - only visible on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            {/* Pen icon with tooltip — separate group for hover */}
            <div className="relative group/icon">
              <Tooltip text="Create a new Page" showArrow={false}>
                <SquarePen className="text-[rgb(54,52,48)] h-5 w-5" />
              </Tooltip>
            </div>
          </div>

          {/* Home + Inbox + search*/}
          <div className="flex flex-col">
            <Tooltip text={"Search here"} position="right" showArrow={false}>
              <div className="relative flex items-center justify-start gap-2 group cursor-pointer hover:bg-gray-200 rounded-lg p-1">
                <Search className=" text-[rgb(143,142,141)] h-5 w-5" />
                <span className="text-[rgb(87,88,110)]">Search</span>
              </div>
            </Tooltip>

            <Tooltip
              text={"Veiw recent page and more.."}
              position="right"
              showArrow={false}
            >
              <div className="relative group flex items-center justify-start gap-2 cursor-pointer hover:bg-gray-200 rounded-lg p-1">
                <Home className=" text-[rgb(143,142,141)] h-5 w-5" />
                <span className="text-[rgb(87,88,110)]">Home</span>
              </div>
            </Tooltip>

            <Tooltip
              text={"Veiw recent updates and notifications"}
              position="right"
              showArrow={false}
            >
              <div className="relative group mb-4 flex items-center justify-start gap-2 cursor-pointer hover:bg-gray-200 rounded-lg p-1">
                <Inbox className=" text-[rgb(143,142,141)] h-5 w-5" />
                <span className="text-[rgb(87,88,110)]">Inbox</span>
              </div>
            </Tooltip>
          </div>

          {/* Private/Workshop Section */}
          <div className="mb-4">
            <div
              className="flex items-center justify-between cursor-pointer mb-1"
              onClick={() => setWorkshopOpen(!workshopOpen)}
            >
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Private
              </h2>
              <span className="text-gray-500 text-xs">
                {workshopOpen ? "▾" : "▸"}
              </span>
            </div>

            {workshopOpen && (
              <div className="flex flex-col gap-1 mb-2">
                {boards
                  .filter((board) => board.workspaceId === workspaceId)
                  .map((board) => {
                    const boardTasks = tasks.filter(
                      (task) => task.boardId === board.id
                    );
                    return (
                      <SidebarBoardItem
                        key={board.id}
                        board={board}
                        tasks={boardTasks} // ✅ pass filtered tasks
                        isActive={board.id === currentBoardId}
                        onSelect={onSelectBoard}
                        onRename={onRenameBoard}
                        onDelete={onDeleteBoard}
                        workspaceId={workspaceId}
                        onCreateTask={handleCreateTask}
                      />
                    );
                  })}
              </div>
            )}
          </div>

          {/* Add New Board */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="New board name"
              className="flex-1 px-2 py-1 border text-sm rounded"
            />
            <button onClick={handleAddBoard}>
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Footer - Always Visible */}
      {!collapsed && (
        <div className="flex flex-col gap-3 p-4 text-sm text-gray-700 border-t">
          <button className="flex items-center gap-2 hover:text-blue-500">
            <UserCircle className="w-5 h-5" /> Members
          </button>
          <button className="flex items-center gap-2 hover:text-blue-500">
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button className="flex items-center gap-2 hover:text-blue-500">
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
            <Trash2 className="w-5 h-5" /> Trash
          </button>
        </div>
      )}

      {/* Icons Only Footer for Collapsed */}
      {collapsed && (
        <div className="flex flex-col items-center gap-4 mt-12">
          <UserCircle className="w-5 h-5" />
          <Bell className="w-5 h-5" />
          <Settings className="w-5 h-5" />
        </div>
      )}

      {ProfileMenu &&(

      <div
      ref={ProfileMenuRef}
      className="absolute left-4 top-10 w-80 bg-white border shadow-lg rounded-xl z-50 p-2">

        <AllWorkspaces  onSelectWorkspace={() => setProfilemenu(false)} />
      </div>
      )}
    </div>
  );
};

export default Sidebar;
