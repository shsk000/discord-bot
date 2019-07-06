// import GoogleCustomSearch, {
//   IGoogleCustomSearch
// } from "../Services/GoogleCustomSearch";
import { IGoogleCustomSearch } from "../Services/GoogleCustomSearch";
import { inject, injectable } from "inversify";

export interface ISearchImages {
  search(q: string): Promise<any>;
}

@injectable()
export default class SearchImages implements ISearchImages {
  private readonly service: IGoogleCustomSearch;

  constructor(@inject("IGoogleCustomSearch") service: IGoogleCustomSearch) {
    this.service = service;
  }

  async search(q: string) {
    return await this.service.search(q);
  }
}
