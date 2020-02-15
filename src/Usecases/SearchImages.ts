import { ICustomSearch } from "../Services/CustomSearch";
import { inject, injectable } from "inversify";

export interface ISearchImagesUsecase {
  search(q: string): Promise<any>;
}

@injectable()
export class SearchImagesUsecase implements ISearchImagesUsecase {
  private readonly service: ICustomSearch;

  constructor(@inject("ICustomSearch") service: ICustomSearch) {
    this.service = service;
  }

  async search(q: string) {
    return await this.service.search(q);
  }
}
