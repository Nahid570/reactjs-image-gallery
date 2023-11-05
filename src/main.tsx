import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./App.tsx";
import HidePreloader from "./components/HidePreloader.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HidePreloader>
      <App />
    </HidePreloader>
  </React.StrictMode>
);
