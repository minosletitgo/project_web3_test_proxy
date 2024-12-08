const { ethers, run, network } = require("hardhat");

async function main() {  
  /*
      此处，记录一下sepolia网的相关地址，可以上浏览器反复查询观看：
      本次生成的代理合约地址：0x0a15833fBF3a6197352C02f2A62F5e98A36Cb396 

      以下分别是V1与V2的地址
  */
  const contracts = [    
    { address: "0x279BB4B3523ECD1B468DE87c8FDf57e076717fC4", args: [] },
    { address: "0xfCF02707550AC63f51a8A94c84A9B3D3f1cfC916", args: [] },
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
    npx hardhat run .\scripts\verify_UUPSU.js --network sepolia
  */
