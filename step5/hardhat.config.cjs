// require("@nomicfoundation/hardhat-ignition");
// require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: false,
    },
  },
  allowUnlimitedContractSize: true,
}; 