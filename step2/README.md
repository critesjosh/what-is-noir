# Step 2: Exploring what Noir can do

In this example, we create a football club membership circuit. The circuit will assert that the member is over the age of 18 and that they know the passphrase. The passphrase is `0x76616d6f206d65737369` (it's a hexidecimal representation of a string).

In this example, we learn:

1. Some noir types, eg globals and structs
2. Hashing (using `poseidon2`, but Noir also supports many other hashing algorithms)
3. Printing in tests

## a: Run the test to get the hash of the passphrase

In the `step2` dir, run:

```sh
nargo test --show-output
```

You will see something that looks like this in your terminal:

```sh
0x0e09d5f0ce509619bc5a58bdc77989a24a3a0b98de930cb6c66cb64051bc1b93
```

## b. Fill out `Prover.toml`

Put the passphrase, passphrase hash, and membership information into the `Prover.toml`. The one in this directory should already work.

## c. Generate the witness

In the `step2` dir, run:

```sh
nargo execute
```

## d. Generate the proof

In the `step2` dir, run:

```sh
bb prove -b ./target/step2.json -w ./target/step2.gz -o ./target
```

You should see a new file in `./target/proof` and `./target/public_inputs`. It is in binary format so it might not make human sense to you, but it makes sense to `nargo`!

## e. Verify the proof

```sh
bb write_vk -b ./target/step2.json -o ./target
bb verify -k ./target/vk -p ./target/proof
```
