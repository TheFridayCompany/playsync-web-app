import { container } from "@/app/common/di/container";
import { useDispatch, useSelector } from "react-redux";
import { SYMBOLS } from "@/app/common/di/symbols";
import ISocialService from "../../domain/interfaces/social.service.interface";
import { setFriends, setLoading } from "../store/social.slice";
import { User } from "@/app/features/profile/domain/entities/user.entity";

const useSocial = () => {
  const dispatch = useDispatch();
  const { friends, isLoading } = useSelector((state: any) => state.social);

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

  return {
    friends,
    isLoading,
    fetchFriends,
  };
};

export default useSocial;
