// src/pages/workshop/WorkspaceLayout.jsx
import {  Outlet, useNavigate, useOutletContext} from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const WorkspaceLayout = ( ) => {

  const {tasks ,setTasks , workspaceId } = useOutletContext()
  const navigate = useNavigate();
  // console.log(tasks ,workspaceId);
  
  const [boards, setBoards] = useState([
    { id: "board-1", name: "API Tasks" ,workspaceId:"dev" , visibility: "private" },
    { id: "board-2", name: "UI Revamp" ,workspaceId:"design" ,visibility:"private" },
    { id: "board-3", name: "Task List" ,workspaceId:"design",visibility:"private" },
    { id: "board-4", name: "Notes" ,workspaceId:"dev" , visibility:"private" },
  ]);
  const [currentBoardId, setCurrentBoardId] = useState(boards[0].id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleAddBoard = (name) => {
    const newBoard = {
      id: Date.now().toString(),
      name,
    };
    setBoards((prev) => [...prev, newBoard]);
    setCurrentBoardId(newBoard.id);
  };
  

  const handleRenameBoard = (id, newName) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === id ? { ...board, name: newName } : board
      )
    );
  };

  const handleBoardClick = (boardId) => {
  setCurrentBoardId(boardId);
  navigate(`/workshop/${workspaceId}/board/${boardId}`); // 👈 navigate to board route
};

  const handleDeleteBoard = (id) => {
    const updated = boards.filter((board) => board.id !== id);
    setBoards(updated);
    if (currentBoardId === id && updated.length > 0) {
      setCurrentBoardId(updated[0].id); // fallback to another
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar
        boards={boards}
        currentBoardId={currentBoardId}
        onSelectBoard={handleBoardClick}
        onAddBoard={handleAddBoard}
        onRenameBoard={handleRenameBoard}
        onDeleteBoard={handleDeleteBoard}
        collapsed={sidebarCollapsed}
        workspaceId={workspaceId}
        toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        tasks={tasks}
        
      />
      <div className="flex-1 overflow-auto relative z-0 w-full p-1">
        <Outlet
          context={{
            setBoards,
            boards,
            tasks,
            setTasks,
            workspaceId,
            currentBoardId,
            setCurrentBoardId,
          }}
        />
      </div>
    </div>
  );
};

export default WorkspaceLayout;
