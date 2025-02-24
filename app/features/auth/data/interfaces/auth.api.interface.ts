export default interface IAuthApiGateway {
  exchangeToken(socialToken: string): Promise<string>;
}
