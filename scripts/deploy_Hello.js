const { ethers } = require("hardhat");

async function main() {
    // 部署实现合约V1
    const Hello = await ethers.getContractFactory("Hello");
    const hello = await Hello.deploy();
    await hello.deployed();
    console.log("hello.address = ", hello.address); 

    // 监听 ContractDeployed 事件 
    hello.on("DoLog", (str) => {
        console.log(`hello event detected!`);
        console.log(`str: ${str}`);
    });    

    console.log(" => ", await hello.greet()); 
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});