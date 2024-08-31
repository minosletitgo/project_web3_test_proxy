
----------------------------------------------------------------------------------------------------
切记不要忽视版本号，特别是当ethers版本号=6的时候，语法都有差异！！！

初始化 Node.js 项目
npm init

npm install hardhat@2.22.9

选择"创建一个空的 hardhat.config.js"

npm install ethers@5.4.1

npm install @nomiclabs/hardhat-ethers@2.2.1

npm install @nomiclabs/hardhat-etherscan@3.1.7

npm install dotenv@16.4.5
----------------------------------------------------------------------------------------------------

自行搭建hardhat.config.js 以及 .env配置文件

----------------------------------------------------------------------------------------------------
npm install @openzeppelin/contracts@4.9.2

npm install @openzeppelin/contracts-upgradeable@4.9.2

npm install @openzeppelin/hardhat-upgrades@^1.28.0
----------------------------------------------------------------------------------------------------

部署：
npx hardhat run .\scripts\deploy_TU.js --network sepolia
npx hardhat run .\scripts\deploy_UUPSU.js --network sepolia

验证：(由于我的VPN比较差，所以验证都失败，虽然我尝试了很多方式)
npx hardhat run .\scripts\verify_TU.js --network sepolia
npx hardhat run .\scripts\verify_UUPSU.js --network sepolia

本工程主要是演示了【透明代理模式】与【通用可升级代理模式】
@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol
@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol
----------------------------------------------------------------------------------------------------

