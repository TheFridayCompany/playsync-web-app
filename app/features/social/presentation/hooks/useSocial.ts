import { container } from "@/app/common/di/container";
import { useDispatch, useSelector } from "react-redux";
import { SYMBOLS } from "@/app/common/di/symbols";
import ISocialService from "../../domain/interfaces/social.service.interface";
import {
  setFriends,
  setLoading,
  removeFriend as removeFriendFromStore,
  addFriend,
  removePendingFriendRequest,
  setPendingRequests,
  addFriendRequest,
} from "../store/social.slice";

const useSocial = () => {
  const dispatch = useDispatch();
  const { friends, isLoading, pendingRequests } = useSelector(
    (state: any) => state.social
  );

  const socialService = container.get<ISocialService>(SYMBOLS.ISocialService);

  const fetchFriends = async () => {
    dispatch(setLoading(true));
    try {
      const response = await socialService.getFriends();
      dispatch(setFriends(response));
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchPendingRequests = async () => {
    dispatch(setLoading(true));
    try {
      const response = await socialService.getPendingRequests();
      dispatch(setPendingRequests(response));
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      await socialService.removeFriend(friendId);
      dispatch(removeFriendFromStore(friendId));
      console.log("Friend removed");
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const acceptRequest = async (requestId: string) => {
    try {
      const user = await socialService.acceptRequest(requestId);
      dispatch(addFriend(user));
      dispatch(removePendingFriendRequest(requestId));
      console.log("Request accepted");
    } catch (e) {
      console.log(e);
    }
  };

  const rejectRequest = async (requestId: string) => {
    try {
      await socialService.rejectRequest(requestId);
      dispatch(removePendingFriendRequest(requestId));
      console.log("Request rejected");
    } catch (e) {
      console.log(e);
    }
  };

  const sendRequest = async (userId: string) => {
    try {
      const friendRequest = await socialService.sendRequest(userId);
      dispatch(addFriendRequest(friendRequest));
      console.log("Request rejected");
    } catch (e) {
      console.log(e);
    }
  };

  const searchUsersByUsername = async (query: string) => {
    try {
      const users = await socialService.searchUsersByUsername(query);
      return users;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    friends,
    pendingRequests,
    isLoading,
    fetchFriends,
    fetchPendingRequests,
    removeFriend,
    sendRequest,
    acceptRequest,
    rejectRequest,
    searchUsersByUsername,
  };
};

export default useSocial;
