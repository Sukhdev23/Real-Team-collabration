// MainLayout.jsx
import { useState } from "react";
import { useParams, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { workspaceId } = useParams();
  const [tasks, setTasks] = useState([
    {
      _id: "1",
      title: "Login UI",
      status: "To Do",
      boardId: "board-1",
    },
    {
      _id: "2",
      title: "Socket Setup",
      status: "In Progress",
      boardId: "board-1",
    },
    {
      _id: "3",
      title: "Design Landing Page",
      status: "Done",
      boardId: "board-1",
    },
  ]);

  // useEffect(() => {
  //   if (workspaceId) {
  //     // fetchTasks(workspaceId).then(setTasks).catch(console.error);
  //   }
  // }, [workspaceId]);

  return (
    <div className="flex w-full">
      <Outlet context={{ tasks, setTasks, workspaceId }} />
    </div>
  );
};

export default MainLayout;
