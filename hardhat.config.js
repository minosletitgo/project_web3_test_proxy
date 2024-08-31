require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    localHardhat: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      accounts: [process.env.PRIVATE_KEY_localHardhat],
      loggingEnabled: true, // 启用日志记录
    },
    localGanache: {
      url: "HTTP://127.0.0.1:7545",
      chainId: 1337,
      accounts: [process.env.PRIVATE_KEY_localGanache],
      loggingEnabled: true, // 启用日志记录
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/u_NptynwrwopejMYBwQ5ZVxHrNsoAigq",
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY_sepolia],
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY_sepolia,
    },
  },
};
