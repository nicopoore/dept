import { StrictMode } from "react";
import AuthProvider from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
