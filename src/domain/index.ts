type WeightUnit = "lb" | "kg";

type WorkSet = {
  timestamp: String;
  exerciseName: String;

  notes?: String;

  setOrder?: Number;

  weight?: Number;
  weight_unit?: "kg" | "lb";

  reps_count?: Number;

  distance?: Number;
  distance_unit?: "km" | "mi";

  duration_ms?: Number;
};

function interpretWorkSetInput(input: String): WorkSet[] {
  console.log(input);

  const [exerciseName, workSets] = input.split(" for ");

  const baseWorkSet: WorkSet = {
    timestamp: new Date().toUTCString(),
    exerciseName,
  };

  const [setCountStr, weightStr] = workSets.split(" at ");
  const setCountNum = Number(setCountStr.split(" sets")[0]);

  const { weights, weightUnit } = parseWeight(weightStr);

  const result = [];

  for (let index = 0; index < setCountNum; index++) {
    const weight = weights[index] || weights[weights.length - 1];
    result.push({
      ...baseWorkSet,
      setOrder: index + 1,
      weight,
      weightUnit,
    });
  }

  return result;
}

function parseWeight(
  weightString: string,
): { weights: number[]; weightUnit: WeightUnit } {
  var weightUnit: WeightUnit = "lb";
  const weightRegex = /([\d, ]+)(lb|kg)/;
  const matches = weightRegex.exec(weightString);

  if (matches == null) return { weights: [0], weightUnit };

  const weights = matches[1].split(/[, ]/).map((val) => Number(val));

  weightUnit = matches[2] == "kg" ? "kg" : "lb";

  return { weights, weightUnit };
}

console.log(interpretWorkSetInput("Bench Press for 5 sets at 185lb"));
console.log(interpretWorkSetInput("Bench Press for 3 sets at 135,185lb"));
console.log(interpretWorkSetInput("Bench Press for 5 sets at 135,155,185lb"));
