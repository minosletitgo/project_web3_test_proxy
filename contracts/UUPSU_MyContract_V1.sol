// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// 协助 - 通用可升级代理(UUPSUpgradeable)：实现合约
/*
    通用可升级代理，对应的逻辑合约
    OwnableUpgradeable 可以带来更便捷的"权限控制模块"
    UUPSUpgradeable 内置升级函数
*/
contract UUPSU_MyContract_V1 is OwnableUpgradeable, UUPSUpgradeable
{
    uint256 public value;

    function initialize(uint256 _value) public initializer {
        __Ownable_init();
        value = _value;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function setValue(uint256 _value) public onlyOwner {
        value = _value;
    }

    function getValue() external view returns (uint256) {
        return value;
    }
}
