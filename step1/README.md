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
bb prove -b ./target/step1.json -w ./target/witness.gz -o ./target/proof`. 
```

This should create a binary file in the `target` dir called `proof`.

### What's going on here?

`bb` is barretenberg and is the proving system we are using to generate and verify proofs.

- `-b` is the compiled noir circuit
- `-w` is the witness
- `-o` is the path for the output (the proof)

## f. Verify the proof with nargo

First, create a verification key by running this in the `step1` dir:

```sh
bb write_vk -b ./target/step1.json -o ./target/vk
```

And use this key to verify the proof:

```sh
bb verify -k ./target/vk -p ./target/proof
```

Nothing will happen if the verification is successful. You will only see a message if it fails.

---

# Nivel 1: Cómo empezar con Noir

Un ejemplo simple en Noir (¡con una test!)

## a. Instalar Noir

1. Instala `noirup`

```sh
curl -L noirup.dev | bash
```

2. Utiliza noirup para instalar nargo

```sh
noirup
```

## b. Instalar barretenberg (backend para proving)

```sh
curl -L bbup.dev | bash
bbup
```

## c. Crear el file Prover.toml

En el directorio `step1`, ejecuta `nargo check` para crear un file `Prover.toml`. Debería verse así:

```toml
x = ""
y = ""
```

Usa los valores con lo que desees. Mientras sean números y sean diferentes, el proof se generará correctamente.

```toml
x = "2"
y = "3"
```

## d. Compilar y generar el witness

En el directorio `step1`, ejecuta:

```sh
nargo execute witness
```

Esto creará un directorio `target` con dos files: `step1.json` y `witness.gz`.

El witness es necesario para crear el proof.

## e. Generar el proof con nargo

En el directorio `step1`, ejecuta:

```sh
bb prove -b ./target/step1.json -w ./target/witness.gz -o ./target/proof`. 
```

Esto debería crear un file binario en el directorio `target` llamado `proof`.

### ¿Qué está pasando aquí?

`bb` es barretenberg y es el sistema de proving que estamos utilizando para generar y verificar proofs.

- `-b` es el circuito noir compilado
- `-w` es el witness
- `-o` es la ruta para el file (el proof)

## f. Verificar el proof con nargo

Primero, crea una clave de verificación ejecutando esto en el directorio `step1`:

```sh
bb write_vk -b ./target/hello_world.json -o ./target/vk
```

Y usa esta clave para verificar el proof:

```sh
bb verify -k ./target/vk -p ./target/proof
```

Si todo está bien, no ocurrirá nada. Solo verás un mensaje si falla.
