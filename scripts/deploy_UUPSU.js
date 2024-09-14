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
  // 部署代理合约，并指向V1
  const UUPSU_MyContract_V1 = await ethers.getContractFactory("UUPSU_MyContract_V1");
  const uupsu_MyContract_V1 = await upgrades.deployProxy(UUPSU_MyContract_V1, [142], {
    initializer: "initialize",
  });
  await uupsu_MyContract_V1.deployed();

  console.log("uupsu_MyContract_V1 proxy address = ", uupsu_MyContract_V1.address);

  // 打印逻辑合约V1的原始地址
  const logicAddressV1 = await upgrades.erc1967.getImplementationAddress(uupsu_MyContract_V1.address);
  console.log("uupsu_MyContract_V1 logic contract address = ", logicAddressV1);

  console.log("proxyAsV1_value = ", (await uupsu_MyContract_V1.getValue()).toString());

  // 部署实现合约V2
  const UUPSU_MyContract_V2 = await ethers.getContractFactory("UUPSU_MyContract_V2");

  // 升级到V2(调用OpenZepplin封装好的upgrades.upgradeProxy)
  const uupsu_MyContract_V2 = await upgrades.upgradeProxy(
    uupsu_MyContract_V1.address,
    UUPSU_MyContract_V2
  );  
  console.log("uupsu_MyContract_V2 proxy address = ", uupsu_MyContract_V2.address);

  // 打印逻辑合约V2的原始地址
  const logicAddressV2 = await upgrades.erc1967.getImplementationAddress(uupsu_MyContract_V2.address);
  console.log("uupsu_MyContract_V2 logic contract address = ", logicAddressV2);

  console.log("proxyAsV2_value = ", (await uupsu_MyContract_V1.getValue()).toString());

  await uupsu_MyContract_V2.increment();

  console.log("proxyAsV2_value = ", (await uupsu_MyContract_V2.getValue()).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
