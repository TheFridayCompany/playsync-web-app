import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/app/features/profile/domain/entities/user.entity";
import FriendRequest from "../../domain/entities/friend-request.entity";

interface SocialState {
  isLoading: boolean;
  friends: User[];
  pendingRequest: FriendRequest[];
}

const initialState: SocialState = {
  isLoading: true,
  friends: [],
  pendingRequest: [],
};

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<User>) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(
        (user) => user.id !== action.payload
      );
    },
    setFriends: (state, action: PayloadAction<User[]>) => {
      state.friends = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addFriend, removeFriend, setFriends, setLoading, resetLoading } =
  socialSlice.actions;
export default socialSlice.reducer;
