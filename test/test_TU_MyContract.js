const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("TU_MyContract_V1", function () {
  let proxyAsV1;
  let proxyAsV2;
  let proxy;
  let proxyAdmin;
  let adminAddress;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners(); // 获取测试账户

    // 部署实现合约V1
    const TU_MyContract_V1 = await ethers.getContractFactory(
      "TU_MyContract_V1"
    );
    const tu_MyContract_V1 = await TU_MyContract_V1.deploy();
    await tu_MyContract_V1.deployed();
    console.log("tu_MyContract_V1.address = ", tu_MyContract_V1.address);

    // 部署ProxyAdmin
    const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
    const proxyAdmin = await ProxyAdmin.deploy();
    await proxyAdmin.deployed();
    console.log("proxyAdmin.address = ", proxyAdmin.address);

    // 部署透明代理，且指向V1
    const TransparentUpgradeableProxy = await ethers.getContractFactory(
      "TransparentUpgradeableProxy"
    );
    const proxy = await TransparentUpgradeableProxy.deploy(
      tu_MyContract_V1.address,
      proxyAdmin.address,
      tu_MyContract_V1.interface.encodeFunctionData("initialize", [42])
    );

    // Attach the proxy to the TU_MyContract_V1 contract
    proxyAsV1 = TU_MyContract_V1.attach(proxy.address);

    // 部署实现合约V2
    const TU_MyContract_V2 = await ethers.getContractFactory(
      "TU_MyContract_V2"
    );
    const tu_MyContract_V2 = await TU_MyContract_V2.deploy();
    await tu_MyContract_V2.deployed();
    console.log("tu_MyContract_V2.address = ", tu_MyContract_V2.address);

    // 升级合约到V2(透明代理指向V2)
    await proxyAdmin.upgrade(proxy.address, tu_MyContract_V2.address);

    // 拿到V2的套壳版，并打印一些内部数据
    proxyAsV2 = TU_MyContract_V2.attach(proxy.address);
  });

  it("proxyAsV1 get value", async function () {
    const value = await proxyAsV1.getValue();

    //我真的是厌恶这些比较函数，变来变去
    expect(value.toNumber()).to.eq(42);
  });

  it("proxyAsV2 get value", async function () {
    const value = await proxyAsV2.getValue();

    //我真的是厌恶这些比较函数，变来变去
    expect(value.toNumber()).to.eq(42);
  });
});

/*
  npx hardhat test test/test_TU_MyContract.js
*/