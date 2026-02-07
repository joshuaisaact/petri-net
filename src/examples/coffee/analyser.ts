import { canFire, reachableStates } from "../../engine";
import { coffeeNet } from "./net";

const states = reachableStates(coffeeNet);
console.log(`Total reachable states: ${states.length}\n`);

const terminalStates = states.filter(
  (marking) =>
    !coffeeNet.transitions.some((t) => canFire(coffeeNet, marking, t)),
);

console.log(`Terminal states: ${terminalStates.length}\n`);
for (const state of terminalStates) {
  console.log(state);
}

const stuck = terminalStates.filter((s) => s.coffeeReady === 0);
console.log(`\nStuck (no coffee): ${stuck.length}`);
