import { injectable } from "inversify";

import container from "../lib/inversify.config";
import { ICustomSearch } from "./CustomSearch";

import { IGoogleCustomSearch } from "../Repositories/GoogleCustomSearch";

const spy = jest.fn();
const copy = container.createChild();

@injectable()
class MockRepository {
  public async search(q: string, start: number) {
    return await new Promise(resolve => {
      spy(q, start);
      resolve({
        test: "test"
      });
    });
  }
}
copy.bind<IGoogleCustomSearch>("IGoogleCustomSearch").to(MockRepository);

test("repository実行テスト", async () => {
  const customSearch = copy.get<ICustomSearch>("ICustomSearch");
  const result = await customSearch.search("test");

  expect(spy.mock.calls[0][0]).toBe("test");
  expect(typeof spy.mock.calls[0][1]).toBe("number");
  expect(result).toEqual({ test: "test" });
});
