import type { Transition, PetriNet } from "../../engine";

// --- Standard contract ---

type StandardPlace =
  | "submitted"
  | "awaitingFinance"
  | "awaitingLegal"
  | "financeApproved"
  | "financeRejected"
  | "legalApproved"
  | "legalRejected"
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
export const stdRejectFinance: Transition<StandardPlace> = {
  name: "rejectFinance",
  inputs: ["awaitingFinance"],
  outputs: ["financeRejected"],
};
export const stdApproveLegal: Transition<StandardPlace> = {
  name: "approveLegal",
  inputs: ["awaitingLegal"],
  outputs: ["legalApproved"],
};
export const stdRejectLegal: Transition<StandardPlace> = {
  name: "rejectLegal",
  inputs: ["awaitingLegal"],
  outputs: ["legalRejected"],
};
export const stdExecute: Transition<StandardPlace> = {
  name: "execute",
  inputs: ["financeApproved", "legalApproved"],
  outputs: ["contractExecuted"],
};

export const standardNet: PetriNet<StandardPlace> = {
  transitions: [
    stdSubmit,
    stdApproveFinance,
    stdRejectFinance,
    stdApproveLegal,
    stdRejectLegal,
    stdExecute,
  ],
  initialMarking: {
    submitted: 3,
    awaitingFinance: 0,
    awaitingLegal: 0,
    financeApproved: 0,
    financeRejected: 0,
    legalApproved: 0,
    legalRejected: 0,
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
  | "financeRejected"
  | "legalApproved"
  | "legalRejected"
  | "ceoApproved"
  | "ceoRejected"
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
export const hvRejectFinance: Transition<HighValuePlace> = {
  name: "rejectFinance",
  inputs: ["awaitingFinance"],
  outputs: ["financeRejected"],
};
export const hvApproveLegal: Transition<HighValuePlace> = {
  name: "approveLegal",
  inputs: ["awaitingLegal"],
  outputs: ["legalApproved"],
};
export const hvRejectLegal: Transition<HighValuePlace> = {
  name: "rejectLegal",
  inputs: ["awaitingLegal"],
  outputs: ["legalRejected"],
};
export const hvApproveCeo: Transition<HighValuePlace> = {
  name: "approveCeo",
  inputs: ["awaitingCeo"],
  outputs: ["ceoApproved"],
};
export const hvRejectCeo: Transition<HighValuePlace> = {
  name: "rejectCeo",
  inputs: ["awaitingCeo"],
  outputs: ["ceoRejected"],
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
    hvRejectFinance,
    hvApproveLegal,
    hvRejectLegal,
    hvApproveCeo,
    hvRejectCeo,
    hvExecute,
  ],
  initialMarking: {
    submitted: 2,
    awaitingFinance: 0,
    awaitingLegal: 0,
    awaitingCeo: 0,
    financeApproved: 0,
    financeRejected: 0,
    legalApproved: 0,
    legalRejected: 0,
    ceoApproved: 0,
    ceoRejected: 0,
    contractExecuted: 0,
  },
};
