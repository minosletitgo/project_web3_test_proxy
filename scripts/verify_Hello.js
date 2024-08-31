const { ethers, run, network } = require("hardhat");

// 在你的部署脚本中
async function main() {
  const contractAddress = "0x3Fb22Fe66A192919911f9823D7F86DD5cc9Bf333";
  const constructorArgs = [];
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
