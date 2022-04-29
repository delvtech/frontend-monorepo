import { hasSameKeys } from "base/hasSameKeys/hasSameKeys";

test("should equal true for objects with the same keys", () => {
  const objectA = { dog: () => true, cat: () => false };
  const objectB = { dog: () => false, cat: () => false };

  expect(hasSameKeys(objectA, objectB)).toEqual(true);
});

test("should equal true for objects with some common keys in both but differing lengths", () => {
  const objectA = { dog: () => true, hat: 5 };
  const objectB = { dog: () => false };

  expect(hasSameKeys(objectA, objectB)).toEqual(true);
});

test("should equal false for objects with differing keys, but same lengths", () => {
  const objectA = { dog: () => true, bat: () => false };
  const objectB = { dog: () => false, cat: () => false };

  expect(hasSameKeys(objectA, objectB)).toEqual(false);
});
