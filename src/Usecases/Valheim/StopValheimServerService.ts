import { createFetchAccessTokenRepositoryImpl } from "../../Repositories/Conoha/FetchAccessTokenRepositoryImpl";
import { StopServerOutput } from "./StopServerOutput";

interface StopValheimServerService {
  execute(): Promise<StopServerOutput>;
}

class StopValheimServerServiceImpl implements StopValheimServerService {
  public async execute(): Promise<StopServerOutput> {
    const impl = createFetchAccessTokenRepositoryImpl();
    await impl.fetch();

    return new Promise((resolve) => {
      resolve({
        result: true,
      });
    });
  }
}

export const createStopValheimServerService = (): StopValheimServerService => {
  return new StopValheimServerServiceImpl();
};
