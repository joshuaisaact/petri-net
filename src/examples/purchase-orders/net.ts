import type { Transition, PetriNet } from "../../engine";

// --- Standard contract ---

type StandardPlace =
  | "submitted"
  | "awaitingFinance"
  | "awaitingLegal"
  | "financeApproved"
  | "legalApproved"
  | "contractExecuted";

export const stdSubmit: Transition<StandardPlace> = {
  name: "submit",
  inputs: ["submitted"],
  outputs: ["awaitingFinance", "awaitingLegal"],
};
export const stdApproveFinance: Transition<StandardPlace> = {
  name: "approveFinance",
  inputs: ["awaitingFinance"],
  outputs: ["financeApproved"],
};
export const stdApproveLegal: Transition<StandardPlace> = {
  name: "approveLegal",
  inputs: ["awaitingLegal"],
  outputs: ["legalApproved"],
};
export const stdExecute: Transition<StandardPlace> = {
  name: "execute",
  inputs: ["financeApproved", "legalApproved"],
  outputs: ["contractExecuted"],
};

export const standardNet: PetriNet<StandardPlace> = {
  transitions: [stdSubmit, stdApproveFinance, stdApproveLegal, stdExecute],
  initialMarking: {
    submitted: 3,
    awaitingFinance: 0,
    awaitingLegal: 0,
    financeApproved: 0,
    legalApproved: 0,
    contractExecuted: 0,
  },
};

// --- High value contract ---

type HighValuePlace =
  | "submitted"
  | "awaitingFinance"
  | "awaitingLegal"
  | "awaitingCeo"
  | "financeApproved"
  | "legalApproved"
  | "ceoApproved"
  | "contractExecuted";

export const hvSubmit: Transition<HighValuePlace> = {
  name: "submit",
  inputs: ["submitted"],
  outputs: ["awaitingFinance", "awaitingLegal", "awaitingCeo"],
};
export const hvApproveFinance: Transition<HighValuePlace> = {
  name: "approveFinance",
  inputs: ["awaitingFinance"],
  outputs: ["financeApproved"],
};
export const hvApproveLegal: Transition<HighValuePlace> = {
  name: "approveLegal",
  inputs: ["awaitingLegal"],
  outputs: ["legalApproved"],
};
export const hvApproveCeo: Transition<HighValuePlace> = {
  name: "approveCeo",
  inputs: ["awaitingCeo"],
  outputs: ["ceoApproved"],
};
export const hvExecute: Transition<HighValuePlace> = {
  name: "execute",
  inputs: ["financeApproved", "legalApproved", "ceoApproved"],
  outputs: ["contractExecuted"],
};

export const highValueNet: PetriNet<HighValuePlace> = {
  transitions: [
    hvSubmit,
    hvApproveFinance,
    hvApproveLegal,
    hvApproveCeo,
    hvExecute,
  ],
  initialMarking: {
    submitted: 2,
    awaitingFinance: 0,
    awaitingLegal: 0,
    awaitingCeo: 0,
    financeApproved: 0,
    legalApproved: 0,
    ceoApproved: 0,
    contractExecuted: 0,
  },
};
