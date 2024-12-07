const { ethers, run, network } = require("hardhat");

async function main() {
  // 填写准备验证的合约地址...
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
