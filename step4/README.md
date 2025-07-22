# Step 4: A simple NoirJS example

A basic example function of proving and verifying using NoirJS. Find noirJS docs [here](https://noir-lang.org/docs/tutorials/noirjs_app).

## Prerequisites

- node version 20 or higher

## a. Compile the circuit

In `step4/circuits/main` run:

```sh
nargo compile
```

This will create a `target/step4.json` file.

## b. Ensure it is correctly imported into index.js

At the top of `index.js` import the file like this:

```sh
import main from './circuits/main/target/step4.json' assert { type: "json" };
```

## c. npm install

In `step4` run:

```sh
npm install
```

## d. Run the JS

In `step4` run:

```sh
npm run start
```

## Notes

- If you change the circuit, you will need to update the inputs accordingly.
- The proof and public inputs will be saved in a file called `proof.json`. You can paste these into other verification methods, such as Solidity that is covered in [step5](../step5/README.md).
