import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { TodoProvider } from "./context/TodoContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
