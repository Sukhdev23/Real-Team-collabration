import React from 'react';

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex gap-4 items-center bg-white shadow p-4 rounded-md mb-4 mx-4 mt-2 sticky top-0 z-40">
      <select name="assignee" value={filters.assignee} onChange={handleChange} className="border px-2 py-1 rounded">
        <option value="">All Assignees</option>
        <option value="https://i.pravatar.cc/150?img=3">User 1</option>
        <option value="https://i.pravatar.cc/150?img=5">User 2</option>
      </select>

      <select name="label" value={filters.label} onChange={handleChange} className="border px-2 py-1 rounded">
        <option value="">All Labels</option>
        <option value="bug">Bug</option>
        <option value="urgent">Urgent</option>
        <option value="feature">Feature</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={filters.dueDate}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
      />

      <button
        onClick={() => setFilters({ assignee: '', label: '', dueDate: '' })}
        className="ml-auto text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
