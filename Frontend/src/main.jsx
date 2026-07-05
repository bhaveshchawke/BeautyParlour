import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "./context/MessageContext.jsx";
import { UserDataProvider } from "./context/AuthContext.jsx";
import { AdminDataProvider } from "./context/AdminContext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminDataProvider>
      <UserDataProvider>
        <MessageProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </MessageProvider>
      </UserDataProvider>
    </AdminDataProvider>
  </BrowserRouter>,
);
