import Login from "@/pages/login";
import Layout from "@/pages/layout";
import * as React from "react";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
