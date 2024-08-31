const { ethers } = require("hardhat");

async function main() {
    // 部署实现合约V1
    const Hello = await ethers.getContractFactory("Hello");
    const hello = await Hello.deploy();
    await hello.deployed();
    console.log("hello.address = ", hello.address);   
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});