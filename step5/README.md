[English](#step-5-verifying-on-chain) | [Spanish](#nivel-5-verificación-onchain)

---

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
bb contract
```

It will create a new `contract.sol` under the `target` directory. Move this into the `contracts` directory.

## b. Compile contracts

Inside `step5` run:

```sh
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
---

# Nivel 5: Verificación onchain

## Prerrequisitos

- node 
- hardhat

Este directorio es un proyecto de hardhat (lo siento, amantes de foundry). Contiene un verificador de Solidity auto-generado para un circuito simple y un contrato de ejemplo que llama a la función `verify` en el verificador. También tiene scripts para que puedas desplegar y probar de inmediato.

En este paso, aprenderemos:

1. Generar automáticamente un verificador de Solidity
2. Cómo pasar la prueba y las entradas públicas a la función `verify`

## a. Generar un verificador de Solidity

Después de compilar tu circuit y creer una clave de verificación (mira [paso 1](../step1/README.md)), ejecuta esto:

```sh
bb contract
```

Creará un nuevo `contract.sol` en el directorio `target`. Mueve esta file al directorio `contracts`.

## b. Compilar contratos

Dentro de `step5`, ejecuta:

```sh
npx hardhat compile
```

Si encuentras errores, puede ser porque tu `hardhat.config.json` necesita cambias. Es posible que tengas que habilitar `viaIR` o el `optimizer` (no ambos), por ejemplo:

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

## c. Ejecutar las tests

Las tests usan el proof generada en paso 4, así que si cambias el circuito, es necesario cambiar esta test.

En `step5`, ejecuta:

```sh
npx hardhat test
```