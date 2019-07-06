import { google } from "googleapis";
import { injectable } from "inversify";

const customSearch = google.customsearch("v1");

declare var process: {
  env: {
    NODE_ENV: string;
    GOOGLE_API_KEY: string;
    GOOGLE_CSE_ID: string;
  };
};

export interface IGoogleCustomSearch {
  search: (q: string) => Promise<any>;
}

@injectable()
export default class GoogleCustomSearch implements IGoogleCustomSearch {
  static readonly API_KEY = process.env.GOOGLE_API_KEY;
  static readonly CSE_ID = process.env.GOOGLE_CSE_ID;

  constructor() {}

  public async search(q: string) {
    const start = Math.floor(Math.random() * 20);
    return await customSearch.cse.list({
      cx: GoogleCustomSearch.CSE_ID,
      q,
      auth: GoogleCustomSearch.API_KEY,
      searchType: "image",
      safe: "high",
      num: 1,
      start
    });
  }
}
