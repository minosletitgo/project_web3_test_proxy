const { ethers } = require("hardhat");
const logger = require("../srcs/logger");

async function main() {
    logger.info(`---------------- deploy_ProxyMode_0.js main() Start ----------------`);

    // 管理员账户
    const [deployer] = await ethers.getSigners();    
    logger.info(`Deploying contracts with the account: ${deployer.address}`);
    // 0x352307e6d885976D25B780f2af1F519084F6b2E7
    // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  
    // 部署 逻辑合约
    const LogicV1 = await ethers.getContractFactory("contracts/ProxyMode_0.sol:LogicV1");
    const logicV1 = await LogicV1.deploy();
    await logicV1.deployed(); // 等待合约部署完成
    logger.info(`logicV1 deployed to (address): ${logicV1.address}`);
    // 0x57C95cdb74C4821AE6850ee4fB7a4772ac65Fe5F
    // 0x5FbDB2315678afecb367f032d93F642f64180aa3
    // 0x0165878A594ca255338adfa4d48449f69242Eb8F
    // 0x610178dA211FEF7D417bC0e6FeD39F05609AD788
    // 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    // 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9

    // 部署 代理合约
    const Proxy = await ethers.getContractFactory("contracts/ProxyMode_0.sol:Proxy");
    const proxy = await Proxy.deploy(logicV1.address);
    await proxy.deployed(); // 等待合约部署完成
    logger.info(`proxy deployed to (address): ${proxy.address}`);    
    // 0x6f1f3EE4bE6325E1Ac9781d15992bdc2f0A3f478
    // 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    // 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
    // 0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e
    // 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
    // 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707

    logger.info(`---------------- deploy_ProxyMode_0.js main() Stop ----------------`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});