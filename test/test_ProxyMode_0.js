const hre = require("hardhat");
const logger = require("../srcs/logger");
const abi_Proxy = require("../abi_make/ProxyMode_0_Proxy.json");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  // 拿代理合约实例
  const address_Proxy = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const proxy = new hre.ethers.Contract(address_Proxy, abi_Proxy, signer);

  logger.info(`-----1--------`);

  // 计算逻辑合约中，setValue1函数的函数选择器
  const functionSignature = "setValue1(uint256)";
  //const functionSignature = "setDebugValue1(uint256)";
  const valueToSet = 123;
  const selector = ethers.utils.id(functionSignature).slice(0, 10);
  const encodedData =
    selector +
    ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(valueToSet), 32).slice(2);

  logger.info(`-----2--------`);

  // 调用函数，都是以"发送交易"的形式，传递到链上
  const tx = await signer.sendTransaction({
    to: address_Proxy, // 代理合约地址
    data: encodedData, // 编码后的数据
  });
  //const tx = await proxy.setDebugValue1(123); // 实际发送交易

  logger.info(`-----3--------`);

  const contractReceipt = await tx.wait(); // 等待交易打包进区块
  //强制打印交易Json数据
  if (contractReceipt) {
    logger.info(`contractReceipt.status = ${contractReceipt.status}`);

    if (contractReceipt.events && contractReceipt.events.length > 0) {
      logger.info(
        `contractReceipt.events.length = ${contractReceipt.events.length}`
      );
      for (const event of contractReceipt.events) {
        logger.info(JSON.stringify(event, null, 2)); // 格式化 JSON 输出
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
