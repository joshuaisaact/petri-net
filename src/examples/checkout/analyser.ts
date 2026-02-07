import { canFire, reachableStates } from "../../engine";
import { checkoutNet } from "./net";

const states = reachableStates(checkoutNet);
console.log(`Total reachable states: ${states.length}\n`);

const terminalStates = states.filter(
  (marking) =>
    !checkoutNet.transitions.some((t) => canFire(checkoutNet, marking, t)),
);

console.log(`Terminal states: ${terminalStates.length}\n`);
for (const state of terminalStates) {
  console.log(state);
}

const oversold = terminalStates.filter((s) => s.orderFulfilled > 2);
console.log(`\nOversold states: ${oversold.length}`);
