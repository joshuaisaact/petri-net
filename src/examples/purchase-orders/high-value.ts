import { canFire, fire } from "../../engine";
import {
  highValueNet,
  hvSubmit,
  hvApproveFinance,
  hvApproveLegal,
  hvApproveCeo,
  hvExecute,
} from "./net";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

console.log("=== 2 High Value Contracts ===\n");
let marking = highValueNet.initialMarking;
console.log("Initial:", marking);

await wait(1000);
console.log("\n--- Submit both ---");
marking = fire(highValueNet, marking, hvSubmit);
marking = fire(highValueNet, marking, hvSubmit);
console.log(marking);

await wait(1000);
console.log("\n--- Finance approves both ---");
marking = fire(highValueNet, marking, hvApproveFinance);
marking = fire(highValueNet, marking, hvApproveFinance);
console.log(marking);

await wait(1000);
console.log("\n--- Legal approves first only ---");
marking = fire(highValueNet, marking, hvApproveLegal);
console.log(marking);

await wait(1000);
console.log("\n--- CEO approves first ---");
marking = fire(highValueNet, marking, hvApproveCeo);
console.log(marking);

await wait(1000);
console.log("\nWhat can fire?");
for (const t of highValueNet.transitions) {
  console.log(`  ${t.name}: ${canFire(highValueNet, marking, t)}`);
}

await wait(1000);
console.log("\n--- Execute first contract ---");
marking = fire(highValueNet, marking, hvExecute);
console.log(marking);

await wait(1000);
console.log("\nWhat can fire?");
for (const t of highValueNet.transitions) {
  console.log(`  ${t.name}: ${canFire(highValueNet, marking, t)}`);
}

await wait(1000);
console.log("\n--- Legal approves second ---");
marking = fire(highValueNet, marking, hvApproveLegal);
console.log(marking);

await wait(1000);
console.log("\n--- CEO approves second ---");
marking = fire(highValueNet, marking, hvApproveCeo);
console.log(marking);

await wait(1000);
console.log("\n--- Execute second contract ---");
marking = fire(highValueNet, marking, hvExecute);
console.log(marking);
