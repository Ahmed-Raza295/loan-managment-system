import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Import App.jsx
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter here
import './index.css';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter in main.jsx */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

