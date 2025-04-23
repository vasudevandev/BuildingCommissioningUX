import { useCanvas } from "../context/CanvasContext";

export default function ExportPanel() {
  const { components } = useCanvas();
  console.log("Components in ExportPanel:", components); // Debugging log

  const saveToBackend = async () => {
    try {
      console.log("Sending payload to backend:", components);

      const response = await fetch("http://localhost:8080/api/AssetComponents/SaveComponents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(components),
      });

      if (response.ok) {
        alert("✅ Components saved to backend");
      } else {
        alert("❌ Failed to save: " + response.statusText);
      }
    } catch (error) {
      alert("❌ Save failed: " + error);
    }
  };

  const exportToJson = () => {
    console.log("Components to export:", components);
    const json = JSON.stringify(components, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "asset-model.json";
    link.click();
  };

  return (
    <div className="bg-[#2B2B2B] p-2 flex justify-end space-x-2 border-t border-[#3A3A3A]">
      <button
        onClick={exportToJson}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        Export JSON
      </button>
      <button
        onClick={saveToBackend}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
      >
        Save to DB
      </button>
    </div>
  );
}
