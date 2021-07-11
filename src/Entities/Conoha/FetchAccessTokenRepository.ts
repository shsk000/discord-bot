import { AccessToken } from "./AccessToken";

export interface FetchAccessTokenRepository {
  fetch(): Promise<AccessToken>;
}
