import { Backend, CompiledCircuit, ProofData, VerifierBackend } from '@noir-lang/types';
import { BackendOptions, UltraPlonkBackend, UltraHonkBackend as UltraHonkBackendInternal } from '@aztec/bb.js';
export declare class BarretenbergBackend implements Backend, VerifierBackend {
    protected backend: UltraPlonkBackend;
    constructor(acirCircuit: CompiledCircuit, options?: BackendOptions);
    /** @description Generates a proof */
    generateProof(compressedWitness: Uint8Array): Promise<ProofData>;
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
    generateRecursiveProofArtifacts(proofData: ProofData, numOfPublicInputs?: number): Promise<{
        proofAsFields: string[];
        vkAsFields: string[];
        vkHash: string;
    }>;
    /** @description Verifies a proof */
    verifyProof(proofData: ProofData): Promise<boolean>;
    getVerificationKey(): Promise<Uint8Array>;
    destroy(): Promise<void>;
}
export declare class UltraHonkBackend implements Backend, VerifierBackend {
    protected backend: UltraHonkBackendInternal;
    constructor(acirCircuit: CompiledCircuit, options?: BackendOptions);
    generateProof(compressedWitness: Uint8Array): Promise<ProofData>;
    verifyProof(proofData: ProofData): Promise<boolean>;
    getVerificationKey(): Promise<Uint8Array>;
    generateRecursiveProofArtifacts(proofData: ProofData, numOfPublicInputs: number): Promise<{
        proofAsFields: string[];
        vkAsFields: string[];
        vkHash: string;
    }>;
    destroy(): Promise<void>;
}
