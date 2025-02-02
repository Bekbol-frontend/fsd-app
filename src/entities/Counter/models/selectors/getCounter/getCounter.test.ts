import { IStateSchema } from "@/app/Provider/Store";
import { getCounter } from "./getCounter";

describe("getCounter", () => {
  test("should first", () => {
    const state: Partial<IStateSchema> = {
      counter: { value: 77 },
    };

    expect(getCounter(state as IStateSchema)).toEqual({ value: 77 });
  });
});
