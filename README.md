# petri-net

A Petri net engine and three worked examples, each one teaching a different concept.

## The examples

**Coffee** teaches vocabulary. Places, transitions, tokens, firing — the smallest net that still does something recognisable. Heat water, grind beans, pour over.

**Contracts** teach concurrency. A purchase order fans out to finance and legal (and optionally a CEO) for parallel approval, then synchronises at a single "execute" transition. The net makes the fork/join visible.

**Checkout** teaches resource contention. Three customers, two items. The net models inventory reservation, payment outcomes, and cancellation — then the analyser proves it can never oversell.

## The analyser

`reachableStates` does a breadth-first walk of every marking reachable from the initial state. The per-example analyse scripts use this to find terminal states and check invariants (stuck contracts, oversold inventory). If the net is wrong, the analyser will tell you.

## Running it

```bash
bun install
```

```bash
bun run coffee                # walk through the brewing steps
bun run coffee:analyze        # prove every path ends with coffee
bun run contract:standard     # three contracts, finance + legal approval
bun run contract:high-value   # adds CEO approval layer
bun run contract:analyze      # prove no contract gets stuck
bun run checkout              # three customers, two items, one fails
bun run checkout:analyze      # prove inventory can't oversell
```

