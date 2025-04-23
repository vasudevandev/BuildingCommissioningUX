import { useDispatch } from "react-redux";
import { useCanvas } from "../context/CanvasContext";
import { setSelectedItem } from "../slices/selectedItemSlice";
import { Camera } from "../types/Camera";
import { Controller } from "../types/Controller";
import { Reader } from "../types/Reader";
import { Zone } from "../types/Zone";
import SelectedItemEnum from "../types/SelectedItemEnum";

export default function Topbar() {
  const { system, getComponentTypes } = useCanvas();
  const components = getComponentTypes();  
  const dispatch = useDispatch();

  const handleDragstart = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.setData("systemType", system);

    switch (type) {
          case "Controller":
            const newController : Controller ={
              name: `Default${type}Name`,              
              systemType: "",
              componentType: "Controller",
              x: 0,
              y: 0,
              metadata: ""
            } 
            dispatch(setSelectedItem({ item: newController, itemType: SelectedItemEnum.Controller }));
            break;
          case "Camera":
            const newCamera : Camera= {
              name: `Default${type}Name`,
              systemType: "",
              componentType: "Camera",
              x: 0,
              y: 0,
              metadata: ""
            };   
            dispatch(setSelectedItem({ item: newCamera, itemType: SelectedItemEnum.Camera }));
            break;
          case "Zone": 
            const newZone: Zone = {
              name: `Default${type}Name`,              
              systemType: "",
              componentType: "Zone",
              x: 0,
              y: 0,
              metadata: ""
            };
            dispatch(setSelectedItem({ item: newZone, itemType: SelectedItemEnum.Zone }));
            break;
          case "Reader":
            const newReader : Reader= {
              name: `Default${type}Name`,              
              systemType: "",
              componentType: "Reader",
              x: 0,
              y: 0,
              metadata: "",
              entryZone: "",
              exitZone: "",
              controller: ""
            };
            dispatch(setSelectedItem({ item: newReader, itemType: SelectedItemEnum.Reader }));
            break;
        }
  }

  return (
    <div className="bg-[#2B2B2B] p-4 flex space-x-4 border-b border-[#444]">
      {components.map((type) => (
        <div
          key={type}
          className="bg-[#3A3A3A] px-4 py-2 rounded cursor-move hover:bg-[#4CAF50]"
          draggable
          onDragStart={(e) => handleDragstart(e, type)} 
        >
          {type}
        </div>
      ))}
    </div>
  );
}
