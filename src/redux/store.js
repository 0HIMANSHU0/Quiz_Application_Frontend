import loaderSlice from "./loaderSlice";
import usersSlice from "./usersSlice";
import questionSlice from "./questionSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    users: usersSlice,
    loader: loaderSlice,
    questions: questionSlice,
  },
});

export default store;