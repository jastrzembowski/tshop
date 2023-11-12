import { createBrowserRouter } from "react-router-dom";

import Home from "../app/home/Home";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Home />,
  },
  { path: "/home", element: <App /> },
]);
