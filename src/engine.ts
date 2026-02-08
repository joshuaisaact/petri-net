/**
 * A minimal Petri net engine.
 *
 * Places are strings. Tokens are counts. Transitions move tokens
 * from input places to output places. That's the whole thing.
 */

export type Marking<Place extends string> = Record<Place, number>;

export type Transition<Place extends string> = {
  name: string;
  inputs: Place[];
  outputs: Place[];
};

export type PetriNet<Place extends string> = {
  transitions: Transition<Place>[];
  initialMarking: Marking<Place>;
};

export function canFire<Place extends string>(
  petriNet: PetriNet<Place>,
  marking: Marking<Place>,
  transition: Transition<Place>,
): boolean {
  return transition.inputs.every((input) => marking[input] > 0);
}

export function fire<Place extends string>(
  petriNet: PetriNet<Place>,
  marking: Marking<Place>,
  transition: Transition<Place>,
): Marking<Place> {
  if (!canFire(petriNet, marking, transition)) {
    throw new Error(`Cannot fire transition: ${transition.name}`);
  }

  const newMarking = { ...marking };
  for (const input of transition.inputs) newMarking[input] -= 1;
  for (const output of transition.outputs) newMarking[output] += 1;
  return newMarking;
}

export function reachableStates<Place extends string>(
  net: PetriNet<Place>,
): Marking<Place>[] {
  const seen: string[] = [];
  const queue: Marking<Place>[] = [net.initialMarking];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const key = JSON.stringify(current);
    if (seen.includes(key)) continue;
    seen.push(key);

    for (const t of net.transitions) {
      if (canFire(net, current, t)) {
        queue.push(fire(net, current, t));
      }
    }
  }

  return seen.map((s) => JSON.parse(s));
}

export function toDot<Place extends string>(
  net: PetriNet<Place>,
  marking?: Marking<Place>,
): string {
  const m = marking ?? net.initialMarking;
  const places = Object.keys(m) as Place[];

  let dot = "digraph {\n  rankdir=LR;\n\n";

  for (const place of places) {
    const tokens = m[place];
    dot += `  "${place}" [shape=circle label="${place}\\n${tokens}"];\n`;
  }

  dot += "\n";

  for (const t of net.transitions) {
    dot += `  "${t.name}" [shape=box style=filled fillcolor=lightgrey];\n`;
  }

  dot += "\n";

  for (const t of net.transitions) {
    for (const input of t.inputs) {
      dot += `  "${input}" -> "${t.name}";\n`;
    }
    for (const output of t.outputs) {
      dot += `  "${t.name}" -> "${output}";\n`;
    }
  }

  dot += "}\n";
  return dot;
}
