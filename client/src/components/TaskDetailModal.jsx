import React, { useState } from 'react';

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  const [description, setDescription] = useState(task?.description || '');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(task?.comments || []);

  const handleAddComment = () => {
    if (!comment.trim()) return;
    setComments(prev => [...prev, { id: Date.now(), text: comment }]);
    setComment('');
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">✖</button>
        </div>

        <div>
          <label className="text-sm font-medium">Due Date:</label>
          <p className="text-gray-600">{task.dueDate}</p>
        </div>

        {task.labels && (
          <div className="flex gap-2 flex-wrap">
            {task.labels.map((label, i) => (
              <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{label}</span>
            ))}
          </div>
        )}

        {task.assigneeAvatar && (
          <div className="flex items-center gap-2">
            <img src={task.assigneeAvatar} alt="User" className="w-6 h-6 rounded-full border" />
            <span className="text-sm text-gray-700">Assigned User</span>
          </div>
        )}

        <div>
          <label className="text-sm font-medium">Description:</label>
          <textarea
            className="w-full border rounded p-2 mt-1"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            placeholder="Add description here..."
          />
        </div>

        <div>
          <label className="text-sm font-medium">Comments:</label>
          <div className="mt-2 space-y-2">
            {comments.map(c => (
              <div key={c.id} className="bg-gray-100 p-2 rounded">
                <p className="text-sm">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button onClick={handleAddComment} className="bg-blue-600 text-white px-3 rounded">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
