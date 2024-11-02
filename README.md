
<span style="color: red;"># 注意：本工程刻意的把"ethers库"停留在5.X.X !!! </span>

----------------------------------------------------------------------------------------------------

* 初始化 Node.js 项目
```
npm init
```


* 安装"hardhat包"
```
npm install hardhat@2.22.9
```

```
选择"创建一个空的 hardhat.config.js"
```

* 安装"ethers库"(与以太坊区块链交互的JavaScript库)
```
npm install ethers@5.4.1
```

* 安装"web3库"(与以太坊区块链交互的JavaScript库)
```
npm install web3@4.12.1
```

* 安装"hardhat-ethers插件"(ethers库与Hardhat包集成的插件)
```
npm install @nomiclabs/hardhat-ethers@2.2.1
```

* 安装"hardhat-etherscan插件"(允许开发者通过 Etherscan API 验证和发布他们的智能合约)
```
npm install @nomiclabs/hardhat-etherscan@3.1.7
```

* 安装"dotenv库"(加载环境变量从.env 文件中到 process.env，管理应用程序的配置和敏感信息)
```
npm install dotenv@16.4.5
```

* 安装"断言库"(用于 JavaScript 测试，提供了友好的语法来进行断言)
```
npm install --save-dev chai@4.3.6
```

* 安装"日志库"(用于在应用程序中记录日志)
```
npm install winston@3.14.2
```

* 安装"abi导出库"(用于导出智能合约的 ABI（应用程序二进制接口）到指定文件)
```
npm install --save-dev hardhat-abi-exporter@2.10.1
```

----------------------------------------------------------------------------------------------------

* 自行搭建hardhat.config.js 以及 .env配置文件

----------------------------------------------------------------------------------------------------

* 安装"gas报告插件"(用于生成智能合约的 gas 使用报告)
```
npm install --save-dev hardhat-gas-reporter@2.2.1
```

* 安装OpenZepplin的合约库
```
npm install @openzeppelin/contracts@4.9.2
```

* 安装OpenZepplin的可升级合约库
```
npm install @openzeppelin/contracts-upgradeable@4.9.2
```

* 安装OpenZepplin的hardhat升级插件
```
npm install @openzeppelin/hardhat-upgrades@^1.28.0
```

----------------------------------------------------------------------------------------------------

* 部署：
```
npx hardhat run .\scripts\deploy_TU.js --network sepolia
```
```
npx hardhat run .\scripts\deploy_UUPSU.js --network sepolia
```

* 验证：(由于我的VPN比较差，所以验证都失败，虽然我尝试了很多方式)
```
npx hardhat run .\scripts\verify_TU.js --network sepolia
```
```
npx hardhat run .\scripts\verify_UUPSU.js --network sepolia
```

* 本工程主要是演示了【透明代理模式】与【通用可升级代理模式】
>@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol

>@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol


----------------------------------------------------------------------------------------------------

* 计算(编译后)合约字节码的大小(KB)
```
node scripts/calculate_ByteCodeSize.js
```

----------------------------------------------------------------------------------------------------

* 编译：
```
npx hardhat compile
```

* 部署：启动且使用本地hardhat开发节点(会生成20个账户)：
```
npx hardhat node
```

* 部署：使用第三方软件Ganache搭建开发节点(需要提前搭建好)
```
npx hardhat run .\scripts\deploy_XXX.js --network localGanache
```

* 部署：使用测试链
```
npx hardhat run .\scripts\deploy_XXX.js --network sepolia
```

* 验证：(由于我的VPN比较差，所以验证都失败，虽然我尝试了很多方式)
```
npx hardhat run .\scripts\verify_XXX.js --network sepolia
```

* 测试：
```
npx hardhat test test/Hello.test.js
```

* 导出abi文件：
```
npx hardhat export-abi
```

* 清空导出的abi文件：
```
npx hardhat clear-abi
```

