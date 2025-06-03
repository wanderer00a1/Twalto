import { StrictMode } from "react.js";
import { createRoot } from "react-dom/client.js";
import "./index.css";
import App from "./App.tsx.js";
import { BrowserRouter } from "react-router-dom.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
