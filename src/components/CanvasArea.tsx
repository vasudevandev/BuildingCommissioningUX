import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AssetComponent } from "../types/AssetComponent";
import MetadataModal from "./MetadataModal";
import { setCurrentFloor } from "../slices/currentFloorSlice";
import { Floor } from "../types/Floor";
import { Camera } from "../types/Camera";
import { Controller } from "../types/Controller";
import { Reader } from "../types/Reader";
import { Zone } from "../types/Zone";
import { useCanvas } from "../context/CanvasContext";
export default function CanvasArea() {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<Reader|Controller|Camera|Zone|null>(null);
  const GRID_SIZE = 20; // Size of the grid cells
  const snapToGrid = (value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };
  
  const { components, setComponents } = useCanvas();
  const selectedItem = useSelector((state: any) => state.selectedItem); 
  const currentFloor = useSelector((state: any) => state.currentFloor); 

  useEffect(() => {
    if (selectedItem.item) {
      setCurrentComponent(selectedItem.item);
    }
}, [selectedItem]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImageURL(reader.result as string);
      reader.readAsDataURL(file);
    }
    const newFloor: Floor = {
      controllers: [],
      zones: [],
      cameras: [],
      fireSprinklers: [],
      readers: [],
      zoomState: 0,
      name: file?.name || "New Floor",
      systemType: "",
      componentType: "",
      x: 0,
      y: 0,
      metadata: "",
    };
    dispatch(setCurrentFloor(newFloor));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const rect = containerRef.current?.getBoundingClientRect();
    let x = e.clientX - (rect?.left || 0); // Calculate x-coordinate
    let y = e.clientY - (rect?.top || 0); // Calculate y-coordinate
    x=snapToGrid(x);
    y=snapToGrid(y);
    setCurrentComponent({... selectedItem.item, x, y}); // Set the current component with its position
    setShowModal(true);
  };

  const addComponentToCurrentFloor = (component: Reader|Controller|Camera|Zone) => {
    switch (component.componentType) {
      case "Controller":
        dispatch(setCurrentFloor({ ...currentFloor, controllers: [...(currentFloor?.controllers || []), component] }));
        break;
      case "Camera":
        dispatch(setCurrentFloor({ ...currentFloor, cameras: [...(currentFloor?.cameras || []), component] }));
        break;
      case "Zone":
        dispatch(setCurrentFloor({ ...currentFloor, zones: [...(currentFloor?.zones || []), component] }));
        break;
      case "Reader":
        dispatch(setCurrentFloor({ ...currentFloor, readers: [...(currentFloor?.readers || []), component] }));
        break;
    }
  }

  const handleMetadataSave = () => {
    console.log("Saving metadata:", currentComponent);
    if (currentComponent === null) return;
    
    addComponentToCurrentFloor({ ...currentComponent }); // Add the component to the current floor
    setComponents([...components, { ...currentComponent }]);  
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
        style={{
          backgroundImage: `
            linear-gradient(to right, #2e2e2e 1px, transparent 1px),
            linear-gradient(to bottom, #2e2e2e 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      >
        {imageURL && (
          <img
            src={imageURL}
            alt="Canvas"
            className="max-w-full max-h-full object-contain"
          />
        )}

        {components.map((comp: AssetComponent, index: number) => (
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
      {currentComponent !== null && (
        <MetadataModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleMetadataSave}
          Component={currentComponent} // Pass the selected component
        />
      )}
    </div>
  );
}