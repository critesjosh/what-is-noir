# Step 5: Verifying on chain

## Prerequisites

- node
- hardhat

This directory is a hardhat project (sorry foundry enjoyooors). It contains an auto-generated Solidity verifier for a simple circuit and an example contract that calls the `verify` function in the verifier. It also has scripts so you can deploy and test immediately.

In this step, we will learn:

1. Automatically generating a Solidity verifier
2. How to pass the proof and public inputs to the `verify` function

## a. Generate a Solidity verifier

After compiling your circuit and creating a verification key (see [step 1](../step1/README.md)), run this:

```sh
nargo compile && bb write_vk -b ./target/step5.json -o ./target --oracle_hash keccak
bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
```

It will create a new `Verifier.sol` under the `target` directory. Move this into the `contracts` directory.

```sh
cp ./target/Verifier.sol ../../contracts/Verifier.sol
```

## b. Compile contracts

Inside `step5` run:

```sh
yarn install
npx hardhat compile
```

If you run into errors, it may be because your `hardhat.config.json` needs updating. You may have to enable `viaIR` or the `optimizer` (not both), for example:

```json
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: false,
    },
  },
}
```

## c. Run the tests

The tests use the proof generated in [step4](../step4/README.md) so if you change the circuit you will need to update this proof.

In `step5` run:

```sh
npx hardhat test
```
