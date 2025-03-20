import { User } from "@/app/features/profile/domain/entities/user.entity";

export default interface ISocialApi {
  getFriends(token: string): Promise<User[]>;
}
