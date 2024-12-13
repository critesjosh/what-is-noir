[English](#step-2-exploring-what-noir-can-do) | [Español](#nivel-2-explorar-lo-que-noir-puede-hacer)

---

# Step 2: Exploring what Noir can do 

In this example, we create a football club membership circuit. The circuit will assert that the member is over the age of 18 and that they know the passphrase. The passphrase is `0x76616d6f206d65737369` (it's a hexidecimal representation of a string).

In this example, we learn:

1. Some noir types, eg globals and structs
2. Hashing (using `pedersen`, but Noir also supports many other hashing algorithms)
3. Printing in tests

## a: Run the test to get the hash of the passphrase

In the `step2` dir, run:

```sh
nargo test --show-output
```

You will see something that looks like this in your terminal:

```sh
0x14c997b9c9300425780034a5f9794492395fd4ac2df88ec203053bf6c129c528
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
bb prove -b ./target/step2.json -w ./target/step2.gz -o ./target/proof
```

You should see a new file in `./target/proof`. It is in binary format so it might not make human sense to you, but it makes sense to `nargo`!

## e. Verify the proof

```sh
bb write_vk -b ./target/step2.json -o ./target/vk
bb verify -k ./target/vk -p ./target/proof
```

---

# Nivel 2: Explorar lo que Noir puede hacer

En este ejemplo, creamos un circuito para un club de fútbol. El circuito verificará que el miembro tiene más de 18 años y que sabe la passphrase. La passphrase es `0x76616d6f206d65737369` (es una representación hexadecimal de un string).

En este ejemplo, aprenderemos:

1. Algunos tipos de Noir, como globals y structs
2. Hashing (usando `pedersen`, pero Noir también soporta muchos otros algoritmos de hashing)
3. Imprimir durante las tests

## a: Ejecutar la test para obtener el hash de la passphrase

En el directorio `step2`, ejecuta:

```sh
nargo test --show-output
```

Verás algo como esto en tu terminal:

```sh
0x14c997b9c9300425780034a5f9794492395fd4ac2df88ec203053bf6c129c528
```

## b. Completar la file `Prover.toml`

Pon la passphrase, el hash de la passphrase y la información del miembro en la file `Prover.toml`. El que se encuentra en este directorio ya debería funcionar.

## c. Generar el witness

En el directorio `step2`, ejecuta:

```sh
nargo execute
```

## d. Generar el proof

En el directorio `step2`, ejecuta:

```sh
bb prove -b ./target/step2.json -w ./target/step2.gz -o ./target/proof
```

Deberías ver una nueva file en `./target/proof`. Está en formato binario, por lo que puede no tener sentido para los humanos, pero tiene sentido para `nargo`!

## e. Verificar el proof

```sh
bb write_vk -b ./target/step2.json -o ./target/vk
bb verify -k ./target/vk -p ./target/proof
```
