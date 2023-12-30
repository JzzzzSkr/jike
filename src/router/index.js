import Login from "@/pages/login";
import Layout from "@/pages/layout";
import * as React from "react";
import AuthRoute from "../components/AuthRouters";
import { createBrowserRouter } from "react-router-dom";
import Article from "@/pages/article";
import Home from "@/pages/home";
import Publish from "@/pages/publish";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "publish",
        element: <Publish/>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
