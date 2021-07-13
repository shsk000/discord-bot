import { FetchAccessTokenRepository } from "../../Entities/Conoha/FetchAccessTokenRepository";
import { StopServerRepository } from "../../Entities/Conoha/StopServerRepository";
import { createFetchAccessTokenRepositoryImpl } from "../../Repositories/Conoha/FetchAccessTokenRepositoryImpl";
import { createStopServerRepositoryImpl } from "../../Repositories/Conoha/StopServerRepositoryImpl";
import { StopServerOutput } from "./StopServerOutput";

export interface StopValheimServerService {
  execute(): Promise<StopServerOutput>;
}

class StopValheimServerServiceImpl implements StopValheimServerService {
  private readonly fetchAccessTokenRepositoryImpl: FetchAccessTokenRepository;
  private readonly stopServerRepositoryImpl: StopServerRepository;

  constructor(
    fetchAccessTokenRepositoryImpl: FetchAccessTokenRepository,
    stopServerRepositoryImpl: StopServerRepository
  ) {
    this.fetchAccessTokenRepositoryImpl = fetchAccessTokenRepositoryImpl;
    this.stopServerRepositoryImpl = stopServerRepositoryImpl;
  }

  public async execute(): Promise<StopServerOutput> {
    const accessToken = await this.fetchAccessTokenRepositoryImpl.fetch();
    const result = await this.stopServerRepositoryImpl.execute(accessToken);

    return {
      result: result,
    };
  }
}

export const createStopValheimServerService = (): StopValheimServerService => {
  return new StopValheimServerServiceImpl(
    createFetchAccessTokenRepositoryImpl(),
    createStopServerRepositoryImpl()
  );
};
