import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListCollapse,
  ListOrdered,
  ListTodo,
  Minus,
  Quote,
  Text,
  Type,
} from "lucide-react";

// src/components/AddBlockMenu.jsx
const blockTypes = [
  {
    icons: <Type className=" text-gray-800 h-5 w-5" />,
    label: "Text",
    type: "text",
  },
  {
    icons: <Heading1 className=" text-gray-800 h-5 w-5" />,
    label: "Heading 1",
    type: "Heading 1",
  },
  {
    icons: <Heading2 className=" text-gray-800 h-5 w-5" />,
    label: "Heading 2",
    type: "Heading 2",
  },
  {
    icons: <Heading3 className=" text-gray-800 h-5 w-5" />,
    label: "Heading 3",
    type: "Heading 3",
  },
  {
    icons: <ListTodo className=" text-gray-800 h-5 w-5" />,
    label: "To-do List",
    type: "todo",
  },
  {
    icons: <List className=" text-gray-800 h-5 w-5" />,
    label: "Bullet List",
    type: "bullet",
  },
  {
    icons: <ListCollapse className=" text-gray-800 h-5 w-5" />,
    label: "Toggle List",
    type: "toggle",
  },
  {
    icons: <ListOrdered className=" text-gray-800 h-5 w-5" />,
    label: "Number List",
    type: "number",
  },
  {
    icons: <Minus className=" text-gray-800 h-5 w-5" />,
    label: "Divider",
    type: "divider",
  },
  {
    icons: <Quote className=" text-gray-800 h-5 w-5" />,
    label: "Quote",
    type: "quote",
  },
];

const AddBlockMenu = ({ onSelect }) => {
  return (
    <div className="border rounded-xl  p-2 w-72 shadow bg-white overflow-y-auto h-56 custom-scrollbar">
      <span className="text-xs text-gray-500 block tracking-wide pb-3">Basic Blocks</span>

      {blockTypes.map((block) => (
        <div
          key={block.type}
          onClick={() => onSelect(block.type)}
          className=" relative g px-3 py-2 text-sm hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <div className="flex gap-2 items-start ">
            {block.icons}
            {block.label}
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default AddBlockMenu;
