import { get } from "@/app/common/api";
import { injectable } from "inversify";
import ISocialApi from "../interfaces/social.api.interface";
import { User } from "@/app/features/profile/domain/entities/user.entity";

@injectable()
export default class SocialApi implements ISocialApi {
  async getFriends(token: string): Promise<User[]> {
    const response = await get<User[]>("/friendship", token);
    console.log(JSON.stringify(response));
    return response;
  }
}
