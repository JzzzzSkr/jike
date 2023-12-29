import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./models/token";

const store = configureStore({
  reducer: {
    user: tokenReducer,
  },
});

export default store;
