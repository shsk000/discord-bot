import { ImageItem } from "./ImageItem";

export interface GoogleCustomSearchRepository {
  search(q: string): Promise<ImageItem[]>;
}
