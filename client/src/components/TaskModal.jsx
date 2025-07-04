import React, { useState } from 'react';

const TaskModal = ({ isOpen, onClose, onSubmit, status }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [labels, setLabels] = useState('');
  const [assigneeAvatar, setAssigneeAvatar] = useState('');

  const handleSubmit = ({workspaceId}) => {
    if (!title) return;

    onSubmit({
      _id: Date.now().toString(),
      title,
      dueDate,
      labels: labels.split(',').map(l => l.trim()),
      assigneeAvatar,
      workspaceId, 
      status,
    });

    setTitle('');
    setDueDate('');
    setLabels('');
    setAssigneeAvatar('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow w-80 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Add Task to {status}</h2>

        <input
            type='text'
            placeholder='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Labels (comma separated)"
          className="w-full border p-2 rounded"
          value={labels}
          onChange={e => setLabels(e.target.value)}
        />

        <input
          type="text"
          placeholder="Avatar URL (optional)"
          className="w-full border p-2 rounded"
          value={assigneeAvatar}
          onChange={e => setAssigneeAvatar(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
