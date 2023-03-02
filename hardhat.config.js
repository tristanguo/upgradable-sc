require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");

/* to be able to use ethers.getContract() 
    npm install --save-dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
    require("@nomiclabs/hardhat-ethers");
*/

require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
