import { useCanvas } from "../context/CanvasContext";
import { useEffect, useState } from "react";

export default function AnalyticsPanel() {
  const { components } = useCanvas();
  const [isOpen, setIsOpen] = useState(false);
  const [activityLog, setActivityLog] = useState<string[]>([]);

  const togglePanel = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (components.length === 0) return;
    const last = components[components.length - 1];
    const timestamp = new Date().toLocaleTimeString();
    const log = `🟢 [${timestamp}] Added ${last.componentType} in ${last.systemType} at (${last.x}, ${last.y})`;
    setActivityLog((prev) => [log, ...prev.slice(0, 19)]);
  }, [components]);

  const getSummary = () => {
    const summary: Record<string, number> = {};
    components.forEach((comp) => {
      const key = `${comp.systemType}:${comp.componentType}`;
      summary[key] = (summary[key] || 0) + 1;
    });
    return summary;
  };

  const countInvalid = components.filter((c) => {
    try {
      const m = JSON.parse(c.metadata);
      return !m.label || !m.zone;
    } catch {
      return true;
    }
  }).length;

  const exportReady = countInvalid === 0 && components.length > 0;
  const summary = getSummary();

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className={`fixed top-1/2 right-0 transform -translate-y-1/2 z-50 
                    bg-blue-700 text-white px-2 py-1 rounded-l 
                    shadow hover:bg-blue-800 transition-all`}
      >
        {isOpen ? "➖ Hide" : "📊 Show"}
      </button>

      {/* Analytics Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#1A1A1A] text-white p-4 border-l border-[#333] z-40 
                    transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-lg font-semibold mb-4">📊 Analytics</h2>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Component Summary</h3>
          <ul className="text-sm list-disc list-inside text-gray-300">
            {Object.entries(summary).map(([key, count]) => (
              <li key={key}>
                {key}: {count}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Validation Status</h3>
          <p className={countInvalid > 0 ? "text-yellow-400" : "text-green-400"}>
            {countInvalid > 0
              ? `${countInvalid} component(s) missing metadata`
              : "All components valid ✅"}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Export Readiness</h3>
          <p className={exportReady ? "text-green-400" : "text-red-400"}>
            {exportReady ? "✅ Ready to export" : "❌ Not ready (fix metadata)"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Recent Activity</h3>
          <ul className="text-sm text-gray-400 list-disc list-inside max-h-40 overflow-y-auto">
            {activityLog.map((entry, idx) => (
              <li key={idx}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
