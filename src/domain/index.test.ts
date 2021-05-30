import { mockDate } from "../../test/mocks/date";
import { parseExercise } from "./index";

const timeFreeze = mockDate(new Date("Sat, 29 May 2021 23:36:37 GMT"));
// Exercise name
test("Name including at", () => {
  const result = parseExercise("Lat Pulldown at 185lb");
  expect(result[0].exerciseName).toEqual("Lat Pulldown");
});

test("Name including for", () => {
  const result = parseExercise("Thrust forest at 185lb");
  expect(result[0].exerciseName).toEqual("Thrust forest");
});

// Set Input
test("Single set", () => {
  const result = parseExercise("Bench Press at 185lb");
  expect(result).toMatchSnapshot();
});

test("Common 5 set", () => {
  const result = parseExercise("Bench Press for 5 sets at 185lb");
  expect(result).toMatchSnapshot();
});

// Weight Input
test("Warm up set comma separated", () => {
  const result = parseExercise("Bench Press at 135,185lb");
  expect(result).toMatchSnapshot();
});

test("Warm up set space separated", () => {
  const result = parseExercise("Bench Press at 135 185lb");
  expect(result).toMatchSnapshot();
});

test("Warm up set comma separated with greater set count", () => {
  const result = parseExercise("Bench Press for 5 sets at 135,185lb");
  expect(result).toMatchSnapshot();
});

test("Default weight unit is lbs", () => {
  const result = parseExercise("Bench Press at 185");
  expect(result[0].weightUnit).toEqual("lb");
});

test("Weight unit to kg", () => {
  const result = parseExercise("Bench Press at 185kg");
  expect(result[0].weightUnit).toEqual("kg");
});

test("Bad weight input, gives 0 values", () => {
  const result = parseExercise("Bench Press at NaN");
  expect(result[0].weightUnit).toEqual("lb");
  expect(result[0].weight).toEqual(0);
});
