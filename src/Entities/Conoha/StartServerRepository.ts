import { AccessToken } from "./AccessToken";

export interface StartServerRepository {
  execute(accessToken: AccessToken): Promise<boolean>;
}
