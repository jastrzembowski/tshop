import { Route, Routes } from "react-router-dom";

import Home from "../app/home/Home";

export const AppRoutes = () => (
  <Routes>
    <Route path="*" element={<Home />} />
  </Routes>
);
