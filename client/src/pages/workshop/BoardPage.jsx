import React, { useCallback, useState, useEffect, useRef } from "react";
import BoardColumn from "../../components/BoardColumn";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskModal from "../../components/TaskModal";
import TaskModalDetail from "../../components/TaskDetailModal";
import FilterBar from "../../components/FilterBar";
import BoardHeader from "../../components/BoardHeader";
import { fetchTasks } from "../../services/taskAPI";
import { useOutletContext, useParams } from "react-router-dom";
import AddBlockMenu from "../../components/AddBlockMenu";
import BlockRenderer from "../../components/BlockRenderer";
import { GripVertical, Plus } from "lucide-react";
import Tooltip from "../../components/toolTip";
import MenuIcons from "../../components/MenuIcons";

const BoardPage = () => {
  const [modelStatus, setModelStatus] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const { boardId } = useParams();
  const [filters, setFilters] = useState({
    assignee: "",
    label: "",
    dueDate: "",
  });
  const { boards, tasks, setTasks, workspaceId, currentBoardId } =
    useOutletContext();
    
  const [addItems, setAddItems] = useState();

  const addMenuRef = useRef(null);
  const iconMenuRef = useRef(null);

  // Outside click detection (update useEffect):
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target)) {
        setShowAddMenu(false);
      }
      if (iconMenuRef.current && !iconMenuRef.current.contains(event.target)) {
        setAddItems(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchTasks(workspaceId).then(setTasks).catch(console.error);
  }, [workspaceId]);

  const updateBlock = useCallback((id, val) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content: val } : b))
    );
  }, []);

  const filteredTasks = tasks?.filter((task) => task.boardId === boardId);
  const isEmptyBoard = filteredTasks?.length === 0;

  const DragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task._id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );
  };

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  if (!boardId) {
    return <div className="p-5">Select a board from the sidebar</div>;
  }

    const selectedBoard = boards.find((board) => board.id === currentBoardId);
  const boardName = selectedBoard?.name || "Untitled Board";
  const boardVisibility = selectedBoard?.visibility || "defalut";

  return (
    <DragDropContext onDragEnd={DragEnd}>
      <div className="bg-[rgb(255,255,255)] ">
        <BoardHeader
          boardName={boardName}
          visibility={boardVisibility}
        />

        {isEmptyBoard ? (
          <div className="min-h-screen w-full py-10 px-4 md:pl-28 relative">
            {blocks.map((block) => (
              <BlockRenderer
                key={block.id}
                block={block}
                updateBlock={(val) => updateBlock(block.id, val)}
              />
            ))}
            {/* Add button */}
            <div className="flex items-center ">
              <div
                ref={addMenuRef}
                className="relative text-gray-400 hover:text-black cursor-pointer"
              >
                <Tooltip text={"Click to add below"}>
                  <Plus
                    onClick={() => setShowAddMenu((prev) => !prev)}
                    className="w-5 h-5 text-gray-300 hover:text-gray-400"
                  />
                </Tooltip>

                {/* AddBlockMenu if needed */}
                {showAddMenu && (
                  <div className="absolute text-black mt-3 ">
                    <AddBlockMenu
                      onSelect={(type) => {
                        // Add block logic
                        setShowAddMenu(false);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* GripVertical + MenuIcons */}
              <div ref={iconMenuRef} className="relative">
                <Tooltip
                  text="Click to open menu || Drag to move"
                  showColumn={true}
                >
                  <GripVertical
                    className="w-5 h-5 text-gray-300 hover:text-gray-400 cursor-pointer"
                    onClick={() => setAddItems((prev) => !prev)}
                  />
                </Tooltip>
                {addItems && (
                  <div className=" absolute mt-3 z-50">
                    <MenuIcons
                      onSelect={(type) => {
                        // handle select block type if needed
                        setShowAddMenu(false);
                        setAddItems(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <FilterBar filters={filters} setFilters={setFilters} />

            <div className="flex gap-4 overflow-x-auto p-4">
              {["To Do", "In Progress", "Done"].map((status) => {
                const tasksForStatus = filteredTasks.filter(
                  (t) => t.status === status
                );
                return (
                  <BoardColumn
                    key={status}
                    tasks={tasksForStatus}
                    status={status}
                    onAddTask={() => setModelStatus(status)}
                    onTaskClick={setSelectedTask}
                    filters={filters}
                  />
                );
              })}
            </div>
          </div>
        )}

        <TaskModal
          isOpen={modelStatus !== null}
          status={modelStatus}
          onClose={() => setModelStatus(null)}
          onSubmit={addTask}
        />

        <TaskModalDetail
          isOpen={!!selectedTask}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      </div>
    </DragDropContext>
  );
};

export default BoardPage;
