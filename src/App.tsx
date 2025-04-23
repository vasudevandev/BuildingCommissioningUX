import { useState } from "react";
import { Provider } from "react-redux"; // Import Provider
import store from "./store"; // Import the Redux store
import Sidebar from "./components/Sidebar";
import CanvasArea from "./components/CanvasArea";
import ExportPanel from "./components/ExportPanel";
import Topbar from "./components/Topbar";
import AnalyticsPanel from "./components/AnalyticsPanel";
function App() {
  console.log("App component rendered");
  const [isDark] = useState(true);

  return (
    <Provider store={store}> {/* Wrap the app with Provider */}
      <div className={isDark ? "dark" : ""}>
        <div className="flex h-screen bg-white dark:bg-[#1E1E1E] text-black dark:text-white">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Topbar />
            <div className ="flex flex-1 overflow-hidden">
              <CanvasArea />
              <AnalyticsPanel />
            </div>
              <ExportPanel />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;