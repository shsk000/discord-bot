import { AccessToken } from "./AccessToken";
import { ServerDetails } from "./ServerDetails";

export interface FetchServerDetailsRepository {
  fetch(accessToken: AccessToken): Promise<ServerDetails[]>;
}
