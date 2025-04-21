import { useCanvas } from "../context/CanvasContext";

export default function Topbar() {
  const { system, getComponentTypes } = useCanvas();
  const components = getComponentTypes();

  return (
    <div className="bg-[#2B2B2B] p-4 flex space-x-4 border-b border-[#444]">
      {components.map((type) => (
        <div
          key={type}
          className="bg-[#3A3A3A] px-4 py-2 rounded cursor-move hover:bg-[#4CAF50]"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("componentType", type);
            e.dataTransfer.setData("systemType", system);
          }}
        >
          {type}
        </div>
      ))}
    </div>
  );
}
