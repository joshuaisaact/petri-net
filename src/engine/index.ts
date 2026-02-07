type Marking<P extends string> = Record<P, number>;

type Transition<P extends string> = {
  name: string;
  inputs: P[];
  outputs: P[];
};

type PetriNet<P extends string> = {
  transitions: Transition<P>[];
  initialMarking: Marking<P>;
};

function canFire<P extends string>(
  petriNet: PetriNet<P>,
  marking: Marking<P>,
  transition: Transition<P>,
): boolean {
  return transition.inputs.every((input) => marking[input] > 0);
}

function fire<P extends string>(
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
