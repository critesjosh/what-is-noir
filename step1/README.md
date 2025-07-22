[English](#step-1-getting-started-with-noir) | [Español](#nivel-1-cómo-empezar-con-noir)

---

# Step 1: Getting started with Noir

A simple hello world example in Noir (with a test!)

## a. Install Noir

1. Install noirup

```sh
curl -L https://raw.githubusercontent.com/noir-lang/noirup/refs/heads/main/install | bash
```

2. Use noirup to install nargo

```sh
noirup
```

## b. Install barretenberg (proving backend)

```sh
curl -L https://raw.githubusercontent.com/AztecProtocol/aztec-packages/refs/heads/master/barretenberg/bbup/install | bash
bbup
```

## c. Create the Prover.toml

In the `step1` directory run `nargo check` to create a `Prover.toml`. It will look like this:

```toml
x = ""
y = ""
```

Then fill these values out with whatever you want. As long as they are numbers and are different, the proof will be successfully generated.

```toml
x = "2"
y = "3"
```

## d. Compile and generate the witness

In the `step1` directory run:

```sh
nargo execute witness
```

This will create a `target` dir with two files: `step1.json` and `witness.gz`.

The witness is needed to create the proof.

## e. Generate the proof with nargo

In the `step1` directory run:

```sh
bb prove -b ./target/step1.json -w ./target/witness.gz -o ./target/
```

This should create binary files in the `target` dir called `proof` and `public_inputs`.

### What's going on here?

`bb` is barretenberg and is the proving system we are using to generate and verify proofs.

- `-b` is the compiled noir circuit
- `-w` is the witness
- `-o` is the path for the output (the proof)

## f. Verify the proof with nargo

First, create a verification key by running this in the `step1` dir:

```sh
bb write_vk -b ./target/step1.json -o ./target
```

And use this key to verify the proof:

```sh
bb verify -k ./target/vk -p ./target/proof
```
