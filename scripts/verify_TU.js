const { ethers, run, network } = require("hardhat");

async function main() {
  /*
      此处，记录一下sepolia网的相关地址，可以上浏览器反复查询观看：
      本次生成的代理合约地址：0xa45Dc2e10154167282D2598f37821d9133a60fbf

      以下分别是V1与V2的地址 
  */
  const contracts = [
    { address: "0x3FA78CfDf5Ca21c027Bad8169f79beCC8cfdF972", args: [] },
    { address: "0xa410aE44BD3d2d03a7B6D8fA6371Cc9978829Ec7", args: [] },
  ];  

  // 验证合约
  for (const { address, args } of contracts) {
    console.log("Verifying contract at address:", address);

    try {
      await run("verify:verify", {
        address: address,
        constructorArguments: args,
      });
      console.log(`Contract at address ${address} verified successfully! \n`);
    } catch (e) {
      console.error(`Failed to verify contract at address ${address} on Etherscan \n`, e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  /*
    npx hardhat run .\scripts\verify_TU.js --network sepolia
  */
