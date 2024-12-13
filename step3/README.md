[English](#step-3-optimizing-and-unconstrained-functions) | [Español](#nivel-1-cómo-empezar-con-noir)

---

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
bb gates -b ./target/step3.json 
```

This will return something that looks like this:

```sh
{"functions": [
  {
        "acir_opcodes": 7,
        "circuit_size": 2797,
        "gates_per_opcode": [2781,0,4,2,3,1,1]
  }
]}
```

You usually want to make these numbers as small as possible. 

# Nivel 3: Optimización y funciones "unconstrained"

Este circuito contiene un ejemplo de un algoritmo de raíz cuadrada que no está restringido, lo que significa que no se demuestra (y puede ser falsificado). Confirmamos la raíz cuadrada en una función constrained al elevar al cuadrado el resultado, que es mucho más eficiente que calcular una raíz cuadrada. Nos permite optimizar nuestro circuito.

En este ejemplo, aprendemos:

1. Funciones unconstrained
2. For loops
3. If statements
4. Conteo de gates

Puedes seguir las mismas instrucciones en [paso 1](../step1/README.md) y [paso 2](../step2/README.md) para generar y verificar los proofs.

## Coneos de gates

En el `step3` directorio, ejecuta

```sh
bb gates -b ./target/step3.json 
```

devolverá algo que se ve así:

```sh
{"functions": [
  {
        "acir_opcodes": 7,
        "circuit_size": 2797,
        "gates_per_opcode": [2781,0,4,2,3,1,1]
  }
]}
```
Normalmente, quieres hacer que estos números sean lo más pequeños posible.