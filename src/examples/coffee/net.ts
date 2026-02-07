import type { Transition, PetriNet } from "../../engine";

type CoffeePlace =
  | "waterCold"
  | "waterHot"
  | "beansWhole"
  | "beansGround"
  | "cupEmpty"
  | "coffeeReady";

export const heatWater: Transition<CoffeePlace> = {
  name: "heatWater",
  inputs: ["waterCold"],
  outputs: ["waterHot"],
};

export const grindBeans: Transition<CoffeePlace> = {
  name: "grindBeans",
  inputs: ["beansWhole"],
  outputs: ["beansGround"],
};

export const pourOver: Transition<CoffeePlace> = {
  name: "pourOver",
  inputs: ["waterHot", "beansGround", "cupEmpty"],
  outputs: ["coffeeReady"],
};

export const coffeeNet: PetriNet<CoffeePlace> = {
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
