import { useCanvas } from "../context/CanvasContext";
import type { SystemType } from "../context/CanvasContext"; // make sure to export SystemType

export default function Sidebar() {
  const { system, setSystem } = useCanvas();
  const systems: SystemType[] = ["Access", "Fire", "DVM", "HVAC", "Security"];

  return (
    <div className="w-48 bg-[#2B2B2B] p-4">
      <h2 className="text-lg font-semibold mb-4">Systems</h2>
      <ul className="space-y-2">
        {systems.map((s) => (
          <li
            key={s}
            className={`cursor-pointer px-2 py-1 rounded ${
              system === s ? "bg-cyan-600 text-white" : "hover:text-cyan-400"
            }`}
            onClick={() => setSystem(s)}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
