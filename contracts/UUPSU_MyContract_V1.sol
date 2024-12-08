// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "hardhat/console.sol";

// 协助 - 通用可升级代理(UUPSUpgradeable)：实现合约
/*
    通用可升级代理，对应的逻辑合约
    OwnableUpgradeable 可以带来更便捷的"权限控制模块"
    UUPSUpgradeable 内置升级函数
*/
contract UUPSU_MyContract_V1 is OwnableUpgradeable, UUPSUpgradeable
{
    string internal initWay;
    uint256 internal value;
    address internal testAdr;

    event OnAuthorizeUpgrade(address newImplementation);

    function initialize(string memory _initWay, uint256 _value) public initializer {
        __Ownable_init();
        initWay = _initWay;        
        value = _value;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
        // 当升级为新的逻辑合约地址时，可以做一些逻辑
        emit OnAuthorizeUpgrade(newImplementation);
        console.log("OnAuthorizeUpgrade ", newImplementation);
    }

    function getInitWay() external view virtual returns (string memory) {
        return initWay;
    }    

    function getVersion() external pure virtual returns (string memory) {
        return "UUPSU_Version_V1";
    }

    function setValue(uint256 _value) public virtual onlyOwner {
        value = _value;
    }

    function getValue() external view virtual returns(uint256){
        return value;
    }
}
