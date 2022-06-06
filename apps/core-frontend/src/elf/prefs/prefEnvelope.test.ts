import { makePrefEnvelope } from "elf/prefs/prefEnvelope";

test("should have a version", () => {
  const envelope = makePrefEnvelope("my-sample-pref");
  expect(envelope).toHaveProperty("version");
});

test("should have a well-known pref property", () => {
  const envelope = makePrefEnvelope("my-sample-pref");
  expect(envelope).toHaveProperty("pref");
});
