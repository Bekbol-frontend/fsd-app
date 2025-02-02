import { counterReducer, counterActions } from ".";
import { ICounterSchema } from "../types";

describe("counterSlice", () => {
  test("should first value = 2", () => {
    const state: Partial<ICounterSchema> = {
      value: 1,
    };

    expect(
      counterReducer(state as ICounterSchema, counterActions.plus())
    ).toEqual({ value: 2 });
  });

  test("should second value = 0", () => {
    const state: Partial<ICounterSchema> = {
      value: 1,
    };

    expect(
      counterReducer(state as ICounterSchema, counterActions.minus())
    ).toEqual({ value: 0 });
  });

  test("state empty default value : 1", () => {
    expect(counterReducer(undefined, counterActions.plus())).toEqual({
      value: 2,
    });
  });
});
