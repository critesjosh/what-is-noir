#!/usr/bin/env node
export declare function proveAndVerify(bytecodePath: string, witnessPath: string, crsPath: string): Promise<boolean>;
export declare function proveAndVerifyUltraHonk(bytecodePath: string, witnessPath: string, crsPath: string): Promise<boolean>;
export declare function proveAndVerifyMegaHonk(bytecodePath: string, witnessPath: string, crsPath: string): Promise<boolean>;
export declare function foldAndVerifyProgram(bytecodePath: string, witnessPath: string, crsPath: string): Promise<boolean>;
export declare function prove(bytecodePath: string, witnessPath: string, crsPath: string, outputPath: string): Promise<void>;
export declare function gateCountUltra(bytecodePath: string, honkRecursion: boolean): Promise<void>;
export declare function verify(proofPath: string, vkPath: string): Promise<boolean>;
export declare function contract(outputPath: string, vkPath: string): Promise<void>;
export declare function writeVk(bytecodePath: string, crsPath: string, outputPath: string): Promise<void>;
export declare function writePk(bytecodePath: string, crsPath: string, outputPath: string): Promise<void>;
export declare function proofAsFields(proofPath: string, vkPath: string, outputPath: string): Promise<void>;
export declare function vkAsFields(vkPath: string, vkeyOutputPath: string): Promise<void>;
export declare function proveUltraHonk(bytecodePath: string, witnessPath: string, crsPath: string, outputPath: string): Promise<void>;
export declare function writeVkUltraHonk(bytecodePath: string, crsPath: string, outputPath: string): Promise<void>;
export declare function verifyUltraHonk(proofPath: string, vkPath: string): Promise<boolean>;
export declare function proofAsFieldsUltraHonk(proofPath: string, outputPath: string): Promise<void>;
export declare function vkAsFieldsUltraHonk(vkPath: string, vkeyOutputPath: string): Promise<void>;
//# sourceMappingURL=main.d.ts.map