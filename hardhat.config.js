require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-gas-reporter")
require('hardhat-abi-exporter');
require("dotenv").config();
const path = require('path');

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,  // 启用优化
        runs: 200       // 运行次数，通常设置为 200
      }
    },
    viaIR: true         // 启用 Intermediate Representation 优化
  },
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
      url: process.env.PRIVATE_URL_ETH_Sepolia,
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY_sepolia],
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY_sepolia,
    },
  },
  gasReporter: {
    enabled: true, // 启用 gas reporter
    currency: 'USD', // 货币单位（可以是 'USD', 'ETH', 'EUR' 等）
    gasPrice: 20, // gas price (单位: gwei)
    outputFile: 'gas-report.txt', // 指定输出报告的文件路径
    noColors: true, // 禁用颜色输出（默认为 false）
    showTimeSpent: true, // 显示每个测试用例的执行时间
    showMethodSig: true, // 显示方法签名
    excludeContracts: ['Migrations'], // 排除不需要报告的合约
  },
  abiExporter: {
    runOnCompile: false, // 这行很重要，确保每次编译都会导出 ABI(本工程，放弃使用，有未知的重名合约)
    path: './abi', // ABI 文件的输出目录
    clear: true,    // 每次生成时清空输出目录
    flat: true,     // 是否将所有 ABI 写入一个文件
  },   
};
