import { post } from "@/app/common/api";
import IAuthApiGateway from "../interfaces/auth.api.interface";

type ExchangeTokenResponse = { token: string };

export default class AuthApi implements IAuthApiGateway {
  async exchangeToken(socialToken: string): Promise<string> {
    const { token } = await post<ExchangeTokenResponse>(
      "/auth/exchange",
      {},
      socialToken
    );

    return token;
  }
}
