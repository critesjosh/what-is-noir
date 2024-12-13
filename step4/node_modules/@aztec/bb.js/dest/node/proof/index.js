// Buffers are prepended with their size. The size takes 4 bytes.
const serializedBufferSize = 4;
const fieldByteSize = 32;
const publicInputOffset = 3;
const publicInputsOffsetBytes = publicInputOffset * fieldByteSize;
export function splitHonkProof(proofWithPublicInputs) {
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
export function reconstructHonkProof(publicInputs, proof) {
    const proofStart = proof.slice(0, publicInputsOffsetBytes + serializedBufferSize);
    const proofEnd = proof.slice(publicInputsOffsetBytes + serializedBufferSize);
    // Concatenate publicInputs and proof
    const proofWithPublicInputs = Uint8Array.from([...proofStart, ...publicInputs, ...proofEnd]);
    return proofWithPublicInputs;
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvb2YvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaUVBQWlFO0FBQ2pFLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN6QixNQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUM1QixNQUFNLHVCQUF1QixHQUFHLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztBQUVsRSxNQUFNLFVBQVUsY0FBYyxDQUFDLHFCQUFpQztJQUM5RCxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdkUsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxELGtEQUFrRDtJQUNsRCxNQUFNLGtCQUFrQixHQUFHLHVCQUF1QixHQUFHLG9CQUFvQixDQUFDO0lBQzFFLGtEQUFrRDtJQUNsRCxNQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDdEUsTUFBTSxzQkFBc0IsR0FBRyxlQUFlLEdBQUcsYUFBYSxDQUFDO0lBQy9ELE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzFGLGdEQUFnRDtJQUNoRCxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsVUFBVSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUUzRCw0REFBNEQ7SUFDNUQsTUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixHQUFHLHNCQUFzQixDQUFDLENBQUM7SUFFbEgsT0FBTztRQUNMLEtBQUs7UUFDTCxZQUFZO0tBQ2IsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsWUFBd0IsRUFBRSxLQUFpQjtJQUM5RSxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xGLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsb0JBQW9CLENBQUMsQ0FBQztJQUU3RSxxQ0FBcUM7SUFDckMsTUFBTSxxQkFBcUIsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxZQUFZLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRTdGLE9BQU8scUJBQXFCLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLGVBQTJCO0lBQ2xELE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUMzQixNQUFNLDRCQUE0QixHQUFpQixFQUFFLENBQUM7SUFFdEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ2pFLE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQztRQUNsRSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELE9BQU8sNEJBQTRCLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxNQUFrQjtJQUN6QyxNQUFNLEdBQUcsR0FBYSxFQUFFLENBQUM7SUFFekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDakIsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3QixDQUFDIn0=