import { clsx } from ".";

describe("clsx", () => {
  test("clsx-1", () => {
    expect(clsx(["item"])).toBe("item");
  });

  test("clsx mods", () => {
    expect(clsx(["item"], { active: true })).toBe("item active");
  });

  test("clsx mods show false", () => {
    expect(clsx(["item"], { active: true, show: false })).toBe("item active");
  });
});
