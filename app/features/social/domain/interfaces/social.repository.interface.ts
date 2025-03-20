import { User } from "@/app/features/profile/domain/entities/user.entity";

export default interface ISocialRepository {
  getFriends(): Promise<User[]>;
}
