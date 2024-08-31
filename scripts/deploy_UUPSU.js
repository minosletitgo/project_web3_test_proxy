const { ethers, upgrades } = require("hardhat");

async function main() {
  // 部署实现合约V1
  const MyContractV1 = await ethers.getContractFactory("UUPSU_MyContract_V1");
  const myContractV1 = await upgrades.deployProxy(MyContractV1, [142], {
    initializer: "initialize",
  });
  await myContractV1.deployed();

  console.log("myContractV1 proxy address = ", myContractV1.address);

  // 打印逻辑合约V1的原始地址
  const logicAddressV1 = await upgrades.erc1967.getImplementationAddress(myContractV1.address);
  console.log("myContractV1 logic contract address = ", logicAddressV1);

  console.log("proxyAsV1_value = ", (await myContractV1.getValue()).toString());

  // 部署实现合约V2
  const MyContractV2 = await ethers.getContractFactory("UUPSU_MyContract_V2");

  // 升级到V2
  const myContractV2 = await upgrades.upgradeProxy(
    myContractV1.address,
    MyContractV2
  );  
  console.log("myContractV2 proxy address = ", myContractV2.address);

  // 打印逻辑合约V2的原始地址
  const logicAddressV2 = await upgrades.erc1967.getImplementationAddress(myContractV2.address);
  console.log("myContractV2 logic contract address = ", logicAddressV2);

  console.log("proxyAsV2_value = ", (await myContractV1.getValue()).toString());

  await myContractV2.increment();

  console.log("proxyAsV2_value = ", (await myContractV2.getValue()).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
