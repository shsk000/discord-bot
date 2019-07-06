import { injectable, inject } from "inversify";
import { IGoogleCustomSearch } from "../Repositories/GoogleCustomSearch";

export interface ICustomSearch {
  search: (q: string) => Promise<any>;
}

@injectable()
export default class CustomSearch implements ICustomSearch {
  readonly repository: IGoogleCustomSearch;

  constructor(@inject("IGoogleCustomSearch") repository: IGoogleCustomSearch) {
    this.repository = repository;
  }

  public async search(q: string) {
    const start = Math.floor(Math.random() * 20);
    return await this.repository.search(q, start);
  }
}
