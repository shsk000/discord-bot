import { GoogleCustomSearchRepository } from "../../Entities/Google/GoogleCustomSearchRepository";
import GoogleCustomSearchRepositoryImpl from "../../Repositories/GoogleCustomSearchRepositoryImpl";

export interface SearchImagesService {
  search(q: string): Promise<string>;
}

class SearchImagesServiceImpl implements SearchImagesService {
  private readonly repository: GoogleCustomSearchRepository;

  constructor(repository: GoogleCustomSearchRepository) {
    this.repository = repository;
  }

  async search(q: string): Promise<string> {
    const imageItems = await this.repository.search(q);

    return imageItems[0].getLink();
  }
}

export const createSearchImagesService = (): SearchImagesService => {
  const repository = new GoogleCustomSearchRepositoryImpl();
  return new SearchImagesServiceImpl(repository);
};
