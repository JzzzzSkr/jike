import Login from "@/pages/login";
import Layout from "@/pages/layout";
import * as React from "react";
import AuthRoute from "../components/AuthRouters";

import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
