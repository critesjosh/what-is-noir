"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reconstructHonkProof = exports.splitHonkProof = void 0;
// Buffers are prepended with their size. The size takes 4 bytes.
const serializedBufferSize = 4;
const fieldByteSize = 32;
const publicInputOffset = 3;
const publicInputsOffsetBytes = publicInputOffset * fieldByteSize;
function splitHonkProof(proofWithPublicInputs) {
    const proofAsStrings = deflattenFields(proofWithPublicInputs.slice(4));
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
    const publicInputs = proofWithPublicInputs.slice(publicInputsOffset, publicInputsOffset + publicInputsSplitIndex);
    return {
        proof,
        publicInputs,
    };
}
exports.splitHonkProof = splitHonkProof;
function reconstructHonkProof(publicInputs, proof) {
    const proofStart = proof.slice(0, publicInputsOffsetBytes + serializedBufferSize);
    const proofEnd = proof.slice(publicInputsOffsetBytes + serializedBufferSize);
    // Concatenate publicInputs and proof
    const proofWithPublicInputs = Uint8Array.from([...proofStart, ...publicInputs, ...proofEnd]);
    return proofWithPublicInputs;
}
exports.reconstructHonkProof = reconstructHonkProof;
function deflattenFields(flattenedFields) {
    const publicInputSize = 32;
    const chunkedFlattenedPublicInputs = [];
    for (let i = 0; i < flattenedFields.length; i += publicInputSize) {
        const publicInput = flattenedFields.slice(i, i + publicInputSize);
        chunkedFlattenedPublicInputs.push(publicInput);
    }
    return chunkedFlattenedPublicInputs.map(uint8ArrayToHex);
}
function uint8ArrayToHex(buffer) {
    const hex = [];
    buffer.forEach(function (i) {
        let h = i.toString(16);
        if (h.length % 2) {
            h = '0' + h;
        }
        hex.push(h);
    });
    return '0x' + hex.join('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvb2YvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUVBQWlFO0FBQ2pFLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN6QixNQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUM1QixNQUFNLHVCQUF1QixHQUFHLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztBQUVsRSxTQUFnQixjQUFjLENBQUMscUJBQWlDO0lBQzlELE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2RSxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEQsa0RBQWtEO0lBQ2xELE1BQU0sa0JBQWtCLEdBQUcsdUJBQXVCLEdBQUcsb0JBQW9CLENBQUM7SUFDMUUsa0RBQWtEO0lBQ2xELE1BQU0sVUFBVSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUN0RSxNQUFNLHNCQUFzQixHQUFHLGVBQWUsR0FBRyxhQUFhLENBQUM7SUFDL0QsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLHNCQUFzQixDQUFDLENBQUM7SUFDMUYsZ0RBQWdEO0lBQ2hELE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRTNELDREQUE0RDtJQUM1RCxNQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLEdBQUcsc0JBQXNCLENBQUMsQ0FBQztJQUVsSCxPQUFPO1FBQ0wsS0FBSztRQUNMLFlBQVk7S0FDYixDQUFDO0FBQ0osQ0FBQztBQXJCRCx3Q0FxQkM7QUFFRCxTQUFnQixvQkFBb0IsQ0FBQyxZQUF3QixFQUFFLEtBQWlCO0lBQzlFLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLHVCQUF1QixHQUFHLG9CQUFvQixDQUFDLENBQUM7SUFDbEYsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO0lBRTdFLHFDQUFxQztJQUNyQyxNQUFNLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLFlBQVksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFN0YsT0FBTyxxQkFBcUIsQ0FBQztBQUMvQixDQUFDO0FBUkQsb0RBUUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxlQUEyQjtJQUNsRCxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDM0IsTUFBTSw0QkFBNEIsR0FBaUIsRUFBRSxDQUFDO0lBRXRELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNqRSxNQUFNLFdBQVcsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFDbEUsNEJBQTRCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxPQUFPLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsTUFBa0I7SUFDekMsTUFBTSxHQUFHLEdBQWEsRUFBRSxDQUFDO0lBRXpCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2pCLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztRQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0IsQ0FBQyJ9