import { AccessToken } from "./AccessToken";

export interface StopServerRepository {
  execute(accessToken: AccessToken): Promise<boolean>;
}
