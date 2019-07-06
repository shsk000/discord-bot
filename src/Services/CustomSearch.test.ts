import container from "../lib/inversify.config";
import { ICustomSearch } from "./CustomSearch";

test("test", async () => {
  const customSearch = container.get<ICustomSearch>("ICustomSearch");
  const result = await customSearch.search("test");
  console.log(result);
});
