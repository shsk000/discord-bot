import { AccessToken } from "../../Entities/Conoha/AccessToken";
import { FetchAccessTokenRepository } from "../../Entities/Conoha/FetchAccessTokenRepository";
import { httpClient } from "../../Foundation/httpClient";

type APIResponseIdentityTokens = {
  access: {
    token: {
      expires: string;
      id: string;
    };
  };
};

class FetchAccessTokenRepositoryImpl implements FetchAccessTokenRepository {
  public async fetch(): Promise<AccessToken> {
    const response = await httpClient<APIResponseIdentityTokens>({
      method: "POST",
      url: "https://identity.tyo2.conoha.io/v2.0/tokens",
      body: {
        auth: {
          passwordCredentials: {
            username: process.env.CONOHA_AUTH_USERNAME,
            password: process.env.CONOHA_AUTH_PASSWORD,
          },
          tenantId: process.env.CONOHA_AUTH_TENANT_ID,
        },
      },
    });

    const token = new AccessToken(
      response.access.token.id,
      response.access.token.expires
    );

    return token;
  }
}

export const createFetchAccessTokenRepositoryImpl =
  (): FetchAccessTokenRepository => {
    return new FetchAccessTokenRepositoryImpl();
  };
