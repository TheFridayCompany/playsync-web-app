import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the auth slice
interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to log the user in
    login: (state, _) => {
      state.isLoggedIn = true;
    },
    // Action to log the user out
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Export actions for use in components
export const { login, logout } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;
