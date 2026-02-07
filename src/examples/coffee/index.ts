import { canFire, fire } from "../../engine";
import { coffeeNet, heatWater, grindBeans, pourOver } from "./net";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

let marking = coffeeNet.initialMarking;
console.log("Kitchen ready:", marking);

await wait(1000);
console.log("\nWhat can we do?");
for (const t of coffeeNet.transitions) {
  console.log(`  ${t.name}: ${canFire(coffeeNet, marking, t)}`);
}

await wait(1000);
console.log("\n--- Step 1: Heat the water ---");
marking = fire(coffeeNet, marking, heatWater);
console.log(marking);

await wait(1000);
console.log("\n--- Step 2: Grind the beans ---");
marking = fire(coffeeNet, marking, grindBeans);
console.log(marking);

await wait(1000);
console.log("\n--- Step 3: Pour over ---");
marking = fire(coffeeNet, marking, pourOver);
console.log(marking);
