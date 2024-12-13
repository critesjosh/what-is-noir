import { BackendOptions } from './index.js';
export declare class BarretenbergVerifier {
    private options;
    private api;
    private acirComposer;
    constructor(options?: BackendOptions);
    /** @ignore */
    instantiate(): Promise<void>;
    /** @description Verifies a proof */
    verifyUltraplonkProof(proof: Uint8Array, verificationKey: Uint8Array): Promise<boolean>;
    /** @description Verifies a proof */
    verifyUltrahonkProof(proof: Uint8Array, verificationKey: Uint8Array): Promise<boolean>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=verifier.d.ts.map