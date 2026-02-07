import { canFire, fire } from "../../engine";
import {
  checkoutNet,
  beginCheckout,
  paymentSucceeds,
  paymentFails,
  fulfillOrder,
  cancelOrder,
} from "./net";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

console.log("=== 3 Customers, 2 Items ===\n");
let marking = checkoutNet.initialMarking;
console.log("Initial:", marking);

await wait(1000);
console.log("\n--- Customer 1 and 2 begin checkout ---");
marking = fire(checkoutNet, marking, beginCheckout);
marking = fire(checkoutNet, marking, beginCheckout);
console.log(marking);

await wait(1000);
console.log("\nCan customer 3 check out?");
console.log(`  beginCheckout: ${canFire(checkoutNet, marking, beginCheckout)}`);

await wait(1000);
console.log("\n--- Customer 1 pays successfully ---");
marking = fire(checkoutNet, marking, paymentSucceeds);
marking = fire(checkoutNet, marking, fulfillOrder);
console.log(marking);

await wait(1000);
console.log("\n--- Customer 2's payment fails ---");
marking = fire(checkoutNet, marking, paymentFails);
marking = fire(checkoutNet, marking, cancelOrder);
console.log(marking);

await wait(1000);
console.log("\nInventory returned — can customer 3 check out now?");
console.log(`  beginCheckout: ${canFire(checkoutNet, marking, beginCheckout)}`);

await wait(1000);
console.log("\n--- Customer 3 checks out ---");
marking = fire(checkoutNet, marking, beginCheckout);
marking = fire(checkoutNet, marking, paymentSucceeds);
marking = fire(checkoutNet, marking, fulfillOrder);
console.log(marking);
