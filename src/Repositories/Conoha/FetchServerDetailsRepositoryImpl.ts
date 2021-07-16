import path from "path";
import { AccessToken } from "../../Entities/Conoha/AccessToken";
import { FetchServerDetailsRepository } from "../../Entities/Conoha/FetchServerDetailsRepository";
import { ServerDetails } from "../../Entities/Conoha/ServerDetails";
import { httpClient } from "../../Foundation/httpClient";

type APIResponseServerDetails = {
  servers: {
    "OS-EXT-SRV-ATTR:instance_name": string;
    "OS-EXT-STS:vm_state": string;
    addresses: {
      [key: string]: {
        version: number;
        addr: string;
      }[];
    };
  }[];
};

class FetchServerDetailsRepositoryImpl implements FetchServerDetailsRepository {
  public async fetch(accessToken: AccessToken): Promise<ServerDetails[]> {
    const url = new URL(
      path.join("v2", process.env.CONOHA_AUTH_TENANT_ID, "servers", "detail"),
      "https://compute.tyo2.conoha.io/"
    );

    const response = await httpClient<APIResponseServerDetails>({
      url: url.toString(),
      method: "GET",
      headers: {
        "X-Auth-Token": accessToken.getId(),
      },
    });

    return response.servers.map((value) => {
      return new ServerDetails({
        instanceName: value["OS-EXT-SRV-ATTR:instance_name"],
        vmState: value["OS-EXT-STS:vm_state"],
        addresses: value["addresses"],
      });
    });
  }
}

export const createFetchServerDetailsRepositoryImpl =
  (): FetchServerDetailsRepository => {
    return new FetchServerDetailsRepositoryImpl();
  };
