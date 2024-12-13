import { WitnessMap } from '@noir-lang/types';
export declare function flattenFieldsAsArray(fields: string[]): Uint8Array;
export declare function deflattenFields(flattenedFields: Uint8Array): string[];
export declare function witnessMapToPublicInputs(publicInputs: WitnessMap): string[];
