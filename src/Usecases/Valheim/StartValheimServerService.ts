import { FetchAccessTokenRepository } from "../../Entities/Conoha/FetchAccessTokenRepository";
import { StartServerRepository } from "../../Entities/Conoha/StartServerRepository";
import { createFetchAccessTokenRepositoryImpl } from "../../Repositories/Conoha/FetchAccessTokenRepositoryImpl";
import { createStartServerRepositoryImpl } from "../../Repositories/Conoha/StartServerRepositoryImpl";
import { StartServerOutput } from "./StartServerOutput";

export interface StartValheimServerService {
  execute(): Promise<StartServerOutput>;
}

class StartValheimServerServiceImpl implements StartValheimServerService {
  private readonly fetchAccessTokenRepositoryImpl: FetchAccessTokenRepository;
  private readonly startServerRepositoryImpl: StartServerRepository;

  constructor(
    fetchAccessTokenRepositoryImpl: FetchAccessTokenRepository,
    startServerRepositoryImpl: StartServerRepository
  ) {
    this.fetchAccessTokenRepositoryImpl = fetchAccessTokenRepositoryImpl;
    this.startServerRepositoryImpl = startServerRepositoryImpl;
  }

  public async execute(): Promise<StartServerOutput> {
    const accessToken = await this.fetchAccessTokenRepositoryImpl.fetch();
    const result = await this.startServerRepositoryImpl.execute(accessToken);

    return {
      result: result,
    };
  }
}

export const createStartValheimServerService =
  (): StartValheimServerService => {
    return new StartValheimServerServiceImpl(
      createFetchAccessTokenRepositoryImpl(),
      createStartServerRepositoryImpl()
    );
  };
