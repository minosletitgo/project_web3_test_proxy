const { ethers, upgrades } = require("hardhat");

/*
    通用可升级代理(UUPSUpgradeable，简称UUPSU代理)
    --机制来源：openzeppelin/contracts-upgradeable
    --独立代理合约：无需显性的调用(隐藏在逻辑合约的上层基类中，自带升级函数)
    --没有选择器冲突
    --特性：Gas消耗不高，但更复杂
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
