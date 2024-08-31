// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// 实现合约V1
contract UUPSU_MyContract_V1 is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    uint256 public value;

    function initialize(uint256 _value) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        value = _value;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function setValue(uint256 _value) public onlyOwner {
        value = _value;
    }

    function getValue() external view returns (uint256) {
        return value;
    }

    // 添加获取逻辑合约的原始地址
    function getLogicContractAddress() public view returns (address) {
        return address(this);
    } 
}

// 升级后的实现合约V2
contract UUPSU_MyContract_V2 is UUPSU_MyContract_V1 {
    function increment() public {
        value += 1;
    }
}
