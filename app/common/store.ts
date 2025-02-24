import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/presentation/store/auth.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
