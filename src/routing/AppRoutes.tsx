import { Route, Routes } from "react-router-dom";

import Home from "../app/home/Home";
import App from "../App";

export const AppRoutes = () => (
  <Routes>
    <Route path="/home" element={<App />} />
    <Route path="*" element={<Home />} />
  </Routes>
);
