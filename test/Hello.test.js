const { expect } = require('chai');

describe('Hello Contract', function () {
  let Hello;
  let hello;

  beforeEach(async function () {
    Hello = await ethers.getContractFactory('Hello');
    hello = await Hello.deploy();
    await hello.deployed();
  });

  it('should deploy the contract', async function () {
    expect(await hello.deployed()).to.be.ok;
  });

  // 测试 greet() 函数
  it('should return the correct greeting', async function () {
    // 调用 greet() 函数
    const greeting = await hello.greet();
    
    // 断言 greet() 函数返回的字符串
    expect(greeting).to.equal('Hello, World!');
  });
});
