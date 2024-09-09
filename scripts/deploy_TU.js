const { ethers } = require("hardhat");

async function main() {
    // 部署实现合约V1
    const TU_MyContract_V1 = await ethers.getContractFactory("TU_MyContract_V1");
    const tu_MyContract_V1 = await TU_MyContract_V1.deploy();
    await tu_MyContract_V1.deployed();
    console.log("tu_MyContract_V1.address = ", tu_MyContract_V1.address);
    
    // 部署ProxyAdmin
    const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
    const proxyAdmin = await ProxyAdmin.deploy();
    await proxyAdmin.deployed();
    console.log("proxyAdmin.address = ", proxyAdmin.address);
    
    // 部署透明代理，且指向V1
    const TransparentUpgradeableProxy = await ethers.getContractFactory("TransparentUpgradeableProxy");
    const proxy = await TransparentUpgradeableProxy.deploy(
        tu_MyContract_V1.address,
        proxyAdmin.address,
        tu_MyContract_V1.interface.encodeFunctionData("initialize", [42])
    );

    // 拿到V1的套壳版，并打印一些内部数据
    const proxyAsV1 = TU_MyContract_V1.attach(proxy.address);
    console.log("proxyAsV1_value = ", (await proxyAsV1.getValue()).toString());
    
    // 部署实现合约V2
    const TU_MyContract_V2 = await ethers.getContractFactory("TU_MyContract_V2");
    const tu_MyContract_V2 = await TU_MyContract_V2.deploy();
    await tu_MyContract_V2.deployed();
    console.log("tu_MyContract_V2.address = ", tu_MyContract_V2.address);

    // 升级合约到V2(透明代理指向V2)
    await proxyAdmin.upgrade(proxy.address, tu_MyContract_V2.address);

    // 拿到V2的套壳版，并打印一些内部数据
    const proxyAsV2 = TU_MyContract_V2.attach(proxy.address);
    console.log("proxyAsV2_value = ", (await proxyAsV2.getValue()).toString());

    await proxyAsV2.increment();
    console.log("proxyAsV2_value = ", (await proxyAsV2.getValue()).toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});