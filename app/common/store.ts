import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/presentation/store/auth.slice";
import profileReducer from "../features/profile/presentation/store/profile.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
