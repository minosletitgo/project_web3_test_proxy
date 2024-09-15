// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Hello {
    event DoLog(string str);
    // 定义一个返回字符串的公共函数
    function greet() public returns (string memory) {
        emit DoLog("Hello, World!"); 
        return "Hello, World!";
    }
}