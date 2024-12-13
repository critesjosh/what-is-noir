"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UltraHonkBackend = exports.BarretenbergBackend = void 0;
const serialize_js_1 = require("./serialize.js");
const public_inputs_js_1 = require("./public_inputs.js");
const verifier_js_1 = require("./verifier.js");
const bb_js_1 = require("@aztec/bb.js");
const fflate_1 = require("fflate");
// This is the number of bytes in a UltraPlonk proof
// minus the public inputs.
const numBytesInProofWithoutPublicInputs = 2144;
class BarretenbergBackend {
    backend;
    constructor(acirCircuit, options = { threads: 1 }) {
        const acirBytecodeBase64 = acirCircuit.bytecode;
        const acirUncompressedBytecode = (0, serialize_js_1.acirToUint8Array)(acirBytecodeBase64);
        this.backend = new bb_js_1.UltraPlonkBackend(acirUncompressedBytecode, options);
    }
    /** @description Generates a proof */
    async generateProof(compressedWitness) {
        const proofWithPublicInputs = await this.backend.generateProof((0, fflate_1.decompressSync)(compressedWitness));
        const splitIndex = proofWithPublicInputs.length - numBytesInProofWithoutPublicInputs;
        const publicInputsConcatenated = proofWithPublicInputs.slice(0, splitIndex);
        const proof = proofWithPublicInputs.slice(splitIndex);
        const publicInputs = (0, public_inputs_js_1.deflattenFields)(publicInputsConcatenated);
        return { proof, publicInputs };
    }
    /**
     * Generates artifacts that will be passed to a circuit that will verify this proof.
     *
     * Instead of passing the proof and verification key as a byte array, we pass them
     * as fields which makes it cheaper to verify in a circuit.
     *
     * The proof that is passed here will have been created using a circuit
     * that has the #[recursive] attribute on its `main` method.
     *
     * The number of public inputs denotes how many public inputs are in the inner proof.
     *
     * @example
     * ```typescript
     * const artifacts = await backend.generateRecursiveProofArtifacts(proof, numOfPublicInputs);
     * ```
     */
    async generateRecursiveProofArtifacts(proofData, numOfPublicInputs = 0) {
        const proof = (0, verifier_js_1.reconstructProofWithPublicInputs)(proofData);
        return this.backend.generateRecursiveProofArtifacts(proof, numOfPublicInputs);
    }
    /** @description Verifies a proof */
    async verifyProof(proofData) {
        const proof = (0, verifier_js_1.reconstructProofWithPublicInputs)(proofData);
        return this.backend.verifyProof(proof);
    }
    async getVerificationKey() {
        return this.backend.getVerificationKey();
    }
    async destroy() {
        await this.backend.destroy();
    }
}
exports.BarretenbergBackend = BarretenbergBackend;
// Buffers are prepended with their size. The size takes 4 bytes.
const serializedBufferSize = 4;
const fieldByteSize = 32;
const publicInputOffset = 3;
const publicInputsOffsetBytes = publicInputOffset * fieldByteSize;
class UltraHonkBackend {
    // These type assertions are used so that we don't
    // have to initialize `api` in the constructor.
    // These are initialized asynchronously in the `init` function,
    // constructors cannot be asynchronous which is why we do this.
    backend;
    constructor(acirCircuit, options = { threads: 1 }) {
        const acirBytecodeBase64 = acirCircuit.bytecode;
        const acirUncompressedBytecode = (0, serialize_js_1.acirToUint8Array)(acirBytecodeBase64);
        this.backend = new bb_js_1.UltraHonkBackend(acirUncompressedBytecode, options);
    }
    async generateProof(compressedWitness) {
        const proofWithPublicInputs = await this.backend.generateProof((0, fflate_1.decompressSync)(compressedWitness));
        const proofAsStrings = (0, public_inputs_js_1.deflattenFields)(proofWithPublicInputs.slice(4));
        const numPublicInputs = Number(proofAsStrings[1]);
        // Account for the serialized buffer size at start
        const publicInputsOffset = publicInputsOffsetBytes + serializedBufferSize;
        // Get the part before and after the public inputs
        const proofStart = proofWithPublicInputs.slice(0, publicInputsOffset);
        const publicInputsSplitIndex = numPublicInputs * fieldByteSize;
        const proofEnd = proofWithPublicInputs.slice(publicInputsOffset + publicInputsSplitIndex);
        // Construct the proof without the public inputs
        const proof = new Uint8Array([...proofStart, ...proofEnd]);
        // Fetch the number of public inputs out of the proof string
        const publicInputsConcatenated = proofWithPublicInputs.slice(publicInputsOffset, publicInputsOffset + publicInputsSplitIndex);
        const publicInputs = (0, public_inputs_js_1.deflattenFields)(publicInputsConcatenated);
        return { proof, publicInputs };
    }
    async verifyProof(proofData) {
        const proof = (0, verifier_js_1.reconstructProofWithPublicInputsHonk)(proofData);
        return this.backend.verifyProof(proof);
    }
    async getVerificationKey() {
        return this.backend.getVerificationKey();
    }
    // TODO(https://github.com/noir-lang/noir/issues/5661): Update this to handle Honk recursive aggregation in the browser once it is ready in the backend itself
    async generateRecursiveProofArtifacts(proofData, numOfPublicInputs) {
        const proof = (0, verifier_js_1.reconstructProofWithPublicInputsHonk)(proofData);
        return this.backend.generateRecursiveProofArtifacts(proof, numOfPublicInputs);
    }
    async destroy() {
        await this.backend.destroy();
    }
}
exports.UltraHonkBackend = UltraHonkBackend;
