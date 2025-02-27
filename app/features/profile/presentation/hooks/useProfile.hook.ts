import { container } from "@/app/common/di/container";
import { useDispatch, useSelector } from "react-redux";
import IProfileService from "../../domain/interfaces/profile.service.interface";
import { SYMBOLS } from "@/app/common/di/symbols";
import { setLoading, setProfile } from "../store/profile.slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Custom hook for managing user profile state.
 * @param {IProfileService} profileService - The profile service instance.
 */
export function useProfile() {
  const profileService = container.get<IProfileService>(
    SYMBOLS.IProfileService
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const { profile, isLoading } = useSelector((state: any) => state.profile);

  useEffect(() => {
    if (!isLoading && profile) router.replace("/home");
  }, [profile, isLoading]);

  /**
   * Checks if a user profile exists.
   * If it does, fetches and sets the profile; otherwise, redirects to onboarding.
   */
  const checkAndSetProfile = async () => {
    try {
      dispatch(setLoading(true));
      const userProfile = await profileService.getProfile();
      if (userProfile) {
        dispatch(
          setProfile({
            id: userProfile.id,
            email: userProfile.email,
            username: userProfile.username,
            name: userProfile.name,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      router.replace("/signup");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { checkAndSetProfile, profile, isLoggedIn };
}
