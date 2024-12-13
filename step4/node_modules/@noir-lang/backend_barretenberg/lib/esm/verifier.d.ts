import { ProofData } from '@noir-lang/types';
import { BackendOptions } from '@aztec/bb.js';
export declare class BarretenbergVerifier {
    private verifier;
    constructor(options?: BackendOptions);
    /** @description Verifies a proof */
    verifyProof(proofData: ProofData, verificationKey: Uint8Array): Promise<boolean>;
    destroy(): Promise<void>;
}
export declare function reconstructProofWithPublicInputs(proofData: ProofData): Uint8Array;
export declare class UltraHonkVerifier {
    private verifier;
    constructor(options?: BackendOptions);
    /** @description Verifies a proof */
    verifyProof(proofData: ProofData, verificationKey: Uint8Array): Promise<boolean>;
    destroy(): Promise<void>;
}
export declare function reconstructProofWithPublicInputsHonk(proofData: ProofData): Uint8Array;
