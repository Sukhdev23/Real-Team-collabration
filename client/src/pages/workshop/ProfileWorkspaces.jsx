import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

const AllWorkspaces = ({onSelectWorkspace}) => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState([
    { id: "dev", name: "Development" },
    { id: "design", name: "Design Team" },
  ]);

  const [newName, setNewName] = useState("");

  const handleAdd = () => {
    if (newName.trim()) {
      const id = newName.trim().toLowerCase().replace(/\s+/g, "-");
      setWorkspaces((prev) => [...prev, { id, name: newName.trim() }]);
      setNewName("");
    }
  };

  const handleDelete = (id) => {
    setWorkspaces((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="px-1 py-1 w-full max-w-md">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-5">
        <img
          src="https://i.pravatar.cc/100?img=5"
          alt="avatar"
          className="w-9 h-9 rounded-lg"
        />
        <div>
          <p className="text-sm font-semibold">Sukhdev Raghav</p>
          <p className="text-xs text-gray-500">sukhdev@dev.com</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mb-4">
        <button className="text-xs border px-3 py-1 rounded-full hover:bg-gray-100 transition">
          Appearance
        </button>
        <button className="text-xs border px-3 py-1 rounded-full hover:bg-gray-100 transition">
          Invite Members
        </button>
      </div>

      <div className="border-b mb-4" />

      {/* Workspace Section */}
      <h2 className="text-lg font-bold mb-3">🧑‍💻 My Workspaces</h2>

      <div className="space-y-2 mb-5 max-h-60 overflow-y-auto pr-1">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="flex items-center justify-between bg-gray-50 border p-3 rounded hover:bg-gray-100 cursor-pointer transition"
            onClick={() => navigate(`/workshop/${workspace.id}`)}
          >
            <span 
            onClick={onSelectWorkspace}
            className="text-sm font-medium">{workspace.name}</span>
            <button
              className="text-black hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(workspace.id);
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Workspace */}
      <div className="flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New workspace name"
          className="flex-1 px-3 py-2 text-sm border rounded focus:outline-none focus:ring"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
        >
          <Plus size={16} />
          <span className="text-sm">Add</span>
        </button>
      </div>
    </div>
  );
};

export default AllWorkspaces;
