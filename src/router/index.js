import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "../components/AuthRouters";
import { Suspense, lazy } from "react";

// react lazy
const Login = lazy(() => import("@/pages/login"));
const Layout = lazy(() => import("@/pages/layout"));
const Article = lazy(() => import("@/pages/article"));
const Home = lazy(() => import("@/pages/home"));
const Publish = lazy(() => import("@/pages/publish"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthRoute>
          <Layout />
        </AuthRoute>
      </Suspense>
    ),
    children: [
      {
        path: "article",
        element: (
          <Suspense fallback={<div>Loading article...</div>}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading home...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={<div>Loading publish page...</div>}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading login...</div>}>
        <Login />
      </Suspense>
    ),
  },
]);

export default router;
