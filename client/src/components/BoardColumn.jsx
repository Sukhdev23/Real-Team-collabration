// src/components/BoardColumn.jsx

import TaskCard from "./TaskCard";

import { Droppable } from "@hello-pangea/dnd";

const BoardColumn = ({ status, tasks, onAddTask, onTaskClick, filters }) => {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`w-80 p-3 bg-gray-50 rounded-lg shadow-md flex flex-col transition ${
            snapshot.isDraggingOver ? "bg-blue-200" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg">{status}</h2>
            <button onClick={onAddTask} className="text-sm text-blue-600">
              + Add
            </button>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto scrollbar-thin">
            {tasks
              .filter((task) => task.status === status)
              .filter((task) => {
                const { assignee, label, dueDate } = filters;

                const matchAssignee =
                  !assignee || task.assigneeAvatar === assignee;
                const matchLabel =
                  !label || (task.labels && task.labels.includes(label));
                const matchDate = !dueDate || task.dueDate === dueDate;

                return matchAssignee && matchLabel && matchDate;
              })
              .map((task, index) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  index={index}
                  onClick={() => onTaskClick(task)}
                />
              ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default BoardColumn;
