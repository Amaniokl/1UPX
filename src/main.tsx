import React from "react";
import ReactDOM from "react-dom/client";
// import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Buffer } from "buffer";
import * as process from "process";

window.Buffer = Buffer;
window.process = process;

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
// if (!PUBLISHABLE_KEY) throw new Error("Missing Clerk Publishable Key");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Move BrowserRouter to the root level */}
    <BrowserRouter>
      {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
        <App />
      {/* </ClerkProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
