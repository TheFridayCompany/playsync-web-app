import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "../../domain/entities/auth-user.entity";

// Define the initial state for the auth slice
interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to log the user in with a payload to set the user
    login: (state, action: PayloadAction<AuthUser>) => {
      console.log("login called in auth slice");
      state.isLoggedIn = true;
      state.user = action.payload; // Set the user object in the state
    },
    // Action to log the user out
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null; // Clear the user object on logout
    },
  },
});

// Export actions for use in components
export const { login, logout } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;
