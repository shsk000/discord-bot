import path from "path";
import { AccessToken } from "../../Entities/Conoha/AccessToken";
import { StopServerRepository } from "../../Entities/Conoha/StopServerRepository";
import { httpClient } from "../../Foundation/httpClient";

type APIResponseStopServer = {
  status: number;
};

class StopServerRepositoryImpl implements StopServerRepository {
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
        "os-stop": null,
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

export const createStopServerRepositoryImpl = (): StopServerRepository => {
  return new StopServerRepositoryImpl();
};
