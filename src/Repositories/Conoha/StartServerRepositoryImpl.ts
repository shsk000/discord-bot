import path from "path";
import { AccessToken } from "../../Entities/Conoha/AccessToken";
import { StartServerRepository } from "../../Entities/Conoha/StartServerRepository";
import { httpClient } from "../../Foundation/httpClient";

type APIResponseStopServer = {
  status: number;
};

class StartServerRepositoryImpl implements StartServerRepository {
  async execute(accessToken: AccessToken): Promise<boolean> {
    const url = new URL(
      path.join(
        "v2",
        process.env.CONOHA_AUTH_TENANT_ID,
        "servers",
        process.env.CONOHA_SERVER_ID,
        "action"
      ),
      "https://compute.tyo2.conoha.io/"
    );

    const response = await httpClient<APIResponseStopServer>({
      url: url.toString(),
      method: "POST",
      body: {
        "os-start": null,
      },
      headers: {
        "X-Auth-Token": accessToken.getId(),
      },
    });

    if (response.status === 202) {
      return true;
    }

    return false;
  }
}

export const createStartServerRepositoryImpl = (): StartServerRepository => {
  return new StartServerRepositoryImpl();
};
