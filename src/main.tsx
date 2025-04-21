import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CanvasProvider } from "./context/CanvasContext"; // <-- make sure this is here

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CanvasProvider>
      <App />
    </CanvasProvider>
  </React.StrictMode>
);
