import { canFire, fire } from "../../engine";
import type { Transition, PetriNet } from "../../engine";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

type CoffeePlace =
  | "waterCold"
  | "waterHot"
  | "beansWhole"
  | "beansGround"
  | "cupEmpty"
  | "coffeeReady";

const heatWater: Transition<CoffeePlace> = {
  name: "heatWater",
  inputs: ["waterCold"],
  outputs: ["waterHot"],
};

const grindBeans: Transition<CoffeePlace> = {
  name: "grindBeans",
  inputs: ["beansWhole"],
  outputs: ["beansGround"],
};

const pourOver: Transition<CoffeePlace> = {
  name: "pourOver",
  inputs: ["waterHot", "beansGround", "cupEmpty"],
  outputs: ["coffeeReady"],
};

const coffeeNet: PetriNet<CoffeePlace> = {
  transitions: [heatWater, grindBeans, pourOver],
  initialMarking: {
    waterCold: 1,
    waterHot: 0,
    beansWhole: 1,
    beansGround: 0,
    cupEmpty: 1,
    coffeeReady: 0,
  },
};

let marking = makeCoffeeNet.initialMarking;
console.log("Kitchen ready:", marking);

await wait(1000);
console.log("\nWhat can we do?");
for (const t of makeCoffeeNet.transitions) {
  console.log(`  ${t.name}: ${canFire(makeCoffeeNet, marking, t)}`);
}

await wait(1000);
console.log("\n--- Step 1: Heat the water ---");
marking = fire(makeCoffeeNet, marking, heatWater);
console.log(marking);

await wait(1000);
console.log("\n--- Step 2: Grind the beans ---");
marking = fire(makeCoffeeNet, marking, grindBeans);
console.log(marking);

await wait(1000);
console.log("\n--- Step 3: Pour over ---");
marking = fire(makeCoffeeNet, marking, pourOver);
console.log(marking);
