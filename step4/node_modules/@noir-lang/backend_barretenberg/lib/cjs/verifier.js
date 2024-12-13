"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reconstructProofWithPublicInputsHonk = exports.UltraHonkVerifier = exports.reconstructProofWithPublicInputs = exports.BarretenbergVerifier = void 0;
const public_inputs_js_1 = require("./public_inputs.js");
const bb_js_1 = require("@aztec/bb.js");
class BarretenbergVerifier {
    verifier;
    constructor(options = { threads: 1 }) {
        this.verifier = new bb_js_1.BarretenbergVerifier(options);
    }
    /** @description Verifies a proof */
    async verifyProof(proofData, verificationKey) {
        const proof = reconstructProofWithPublicInputs(proofData);
        return this.verifier.verifyUltraplonkProof(proof, verificationKey);
    }
    async destroy() {
        await this.verifier.destroy();
    }
}
exports.BarretenbergVerifier = BarretenbergVerifier;
function reconstructProofWithPublicInputs(proofData) {
    // Flatten publicInputs
    const publicInputsConcatenated = (0, public_inputs_js_1.flattenFieldsAsArray)(proofData.publicInputs);
    // Concatenate publicInputs and proof
    const proofWithPublicInputs = Uint8Array.from([...publicInputsConcatenated, ...proofData.proof]);
    return proofWithPublicInputs;
}
exports.reconstructProofWithPublicInputs = reconstructProofWithPublicInputs;
class UltraHonkVerifier {
    verifier;
    constructor(options = { threads: 1 }) {
        this.verifier = new bb_js_1.BarretenbergVerifier(options);
    }
    /** @description Verifies a proof */
    async verifyProof(proofData, verificationKey) {
        const proof = reconstructProofWithPublicInputsHonk(proofData);
        return this.verifier.verifyUltrahonkProof(proof, verificationKey);
    }
    async destroy() {
        await this.verifier.destroy();
    }
}
exports.UltraHonkVerifier = UltraHonkVerifier;
const serializedBufferSize = 4;
const fieldByteSize = 32;
const publicInputOffset = 3;
const publicInputsOffsetBytes = publicInputOffset * fieldByteSize;
function reconstructProofWithPublicInputsHonk(proofData) {
    // Flatten publicInputs
    const publicInputsConcatenated = (0, public_inputs_js_1.flattenFieldsAsArray)(proofData.publicInputs);
    const proofStart = proofData.proof.slice(0, publicInputsOffsetBytes + serializedBufferSize);
    const proofEnd = proofData.proof.slice(publicInputsOffsetBytes + serializedBufferSize);
    // Concatenate publicInputs and proof
    const proofWithPublicInputs = Uint8Array.from([...proofStart, ...publicInputsConcatenated, ...proofEnd]);
    return proofWithPublicInputs;
}
exports.reconstructProofWithPublicInputsHonk = reconstructProofWithPublicInputsHonk;
