import { FetchAccessTokenRepository } from "../../Entities/Conoha/FetchAccessTokenRepository";
import { FetchServerDetailsRepository } from "../../Entities/Conoha/FetchServerDetailsRepository";
import { createFetchAccessTokenRepositoryImpl } from "../../Repositories/Conoha/FetchAccessTokenRepositoryImpl";
import { createFetchServerDetailsRepositoryImpl } from "../../Repositories/Conoha/FetchServerDetailsRepositoryImpl";
import { FetchServerDetailsOutput } from "./FetchServerDetailsOutput";

export interface FetchServerDetailsService {
  execute(): Promise<FetchServerDetailsOutput>;
}

class FetchServerDetailsServiceImpl implements FetchServerDetailsService {
  private readonly fetchAccessTokenRepositoryImpl: FetchAccessTokenRepository;
  private readonly fetchServerDetailsRepositoryImpl: FetchServerDetailsRepository;

  constructor(
    fetchAccessTokenRepositoryImpl: FetchAccessTokenRepository,
    fetchServerDetailsRepositoryImpl: FetchServerDetailsRepository
  ) {
    this.fetchAccessTokenRepositoryImpl = fetchAccessTokenRepositoryImpl;
    this.fetchServerDetailsRepositoryImpl = fetchServerDetailsRepositoryImpl;
  }

  public async execute(): Promise<FetchServerDetailsOutput> {
    const accessToken = await this.fetchAccessTokenRepositoryImpl.fetch();
    const result = await this.fetchServerDetailsRepositoryImpl.fetch(
      accessToken
    );

    const output: FetchServerDetailsOutput["server"] = result.map((value) => {
      return {
        instanceName: value.getInstanceName(),
        vmState: value.getVmState(),
        addresse: value.getIPv4Address(),
      };
    });

    return {
      server: output,
    };
  }
}

export const createFetchServerDetailsService =
  (): FetchServerDetailsService => {
    return new FetchServerDetailsServiceImpl(
      createFetchAccessTokenRepositoryImpl(),
      createFetchServerDetailsRepositoryImpl()
    );
  };
