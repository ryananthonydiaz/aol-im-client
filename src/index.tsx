import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import UserNamePrompt from "./UserNamePrompt";
import { UserProvider } from "./hooks/createUserStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <UserNamePrompt />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
