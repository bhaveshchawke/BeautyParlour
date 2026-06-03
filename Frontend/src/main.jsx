import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "./context/MessageContext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MessageProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </MessageProvider>
  </BrowserRouter>,
);
