// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// 协助 - 透明代理(TransparentUpgradeableProxy)：实现合约
contract TU_MyContract_V1 is Initializable, OwnableUpgradeable {
    uint256 internal value;

    function initialize(uint256 _value) public initializer {
        __Ownable_init();
        value = _value;
    }

    function setValue(uint256 _value) public onlyOwner {
        value = _value;
    }

    function getValue() external view returns(uint256){
        return value;
    }
}

contract TU_MyContract_V2 is TU_MyContract_V1 {
    function increment() public {
        value += 1;
    }
}