// src/components/TaskCard.jsx
import { Draggable } from '@hello-pangea/dnd';

const TaskCard = ({ task, index , onClick}) => {
  // console.log(task);
  
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
        onClick={onClick}
          className={`bg-white rounded-xl p-3 shadow hover:shadow-md border transition
            ${snapshot.isDragging ? 'bg-blue-50 shadow-lg' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold text-gray-800">{task.title}</h3>
            <span className="text-xs text-gray-500">{task.dueDate}</span>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {task.labels?.map((label, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex justify-end mt-2">
            {task.assigneeAvatar && (
              <img
                src={task.assigneeAvatar}
                alt="user"
                className="w-6 h-6 rounded-full object-cover border"
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
