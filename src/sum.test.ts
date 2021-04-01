import sum from './sum';

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds -2 and 9 to equal 7", () => {
  expect(sum(-2,9)).toBe(7);
});