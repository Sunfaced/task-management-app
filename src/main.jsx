import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { TaskProvider } from "./context/TaskProvider.jsx";

import './styles/global.scss';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskProvider>
      <App />
      </TaskProvider>
  </StrictMode>
);
