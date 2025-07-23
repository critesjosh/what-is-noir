import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;
import { UltraHonkBackend } from '@aztec/bb.js';
import { Noir } from '@noir-lang/noir_js';
import fs from "fs";
import path from "path";

const main = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'circuits/step5/target/step5.json'), 'utf8'));

describe("verified counter", function () {
  it("updates the counter if the proof is valid", async function () {

    const HonkVerifier = await ethers.getContractFactory("HonkVerifier");
    const verifier = await HonkVerifier.deploy();
    const verifierAddress = await verifier.getAddress();
    const SimpleCounter = await ethers.getContractFactory("SimpleCounter");
    const counter = await SimpleCounter.deploy(verifierAddress);
    const initialCounter = await counter.counter();

    const noir = new Noir(main);
    const backend = new UltraHonkBackend(main.bytecode);

    const input = { x: 1, y: 2 };
    const { witness } = await noir.execute(input);

    console.log("Generating proof...");
    const proofData = await backend.generateProof(witness, { keccak: true });

    // Test the verifier directly first
    console.log("Testing verifier directly...");
    const verifierResult = await verifier.verify(proofData.proof, proofData.publicInputs);
    console.log("Direct verification result:", verifierResult);

    const tx = await counter.updateCounterIfVerified(
      proofData.proof,
      proofData.publicInputs
    );
    await tx.wait();

    const finalCounter = await counter.counter();
    const counterDifference = finalCounter - initialCounter;
    expect(counterDifference).to.equal(1n);
    console.log("Test completed successfully");
  });
});
