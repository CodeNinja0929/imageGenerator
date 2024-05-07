import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
   {/* <GoogleOAuthProvider clientId={'411973116754-0r47rdg5s8fmpn6ldpkis8o89a8uktes.apps.googleusercontent.com'}> */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
