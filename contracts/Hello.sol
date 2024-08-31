// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Hello {
    // 定义一个返回字符串的公共函数
    function greet() public pure returns (string memory) {
        return "Hello, World!";
    }
}