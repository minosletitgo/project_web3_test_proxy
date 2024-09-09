const fs = require("fs");
const path = require("path");

// 在这里定义要查看的合约文件名和合约名称的数组
const contracts = [
  { fileName: "Hello.sol", contractName: "Hello" },
  { fileName: "TU_MyContract.sol", contractName: "TU_MyContract_V2" },
  { fileName: "UUPSU_MyContract.sol", contractName: "UUPSU_MyContract_V2" },
];

async function main() {
  // 获取项目根目录
  const projectRoot = process.cwd();
  for (const { fileName, contractName } of contracts) {
    // 拼接 JSON 文件的路径
    //const artifactsPath = path.join(__dirname, 'artifacts', 'contracts', fileName, `${contractName}.json`);
    const artifactsPath = path.join(
      projectRoot,
      "artifacts",
      "contracts",
      fileName,
      `${contractName}.json`
    );

    // 检查文件是否存在
    if (!fs.existsSync(artifactsPath)) {
      console.error(`合约 JSON 文件不存在: ${artifactsPath}`);
      continue;
    }

    // 读取 JSON 文件
    const artifact = JSON.parse(fs.readFileSync(artifactsPath, "utf8"));

    // 检查 JSON 文件中是否包含字节码
    if (!artifact || !artifact.bytecode) {
      console.error(`JSON 文件中没有找到字节码: ${artifactsPath}`);
      continue;
    }

    // 获取字节码
    const bytecode = artifact.bytecode;
    const bytecodeSizeInBytes = bytecode.length / 2; // 字节码是16进制编码的，所以长度除以2得到字节数
    const bytecodeSizeInKB = (bytecodeSizeInBytes / 1024).toFixed(1); // 转换为KB并保留一位小数

    console.log(`合约 "${contractName}" 的字节码大小: ${bytecodeSizeInKB}KB`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
