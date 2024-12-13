// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVerifier {
    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool);
}

contract SimpleCounter {
    IVerifier public verifier;
    uint256 public counter;

    constructor(address _verifier) {
        verifier = IVerifier(_verifier);
    }

    function updateCounterIfVerified(bytes calldata _proof, bytes32[] calldata _publicInputs) external {
        bool valid = verifier.verify(_proof, _publicInputs);
        if (valid) {
            counter += 1;
        }
    }
}
