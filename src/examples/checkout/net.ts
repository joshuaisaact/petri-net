import type { Transition, PetriNet } from "../../engine";

type CheckoutPlace =
  | "cartReady"
  | "inventory"
  | "inventoryReserved"
  | "paymentPending"
  | "paymentComplete"
  | "paymentFailed"
  | "orderFulfilled"
  | "orderCancelled";

export const beginCheckout: Transition<CheckoutPlace> = {
  name: "beginCheckout",
  inputs: ["cartReady", "inventory"],
  outputs: ["inventoryReserved", "paymentPending"],
};

export const paymentSucceeds: Transition<CheckoutPlace> = {
  name: "paymentSucceeds",
  inputs: ["paymentPending"],
  outputs: ["paymentComplete"],
};

export const paymentFails: Transition<CheckoutPlace> = {
  name: "paymentFails",
  inputs: ["paymentPending"],
  outputs: ["paymentFailed"],
};

export const fulfillOrder: Transition<CheckoutPlace> = {
  name: "fulfillOrder",
  inputs: ["paymentComplete", "inventoryReserved"],
  outputs: ["orderFulfilled"],
};

export const cancelOrder: Transition<CheckoutPlace> = {
  name: "cancelOrder",
  inputs: ["paymentFailed", "inventoryReserved"],
  outputs: ["orderCancelled", "inventory"], // <-- inventory goes back
};

export const checkoutNet: PetriNet<CheckoutPlace> = {
  transitions: [
    beginCheckout,
    paymentSucceeds,
    paymentFails,
    fulfillOrder,
    cancelOrder,
  ],
  initialMarking: {
    cartReady: 3, // 3 customers trying to buy
    inventory: 2, // only 2 items in stock
    inventoryReserved: 0,
    paymentPending: 0,
    paymentComplete: 0,
    paymentFailed: 0,
    orderFulfilled: 0,
    orderCancelled: 0,
  },
};
