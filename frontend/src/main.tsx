import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque"; // font judul
import "@fontsource-variable/dm-sans"; // font isi
import "./index.css"; // (sudah ada) stylesheet global
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
