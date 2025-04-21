import { useRef, useState } from "react";
import { useCanvas } from "../context/CanvasContext";
import { AssetComponent } from "../types/AssetComponent";
import MetadataModal from "./MetadataModal";

export default function CanvasArea() {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { components, setComponents } = useCanvas();

  const [showModal, setShowModal] = useState(false);
  const [lastIndex, setLastIndex] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImageURL(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    const systemType = e.dataTransfer.getData("systemType");

    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);

    const newComponent: AssetComponent = {
      systemType,
      componentType,
      x,
      y,
      metadata: "{}",
    };

    const updated = [...components, newComponent];
    setComponents(updated);
    setLastIndex(updated.length - 1);
    setShowModal(true);
  };

  const handleMetadataSave = (metadata: Record<string, string>) => {
    if (lastIndex === null) return;

    const updated = [...components];
    updated[lastIndex] = {
      ...updated[lastIndex],
      metadata: JSON.stringify(metadata),
    };
    setComponents(updated);
  };

  return (
    <div className="flex-1 bg-[#1E1E1E] p-2 overflow-auto">
      <div className="mb-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
        >
          Upload AutoCAD Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
      </div>

      <div
        ref={containerRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative w-full h-[80vh] border-2 border-dashed border-[#4CAF50]"
      >
        {imageURL && (
          <img
            src={imageURL}
            alt="Canvas"
            className="max-w-full max-h-full object-contain"
          />
        )}

        {components.map((comp, index) => (
          <div
            key={index}
            className="absolute px-2 py-1 bg-[#4CAF50] text-white text-xs rounded shadow"
            style={{ top: comp.y, left: comp.x }}
            title={`Metadata: ${comp.metadata}`}
          >
            {comp.componentType}
          </div>
        ))}
      </div>

      {/* Metadata Modal */}
      <MetadataModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleMetadataSave}
      />
    </div>
  );
}
