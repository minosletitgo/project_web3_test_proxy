const { expect } = require("chai");
const { Web3 } = require("web3");
const web3 = new Web3(
  process.env.PRIVATE_URL_ETH_Mainnet
);

describe("Hello Contract", function () {
  let Hello;
  let hello;

  beforeEach(async function () {
    Hello = await ethers.getContractFactory("Hello");
    hello = await Hello.deploy();
    await hello.deployed();
  });

  it("should deploy the contract", async function () {
    expect(await hello.deployed()).to.be.ok;
  });

  // 测试 greet() 函数
  it("should return the correct greeting", async function () {
    // 调用 greet() 函数
    const greeting = await hello.greet();

    // 断言 greet() 函数返回的字符串
    expect(greeting).to.equal("Hello, World!");
  });

  it("Vitalik Balance", async function () {
    const addressVitalik = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
    const balanceWei = await web3.eth.getBalance(addressVitalik);
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");
    console.log(`Vitalik.Address: ${addressVitalik}`);
    console.log(`Vitalik.Balance: ${balanceEth} ETH`);
  });  

  it("Robinhood Balance", async function () {
    const addressRobinhood = "0x40B38765696e3d5d8d9d834D8AaD4bB6e418E489";
    const balanceWei = await web3.eth.getBalance(addressRobinhood);
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");
    console.log(`Robinhood.Address: ${addressRobinhood}`);
    console.log(`Robinhood.Balance: ${balanceEth} ETH`);
  });  
});
