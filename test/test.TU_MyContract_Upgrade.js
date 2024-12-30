const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe(" ", function () {  
  // 代理合约的地址
  let proxyAddress = "0xa45Dc2e10154167282D2598f37821d9133a60fbf";
  // 逻辑合约的地址
  let implementationAddress;
  // 使用代理合约的地址，绑定逻辑合约，生成的套壳合约
  let proxyAsLogic;  
  
  before(async function () {
    console.log("获取逻辑合约地址: ");

    implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);        
    console.log("implementationAddress : ", implementationAddress);
    console.log("请自行判断，此时逻辑合约的版本(如，根据地址来对比链上源码).....");
    console.log("\n");
  });

  before(async function () {
    console.log("准备直接升级到V2: ");
    // upgradeProxy函数中，直接包含了部署V2的过程，所以，我们没有手动部署V2
    const LogicV2 = await ethers.getContractFactory("TU_MyContract_V2");
    await upgrades.upgradeProxy(proxyAddress, LogicV2);

    implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);        
    console.log("implementationAddress : ", implementationAddress);

    console.log("\n");
  });  

  it(" ", async function() {
    console.log("耐心等待 upgradeProxy 完成.");
  });
});

/*
  npx hardhat test test/test.TU_MyContract_Upgrade.js --network localHardhat
  npx hardhat test test/test.TU_MyContract_Upgrade.js --network sepolia
  0xa410aE44BD3d2d03a7B6D8fA6371Cc9978829Ec7
*/