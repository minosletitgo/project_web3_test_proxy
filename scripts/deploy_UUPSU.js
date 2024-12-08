const { ethers, upgrades } = require("hardhat");

/*
    通用可升级代理(UUPSUpgradeable，简称UUPSU代理)
    --机制来源：openzeppelin/contracts-upgradeable
    --独立代理合约：无需显性的调用(隐藏在逻辑合约的上层基类中，自带升级函数)
    --没有选择器冲突
    --燃气费：Gas消耗不高，但更复杂

    特性详细说明：
    --逻辑合约负责升级：逻辑合约本身包含一个 upgradeTo 函数，这个函数由逻辑合约的管理员调用来进行升级操作。
    --代理合约简化：代理合约变得非常简单，仅负责将调用委托给逻辑合约，不再存储任何升级逻辑。
    --更轻量：由于升级逻辑被移到了逻辑合约中，代理合约的复杂度大大降低，每次调用都不需要进行权限检查，节省了开销。

    优点：
    --代理合约更加轻量，避免了每次调用都进行权限检查的开销。升级逻辑由逻辑合约负责，简化了代理合约。

    缺点：
    --逻辑合约中包含了升级逻辑，可能引发安全性问题。如果逻辑合约本身的升级逻辑存在漏洞，合约可能被恶意升级。

    适用项目：
    --适合那些对效率要求更高的项目
*/

async function main() {
  const LogicV1 = await ethers.getContractFactory("UUPSU_MyContract_V1");
  const proxy = await upgrades.deployProxy(LogicV1, ["from_initializer", 1001], 
      { 
          initializer: "initialize",
          //initializer: false,
          kind: "uups"
      }
  );    
  await proxy.deployed();

  // 代理合约的地址 localHardhat: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
  // 代理合约的地址 sepolia: 0x0a15833fBF3a6197352C02f2A62F5e98A36Cb396    
  console.log("proxy deployed to:", proxy.address);

  // 逻辑合约地址 localHardhat: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  // 逻辑合约地址 sepolia: 0x279BB4B3523ECD1B468DE87c8FDf57e076717fC4    
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);
  console.log("LogicV1 (implementation) deployed to:", implementationAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*
  npx hardhat run .\scripts\deploy_UUPSU.js --network localHardhat
  npx hardhat run .\scripts\deploy_UUPSU.js --network sepolia
*/