// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/*
    透明代理模式，对应的逻辑合约
    OwnableUpgradeable 可以带来更便捷的"权限控制模块"
*/
contract TU_MyContract_V1 is OwnableUpgradeable {
    string internal initWay;
    uint256 internal value;

    function initialize(string memory _initWay, uint256 _value) external initializer {
        __Ownable_init();   // 初始化管理员
        initWay = _initWay;        
        value = _value;
    }

    function getInitWay() external view virtual returns (string memory) {
        return initWay;
    }    

    function getVersion() external pure virtual returns (string memory) {
        return "Version_V1";
    }

    function setValue(uint256 _value) public virtual onlyOwner {
        value = _value;
    }

    function getValue() external view virtual returns(uint256){
        return value;
    }
}

contract TU_MyContract_V2 is TU_MyContract_V1 {
    uint256 internal value2;

    function getVersion() external pure virtual override returns (string memory) {
        return "Version_V2";
    }

    function setValue2(uint256 _value) public virtual onlyOwner {
        value2 = _value;
    }

    function getValue2() external view virtual returns(uint256){
        return value2;
    }     
}