import { Controller } from "../types/Controller";
import { Camera } from "../types/Camera";
import { Reader } from "../types/Reader";
import { Zone } from "../types/Zone";
import { useEffect, useState } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (metadata: Record<string, string>) => void;
  Component: Controller | Camera | Zone | Reader;
};

export default function MetadataModal({ visible, onClose, onSave, Component }: Props) {
  const [displayValues, setDisplayValues] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize display values when the component is mounted or updated
    if (Component) {
      setDisplayValues(extractProperties(Component));
    }
  }, [Component]);

  // Extract all properties from the component
  const extractProperties = (Component: Controller | Camera | Zone | Reader) => {
    const properties: Record<string, string> = {};

    for (const key in Component) {
      if (Object.prototype.hasOwnProperty.call(Component, key)) {
        properties[key] = String((Component as any)[key]);
      }
    }

    return properties;
  };

  const setProperty = (property: string, value: string): void => {
    console.log("Setting property:", property, "to value:", value);
    if (property === "x" || property === "y") {
      value = String(parseInt(value, 10)); // Ensure x and y are integers
    }
    setDisplayValues((prev) => ({
      ...prev,
      [property]: value,
    })); // Update the display values
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2B2B2B] p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-white">Enter Component Metadata</h2>

        {Object.keys(displayValues).map((property) => (
          <input
            key={property} // Add a unique key for each input
            className="w-full mb-3 p-2 rounded bg-[#1E1E1E] text-white"
            placeholder={property}
            value={displayValues[property] || ""}
            onChange={(e) => setProperty(property, e.target.value)}
          />
        ))}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Saving metadata:", displayValues); // Debugging log
              onSave(displayValues); // Save all updated properties
              onClose();
            }}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}