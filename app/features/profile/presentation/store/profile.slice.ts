import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../domain/entities/user.entity";

// Define the initial state for the auth slice
interface ProfileState {
  profile: User | null;
  isLoading: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
};

// Create the auth slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User | null>) => {
      if (!action.payload) state.profile = null;
      else state.profile = { ...state.profile, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetLoading: (state) => {
      state.isLoading = false;
    },
  },
});

// Export actions for use in components
export const { setProfile, setLoading, resetLoading } = profileSlice.actions;

// Export the reducer to be added to the store
export default profileSlice.reducer;
