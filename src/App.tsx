import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import CanvasArea from "./components/CanvasArea";
import ExportPanel from "./components/ExportPanel";

function App() {

  console.log("App component rendered");
  const [isDark] = useState(true);
  return (
    <div className={isDark ? "dark" : ""}>
      <div className="flex h-screen bg-white dark:bg-[#1E1E1E] text-black dark:text-white">
        <Sidebar />
        <div className="flex flex-col flex-1">
          {/* Toggle Button */}
          

          <Topbar />
          <CanvasArea />
          <ExportPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
