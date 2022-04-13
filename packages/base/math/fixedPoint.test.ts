import {
  clipStringValueToDecimals,
  getPlacesAfterDecimal,
} from "@elementfi/base/math/fixedPoint";

describe("clipStringValueToDecimals", () => {
  test("when first arg is undefined should return an empty string", () => {
    expect(clipStringValueToDecimals(undefined, 0)).toEqual("");
  });

  test("when the first arg is a '.' should return '0.'", () => {
    expect(clipStringValueToDecimals(".", 0)).toEqual("0.");
  });

  test("should correctly slice off the given number in maxDecimals arg", () => {
    expect(clipStringValueToDecimals("5.55555", 2)).toEqual("5.55");
  });

  test("should account for missing integer portion and replace it with 0", () => {
    expect(clipStringValueToDecimals(".55555", 2)).toEqual("0.55");
  });
});

describe("getPlacesAfterDecimal", () => {
  test("when value stringValue is undefined should return 0", () => {
    expect(getPlacesAfterDecimal(undefined)).toEqual(0);
  });

  test("when there are no digits following the decimal should return 0", () => {
    expect(getPlacesAfterDecimal("5.")).toEqual(0);
  });
});
