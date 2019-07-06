import { ICustomSearch } from "../Services/CustomSearch";
import { inject, injectable } from "inversify";

export interface ISearchImages {
  search(q: string): Promise<any>;
}

@injectable()
export default class SearchImages implements ISearchImages {
  private readonly service: ICustomSearch;

  constructor(@inject("ICustomSearch") service: ICustomSearch) {
    this.service = service;
  }

  async search(q: string) {
    return await this.service.search(q);
  }
}
