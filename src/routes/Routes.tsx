/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="home"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </>
  )
);

export default router;
