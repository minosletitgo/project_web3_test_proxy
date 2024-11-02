const winston = require('winston');
const path = require('path');
const fs = require('fs');

// 确保 logs 文件夹存在
const logsDir = process.env.LOGS_DIR
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// 获取当前日期
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
const day = String(now.getDate()).padStart(2, '0');

// 生成日志文件名
const logFileName = `output_${year}_${month}${day}.log`;

// 获取本地时间的格式化函数
const formatDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 创建日志记录器
/**
    日志分级
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
*/

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: formatDate }), // 使用自定义的时间格式
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, logFileName) }),
    new winston.transports.Console() // 可选：将日志输出到控制台
  ]
});


module.exports = logger;
