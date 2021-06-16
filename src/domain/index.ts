type WeightUnit = "lb" | "kg";

type WorkSet = {
  timestamp: string;
  exerciseName: string;

  notes?: string;

  setOrder?: number;

  weight?: number;
  weightUnit?: WeightUnit;

  reps_count?: number;

  distance?: number;
  distance_unit?: "km" | "mi";

  duration_ms?: number;
};

// [exerciseName] for? [setsDefn] at [weightDefn]
export function parseExercise(input: string): WorkSet[] {
  const { exerciseName, setsDefn, weightDefn } = parseParts(input);

  const baseWorkSet: WorkSet = {
    timestamp: new Date().toUTCString(),
    exerciseName,
  };

  let setCount = parseSets(setsDefn);

  const { weights, weightUnit } = parseWeight(weightDefn);

  const result = [];

  if (setCount == undefined) setCount = weights.length;

  for (let index = 0; index < setCount; index++) {
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

function parseParts(input: string): {
  exerciseName: string;
  setsDefn: string;
  weightDefn: string;
} {
  let exerciseName = "",
    setsDefn = "",
    weightDefn = "";

  const inputParts = input.split(" ");

  const atIndex = inputParts.indexOf("at");
  let forIndex = inputParts.indexOf("for");
  forIndex = forIndex == -1 ? 0 : forIndex;

  exerciseName = inputParts.slice(0, forIndex || atIndex).join(" ");
  if (forIndex) {
    setsDefn = inputParts.slice(forIndex + 1, atIndex).join(" ");
  }
  weightDefn = inputParts.slice(atIndex + 1).join(" ");

  return { exerciseName, setsDefn, weightDefn };
}

function parseSets(setsDefn: string): Number | null {
  const matches = /(\d+)[ ]*(sets)?/.exec(setsDefn);

  if (matches === null) return null;

  return Number(matches[1]);
}

function parseWeight(weightString: string): {
  weights: number[];
  weightUnit: WeightUnit;
} {
  var weightUnit: WeightUnit = "lb";
  const weightRegex = /([\d, ]+)(lb|kg)?/;
  const matches = weightRegex.exec(weightString);

  if (matches === null) return { weights: [0], weightUnit };

  const weights = matches[1].split(/[, ]/).map((val) => Number(val));

  weightUnit = matches[2] == "kg" ? "kg" : "lb";

  return { weights, weightUnit };
}
