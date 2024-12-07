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
    console.log("强行绑定V1的合约套壳实例");

    //proxyAsLogic = TU_MyContract_V1.attach(proxyAddress);
    // 这里不使用abi，直接生成逻辑合约实例
    proxyAsLogic = await ethers.getContractAt("TU_MyContract_V1", proxyAddress);
    expect(proxyAsLogic).to.exist;    
    console.log("\n");
  });

   it(" ", async function() {
    console.log("获取查看逻辑合约V1的成员变量: ");    

    let logic_InitWay;
    let logic_Version;
    let logic_Value;

    logic_InitWay = await proxyAsLogic.getInitWay();
    console.log("logic_InitWay:", logic_InitWay);

    logic_Version = await proxyAsLogic.getVersion();
    console.log("logic_Version:", logic_Version);

    logic_Value = (await proxyAsLogic.getValue()).toString();
    console.log("logic_Value:", logic_Value); 
   });
});

/*
  npx hardhat test test/test.TU_MyContract_V1.js --network localHardhat
  npx hardhat test test/test.TU_MyContract_V1.js --network sepolia
*/