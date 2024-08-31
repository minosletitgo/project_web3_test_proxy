const { ethers, run, network } = require("hardhat");

// 在你的部署脚本中
async function main() {
  const contractAddress = "请填入目标合约地址，主网或者测试网";
  const constructorArgs = [42];
  console.log("contractAddress:", contractAddress );

  // 验证合约
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArgs,
    });
    console.log("Contract verified successfully!");
  } catch (e) {
    console.error("Failed to verify on Etherscan", e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
