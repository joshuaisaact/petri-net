import { canFire, reachableStates } from "../../engine";
import { standardNet } from "./net";

const states = reachableStates(standardNet);
console.log(`Total reachable states: ${states.length}\n`);

const terminalStates = states.filter(
  (marking) =>
    !standardNet.transitions.some((t) => canFire(standardNet, marking, t)),
);

console.log(`Terminal states: ${terminalStates.length}\n`);
for (const state of terminalStates) {
  console.log(state);
}

const stuck = terminalStates.filter(
  (s) => s.awaitingFinance > 0 || s.awaitingLegal > 0,
);
console.log(`\nStuck contracts: ${stuck.length}`);
