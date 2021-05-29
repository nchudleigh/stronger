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
function main(input: string): WorkSet[] {
  const { exerciseName, setsDefn, weightDefn } = parseInput(input);

  const baseWorkSet: WorkSet = {
    timestamp: new Date().toUTCString(),
    exerciseName,
  };

  // TODO handle undefined sets
  const setCount = parseSets(setsDefn);

  const { weights, weightUnit } = parseWeight(weightDefn);

  const result = [];

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

function parseInput(
  input: string,
): { exerciseName: string; setsDefn: string; weightDefn: string } {
  let exerciseName = "", setsDefn = "", weightDefn = "";

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

function parseSets(setsDefn: string): Number {
  const matches = /(\d+)[ ]*(sets)?/.exec(setsDefn);

  if (matches == null) return 1;

  return Number(matches[1]);
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

console.log(main("Bench Press for 5 sets at 185lb"));
console.log(main("Bench Press at 185lb"));
console.log(main("Bench Press for 3 sets at 135,185lb"));
console.log(main("Bench Press for 5 sets at 135,155,185lb"));
console.log(main("Bench Press at 135,155,185lb"));
