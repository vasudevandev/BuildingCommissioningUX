import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AssetComponent } from "../types/AssetComponent";

export type SystemType = "Access" | "Fire" | "DVM" | "HVAC" | "Security";

const SYSTEM_COMPONENTS: Record<SystemType, string[]> = {
  Access: ["Controller", "Zone", "Reader", "Input", "Output", "Floor", "ElevatorReader"],
  Fire: ["Panel", "Detector", "Alarm", "Relay"],
  DVM: ["Camera", "Recorder", "Display"],
  HVAC: ["Controller", "Thermostat", "Damper"],
  Security: ["Controller", "Lock", "Buzzer"],
};

type ContextType = {
  system: SystemType;
  setSystem: (s: SystemType) => void;
  components: AssetComponent[];
  setComponents: (c: AssetComponent[]) => void;
  getComponentTypes: () => string[];
};

const CanvasContext = createContext<ContextType | null>(null);

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [system, setSystem] = useState<SystemType>("Access");
  const [components, setComponents] = useState<AssetComponent[]>([]);
  console.log(components,"my component")
  const getComponentTypes = () => SYSTEM_COMPONENTS[system] || [];
  useEffect(() => {
    console.log("Current components in context:", components); // Debugging log
  }, [components]);
  return (
    <CanvasContext.Provider value={{ system, setSystem, components, setComponents, getComponentTypes }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext)!;
