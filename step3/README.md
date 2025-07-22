# Step 3: Optimizing and unconstrained functions

This circuit contains an example of a square root algorithm that is unconstrained, meaning that it is not proved (and can be faked). We then test the square root in a constrained function by squaring the result, which is much more efficient than calculating a square root. This allows us to optimize our circuit.

In this example, we learn:

1. Unconstrained functions
2. For loops
3. If statements
4. Gate counts

You can follow the same instructions in [step 1](../step1/README.md) and [step2](../step2/README.md) to generate and verify proofs.

## Getting gate counts

In the `step3` directory, run

```sh
nargo execute
bb gates -b ./target/step3.json
```

This will return something that looks like this:

```sh
{"functions": [
  {
        "acir_opcodes": 7,
        "circuit_size": 2797
  }
]}
```

You usually want to make these numbers as small as possible.
