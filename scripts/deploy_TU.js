const { ethers, upgrades } = require("hardhat");

/*
    透明代理(TransparentUpgradeableProxy，简称TU代理)
    --机制来源：openzeppelin/contracts/proxy/transparent
    --独立的代理合约：ProxyAdmin，显性的调用，它有且只实现升级逻辑
    --没有选择器冲突
    --燃气费：Gas消耗高

    特性详细说明：
    --权限分离：只有特定的管理者（通常是合约的管理员）才能调用代理合约的管理函数，例如升级逻辑合约。而普通用户的调用会被转发到逻辑合约。
    --避免冲突：为了避免普通用户访问代理合约中的管理函数，代理合约通过权限检查来确保只有管理员能够调用管理函数。普通用户调用的任何函数都被转发到逻辑合约。
    --两层架构：代理合约和逻辑合约分开管理，代理合约只负责存储数据和升级逻辑，逻辑合约负责业务实现。

    优点：
    --权限分离清晰，确保管理员和用户的操作不会混淆。普通用户无法直接访问代理的管理功能。

    缺点：
    --需要对管理员权限进行检查，这导致每次调用都会增加额外的权限检查开销。

    适用项目：
    --适合那些比较稳定成熟的项目
*/

// async function main() {
//     // 部署实现合约V1
//     const TU_MyContract_V1 = await ethers.getContractFactory("TU_MyContract_V1");
//     const tu_MyContract_V1 = await TU_MyContract_V1.deploy();
//     await tu_MyContract_V1.deployed();
//     console.log("tu_MyContract_V1.address = ", tu_MyContract_V1.address);
    
//     // 部署ProxyAdmin
//     const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
//     const proxyAdmin = await ProxyAdmin.deploy();
//     await proxyAdmin.deployed();
//     console.log("proxyAdmin.address = ", proxyAdmin.address);
    
//     // 部署透明代理，且指向V1
//     const TransparentUpgradeableProxy = await ethers.getContractFactory("TransparentUpgradeableProxy");
//     const proxy = await TransparentUpgradeableProxy.deploy(
//         tu_MyContract_V1.address,
//         proxyAdmin.address,
//         tu_MyContract_V1.interface.encodeFunctionData("initialize", [42])
//     );

//     // 拿到V1的套壳版，并打印一些内部数据
//     const proxyAsV1 = TU_MyContract_V1.attach(proxy.address);
//     console.log("proxyAsV1_value = ", (await proxyAsV1.getValue()).toString());
    
//     // 部署实现合约V2
//     const TU_MyContract_V2 = await ethers.getContractFactory("TU_MyContract_V2");
//     const tu_MyContract_V2 = await TU_MyContract_V2.deploy();
//     await tu_MyContract_V2.deployed();
//     console.log("tu_MyContract_V2.address = ", tu_MyContract_V2.address);

//     // 升级合约到V2(透明代理指向V2)
//     await proxyAdmin.upgrade(proxy.address, tu_MyContract_V2.address);

//     // 拿到V2的套壳版，并打印一些内部数据
//     const proxyAsV2 = TU_MyContract_V2.attach(proxy.address);
//     console.log("proxyAsV2_value = ", (await proxyAsV2.getValue()).toString());

//     await proxyAsV2.increment();
//     console.log("proxyAsV2_value = ", (await proxyAsV2.getValue()).toString());
// }

async function main() {
    const LogicV1 = await ethers.getContractFactory("TU_MyContract_V1");
    const proxy = await upgrades.deployProxy(LogicV1, ["from_initializer", 1001], 
        { 
            initializer: "initialize",
            //initializer: false,
            kind: "transparent"
        }
    );    
    await proxy.deployed();

    // 代理合约的地址 localHardhat: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
    // 代理合约的地址 sepolia: 0x40D7c1dA96ab2960f776C4322eFABc92C2633D1d    
    console.log("proxy deployed to:", proxy.address);

    // 逻辑合约地址 localHardhat: 0x5FbDB2315678afecb367f032d93F642f64180aa3
    // 逻辑合约地址 sepolia: 0x3FA78CfDf5Ca21c027Bad8169f79beCC8cfdF972    
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);
    console.log("LogicV1 (implementation) deployed to:", implementationAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

/*
    npx hardhat run .\scripts\deploy_TU.js --network localHardhat
    npx hardhat run .\scripts\deploy_TU.js --network sepolia
*/