import { calculateProgress } from "base/calculateProgress/calculateProgress";

test("when createdAtDate is undefined should return 0", () => {
  expect(calculateProgress(undefined, new Date())).toEqual(0);
});

test("when unlockDate is undefined should return 0", () => {
  expect(calculateProgress(new Date(), undefined)).toEqual(0);
});

test("should return a number roughly equal to expectedOutput", () => {
  const currentYear = new Date().getFullYear();
  const start = new Date(`1/1/${currentYear}`);
  const end = new Date(`12/31/${currentYear}`);

  const currentTime = new Date().getTime();

  const totalTimeInYear = end.getTime() - start.getTime();
  const currentTimeInYear = end.getTime() - currentTime;

  const expectedOutput = 1 - currentTimeInYear / totalTimeInYear;
  expect(calculateProgress(start, end)).toBeCloseTo(expectedOutput);
});
