import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./api/configureStore.ts";
import { router } from "./routing/AppRoutes.tsx";
import { RouterProvider } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
