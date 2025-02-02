import { IStateSchema } from "@/app/Provider/Store";
import { getCounterValue } from "./getCounterValue";

describe("getCounterValue", () => {
  test("should first", () => {
    const state: Partial<IStateSchema> = {
      counter: { value: 1 },
    };

    expect(getCounterValue(state as IStateSchema)).toBe(1);
  });

  test("should second", () => {
    const state: Partial<IStateSchema> = {
      counter: { value: 2 },
    };

    expect(getCounterValue(state as IStateSchema)).toBe(2);
  });

  test("should three", () => {
    const state: Partial<IStateSchema> = {
      counter: { value: 3 },
    };

    expect(getCounterValue(state as IStateSchema)).toBe(3);
  });
});
