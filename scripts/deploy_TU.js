const { ethers } = require("hardhat");

async function main() {
    // 部署实现合约V1
    const MyContractV1 = await ethers.getContractFactory("TU_MyContract_V1");
    const myContractV1 = await MyContractV1.deploy();
    await myContractV1.deployed();
    console.log("myContractV1.address = ", myContractV1.address);
    
    // 部署ProxyAdmin
    const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
    const proxyAdmin = await ProxyAdmin.deploy();
    await proxyAdmin.deployed();
    console.log("proxyAdmin.address = ", proxyAdmin.address);
    
    // 部署透明代理，且指向V1
    const TransparentUpgradeableProxy = await ethers.getContractFactory("TransparentUpgradeableProxy");
    const proxy = await TransparentUpgradeableProxy.deploy(
        myContractV1.address,
        proxyAdmin.address,
        myContractV1.interface.encodeFunctionData("initialize", [42])
    );

    // 拿到V1的套壳版，并打印一些内部数据
    const proxyAsV1 = MyContractV1.attach(proxy.address);
    console.log("proxyAsV1_value = ", (await proxyAsV1.getValue()).toString());
    
    // 部署实现合约V1
    const MyContractV2 = await ethers.getContractFactory("TU_MyContract_V2");
    const myContractV2 = await MyContractV2.deploy();
    await myContractV2.deployed();
    console.log("myContractV2.address = ", myContractV2.address);

    // 升级合约到V2(透明代理指向V2)
    await proxyAdmin.upgrade(proxy.address, myContractV2.address);

    // 拿到V2的套壳版，并打印一些内部数据
    const proxyAsV2 = MyContractV2.attach(proxy.address);
    console.log("proxyAsV2_value = ", (await proxyAsV2.getValue()).toString());

    await proxyAsV2.increment();
    console.log("proxyAsV2_value = ", (await proxyAsV2.getValue()).toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});