import GoogleCustomSearch, {
  IGoogleCustomSearch,
} from "../Repositories/GoogleCustomSearch";

export interface ISearchImagesUsecase {
  search(q: string): Promise<any>;
}

class SearchImagesUsecase implements ISearchImagesUsecase {
  private readonly repository: IGoogleCustomSearch;

  constructor(repository: IGoogleCustomSearch) {
    this.repository = repository;
  }

  async search(q: string) {
    return await this.repository.search(q);
  }
}

export const createSearchImagesUsecase = (): ISearchImagesUsecase => {
  const repository = new GoogleCustomSearch();
  return new SearchImagesUsecase(repository);
};
