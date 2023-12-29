import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux"; // 使用provider注入
import store from "./store"; // 引入store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
