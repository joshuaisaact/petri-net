import type { PetriNet, Transition, Marking } from "../../engine";
import { canFire, fire } from "../../engine";

// --- Per-order Petri net (no inventory/cartReady — those are cross-instance) ---

type OrderPlace =
  | "started"
  | "inventoryReserved"
  | "paymentPending"
  | "paymentComplete"
  | "paymentFailed"
  | "orderFulfilled"
  | "orderCancelled";

const reserve: Transition<OrderPlace> = {
  name: "reserve",
  inputs: ["started"],
  outputs: ["inventoryReserved", "paymentPending"],
};

const completePayment: Transition<OrderPlace> = {
  name: "completePayment",
  inputs: ["paymentPending"],
  outputs: ["paymentComplete"],
};

const failPayment: Transition<OrderPlace> = {
  name: "failPayment",
  inputs: ["paymentPending"],
  outputs: ["paymentFailed"],
};

const fulfillOrder: Transition<OrderPlace> = {
  name: "fulfillOrder",
  inputs: ["paymentComplete", "inventoryReserved"],
  outputs: ["orderFulfilled"],
};

const cancelOrder: Transition<OrderPlace> = {
  name: "cancelOrder",
  inputs: ["paymentFailed", "inventoryReserved"],
  outputs: ["orderCancelled"],
};

const orderNet: PetriNet<OrderPlace> = {
  transitions: [reserve, completePayment, failPayment, fulfillOrder, cancelOrder],
  initialMarking: {
    started: 1,
    inventoryReserved: 0,
    paymentPending: 0,
    paymentComplete: 0,
    paymentFailed: 0,
    orderFulfilled: 0,
    orderCancelled: 0,
  },
};

// --- In-memory stores (stand-ins for a real database) ---

type OrderRecord = { marking: Marking<OrderPlace>; productId: string };
const orders: Map<string, OrderRecord> = new Map();
const products: Map<string, number> = new Map([["widget", 2]]);

// --- Application functions ---

function beginCheckout(orderId: string, productId: string): boolean {
  const stock = products.get(productId) ?? 0;
  if (stock <= 0) {
    console.log(`[${orderId}] beginCheckout REJECTED — no stock for "${productId}"`);
    return false;
  }

  // Atomic: decrement stock + create order with fired marking
  // (simulates SELECT FOR UPDATE + INSERT in a single transaction)
  products.set(productId, stock - 1);
  const marking = fire(orderNet, orderNet.initialMarking, reserve);
  orders.set(orderId, { marking, productId });

  console.log(`[${orderId}] beginCheckout — stock: ${products.get(productId)}`, marking);
  return true;
}

function handlePaymentWebhook(orderId: string, success: boolean): void {
  const order = orders.get(orderId);
  if (!order) throw new Error(`Unknown order: ${orderId}`);

  const transition = success ? completePayment : failPayment;
  order.marking = fire(orderNet, order.marking, transition);

  console.log(
    `[${orderId}] paymentWebhook(${success ? "success" : "fail"})`,
    order.marking,
  );
}

function processNextStep(orderId: string): void {
  const order = orders.get(orderId);
  if (!order) throw new Error(`Unknown order: ${orderId}`);

  if (canFire(orderNet, order.marking, fulfillOrder)) {
    order.marking = fire(orderNet, order.marking, fulfillOrder);
    console.log(`[${orderId}] processNextStep → fulfillOrder`, order.marking);
  } else if (canFire(orderNet, order.marking, cancelOrder)) {
    order.marking = fire(orderNet, order.marking, cancelOrder);
    const stock = (products.get(order.productId) ?? 0) + 1;
    products.set(order.productId, stock);
    console.log(
      `[${orderId}] processNextStep → cancelOrder — stock restored: ${stock}`,
      order.marking,
    );
  } else {
    console.log(`[${orderId}] processNextStep — no enabled transitions`);
  }
}

// --- Simulation: 3 concurrent orders, 2 stock units ---

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

console.log('=== Production Checkout: 3 orders, 2 "widget" stock ===\n');

// All three orders arrive at once
beginCheckout("order-1", "widget");
beginCheckout("order-2", "widget");
beginCheckout("order-3", "widget"); // rejected — no stock

// Payment webhooks arrive at staggered times
await delay(100);
console.log("");
handlePaymentWebhook("order-1", true);
processNextStep("order-1");

await delay(100);
console.log("");
handlePaymentWebhook("order-2", false);
processNextStep("order-2"); // cancels → stock returns

// Order 3 retries now that stock freed up
await delay(100);
console.log("");
console.log("--- order-3 retries after cancellation freed stock ---");
beginCheckout("order-3", "widget");

await delay(100);
console.log("");
handlePaymentWebhook("order-3", true);
processNextStep("order-3");

// Summary
await delay(100);
console.log("\n=== Final state ===");
console.log("Stock:", Object.fromEntries(products));
for (const [id, order] of orders) {
  console.log(`  ${id}:`, order.marking);
}
