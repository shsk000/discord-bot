import { google } from "googleapis";
import { GoogleCustomSearchRepository } from "../Entities/Google/GoogleCustomSearchRepository";
import { ImageItem } from "../Entities/Google/ImageItem";

const customSearch = google.customsearch("v1");

class GoogleCustomSearchRepositoryImpl implements GoogleCustomSearchRepository {
  static readonly API_KEY = process.env.GOOGLE_API_KEY;
  static readonly CSE_ID = process.env.GOOGLE_CSE_ID;

  public async search(q: string): Promise<ImageItem[]> {
    const start = Math.floor(Math.random() * 20);

    const result = await customSearch.cse.list({
      cx: GoogleCustomSearchRepositoryImpl.CSE_ID,
      q,
      auth: GoogleCustomSearchRepositoryImpl.API_KEY,
      searchType: "image",
      safe: "high",
      num: 1,
      start,
    });

    const imageItems = result.data.items?.map((value) => {
      return new ImageItem(value.link || "");
    });

    if (!imageItems) {
      return [];
    }

    return imageItems;
  }
}

export default GoogleCustomSearchRepositoryImpl;
