import { canFire, fire } from "../../engine";
import {
  standardNet,
  stdSubmit,
  stdApproveFinance,
  stdApproveLegal,
  stdExecute,
} from "./net";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
console.log("=== 3 Standard Contracts ===\n");
let marking = standardNet.initialMarking;
console.log("Initial:", marking);

await wait(1000);
console.log("\n--- Submit all three ---");
marking = fire(standardNet, marking, stdSubmit);
marking = fire(standardNet, marking, stdSubmit);
marking = fire(standardNet, marking, stdSubmit);
console.log(marking);

await wait(1000);
console.log("\n--- Finance approves first contract ---");
marking = fire(standardNet, marking, stdApproveFinance);
console.log(marking);

await wait(1000);
console.log("\n--- Legal approves first contract ---");
marking = fire(standardNet, marking, stdApproveLegal);
console.log(marking);

await wait(1000);
console.log("\nWhat can fire?");
for (const t of standardNet.transitions) {
  console.log(`  ${t.name}: ${canFire(standardNet, marking, t)}`);
}

await wait(1000);
console.log("\n--- Execute first contract ---");
marking = fire(standardNet, marking, stdExecute);
console.log(marking);

await wait(1000);
console.log("\n--- Finance approves second and third ---");
marking = fire(standardNet, marking, stdApproveFinance);
marking = fire(standardNet, marking, stdApproveFinance);
console.log(marking);

await wait(1000);
console.log("\n--- Legal approves second and third ---");
marking = fire(standardNet, marking, stdApproveLegal);
marking = fire(standardNet, marking, stdApproveLegal);
console.log(marking);

await wait(1000);
console.log("\n--- Execute remaining ---");
marking = fire(standardNet, marking, stdExecute);
marking = fire(standardNet, marking, stdExecute);
console.log(marking);
