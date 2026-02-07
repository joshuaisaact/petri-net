/**
 * A minimal Petri net engine.
 *
 * Places are strings. Tokens are counts. Transitions move tokens
 * from input places to output places. That's the whole thing.
 */

export type Marking<P extends string> = Record<P, number>;

export type Transition<P extends string> = {
  name: string;
  inputs: P[];
  outputs: P[];
};

export type PetriNet<P extends string> = {
  transitions: Transition<P>[];
  initialMarking: Marking<P>;
};

export function canFire<P extends string>(
  petriNet: PetriNet<P>,
  marking: Marking<P>,
  transition: Transition<P>,
): boolean {
  return transition.inputs.every((input) => marking[input] > 0);
}

export function fire<P extends string>(
  petriNet: PetriNet<P>,
  marking: Marking<P>,
  transition: Transition<P>,
): Marking<P> {
  if (!canFire(petriNet, marking, transition)) {
    throw new Error(`Cannot fire transition: ${transition.name}`);
  }

  const newMarking = { ...marking };
  transition.inputs.forEach((input) => (newMarking[input] -= 1));
  transition.outputs.forEach((output) => (newMarking[output] += 1));
  return newMarking;
}
