import { useState, useEffect } from "react";
//import { AssetComponent } from "../types/AssetComponent";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (metadata: Record<string, string>) => void;
};

export default function MetadataModal({ visible, onClose, onSave }: Props) {
  const [zone, setZone] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (visible) {
      setZone("");
      setLabel("");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2B2B2B] p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-white">Enter Component Metadata</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-[#1E1E1E] text-white"
          placeholder="Zone"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 rounded bg-[#1E1E1E] text-white"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ zone, label });
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
