import { BackendOptions, Barretenberg } from './index.js';
export declare class UltraPlonkBackend {
    protected acirUncompressedBytecode: Uint8Array;
    protected options: BackendOptions;
    protected api: Barretenberg;
    protected acirComposer: any;
    constructor(acirUncompressedBytecode: Uint8Array, options?: BackendOptions);
    /** @ignore */
    instantiate(): Promise<void>;
    /** @description Generates a proof */
    generateProof(uncompressedWitness: Uint8Array): Promise<Uint8Array>;
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
    generateRecursiveProofArtifacts(proof: Uint8Array, numOfPublicInputs?: number): Promise<{
        proofAsFields: string[];
        vkAsFields: string[];
        vkHash: string;
    }>;
    /** @description Verifies a proof */
    verifyProof(proof: Uint8Array): Promise<boolean>;
    getVerificationKey(): Promise<Uint8Array>;
    destroy(): Promise<void>;
}
export declare class UltraHonkBackend {
    protected acirUncompressedBytecode: Uint8Array;
    protected options: BackendOptions;
    protected api: Barretenberg;
    constructor(acirUncompressedBytecode: Uint8Array, options?: BackendOptions);
    /** @ignore */
    instantiate(): Promise<void>;
    generateProof(uncompressedWitness: Uint8Array): Promise<Uint8Array>;
    verifyProof(proof: Uint8Array): Promise<boolean>;
    getVerificationKey(): Promise<Uint8Array>;
    generateRecursiveProofArtifacts(_proof: Uint8Array, _numOfPublicInputs: number): Promise<{
        proofAsFields: string[];
        vkAsFields: string[];
        vkHash: string;
    }>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=backend.d.ts.map