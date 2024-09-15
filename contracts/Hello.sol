// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Hello {
    event DoLog(string str);
    // 定义一个返回字符串的公共函数
    function greet() public returns (string memory) {
        emit DoLog("Hello, World!"); 
        return "Hello, World!";
    }

    function print0() external returns (string memory) {
        emit DoLog("Hello, World!"); 
        return "Hello, World!";
    }

    function print1() external returns (string memory) {
        string memory str = unicode"print1() = 你好，世界";
        emit DoLog(str);
        return str;
    }

    function print2() external returns (string memory) {
        string memory str = unicode"print2() = nihao，shijie";
        emit DoLog(str);
        return str;
    }    
}