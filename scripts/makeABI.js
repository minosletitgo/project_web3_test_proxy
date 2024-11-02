const { ethers } = require("hardhat");
const logger = require("../srcs/logger");

async function main() {
    // 生成指定合约的abi
    const ProxyMode_0_Proxy = await ethers.getContractFactory("contracts/ProxyMode_0.sol:Proxy");
    console.log("ABI for ProxyMode_0_Proxy:", ProxyMode_0_Proxy.interface.format(ethers.utils.FormatTypes.json));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});