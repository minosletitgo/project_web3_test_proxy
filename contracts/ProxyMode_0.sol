// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Proxy {
    address internal _implementation;
    address public _admin;

    uint256 public _value1;
    uint256 public _value2;
    uint256 public _value3;

    ////////////////////////////////////////////////////

    modifier onlyAdmin() {
        require(msg.sender == _admin);
        _;
    }

    constructor(address logicContractAddress) {
        console.log("AAAAAAAAAAAAAA Proxy.constructor:", logicContractAddress);

        _admin = msg.sender;
        _implementation = logicContractAddress;        
    }

    function upgradeTo(address logicContractAddress) external onlyAdmin {
        require(
            logicContractAddress != _implementation,
            "upgradeTo should not the same!"
        );
        _implementation = logicContractAddress;
    }

    fallback() external payable {
        //_delegate(_implementation);
        _delegate_02(_implementation);
    }

    receive() external payable {}

    // function _delegate(address impl) internal {
    //     (bool suc, bytes memory data) = impl.delegatecall(msg.data);
    //     if (!suc) {
    //         revert("_delegate Failed!");
    //     }
    // }

    function _delegate_02(address impl) internal {
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    /*
        以上 fallback调用 _delegate 与 _delegate_02 的差异

        返回值差异：
        1. 上层的fallback，没有返回值机制，bytes memory data并没有返回出去
        2. 使用汇编的方式，绕开"没有返回值机制"，操作内存做到返回机制。

        可控性与效率差异：
        1. 简洁，语法更易读，但会增加一些 Solidity 自带的错误信息开销。
        2. 直接在内存中处理数据，并确保与被代理的合约返回数据一致，减少额外的开销，提高了效率。
        
        错误信息的传播差异:
        1. 抛出的是自定义的错误 "delegate Failed!"，原始的错误数据不会返回给调用者。
        2. 保留原始合约的返回信息或错误信息，便于调试。

        总结：
        第二种实现方式在高级代理合约中更为常用，因为它可以确保返回数据或错误信息与原始合约一致，且具有更高的效率。
    */

    event OnSetDebugValue1(uint256 value);

    function setDebugValue1(uint256 value) external pure returns (uint256) {
        //emit OnSetDebugValue1(value);
        console.log("Proxy.setDebugValue1:", value); // 输出日志信息
        return value;
    }
}

contract LogicV1 {
    address internal _implementation;
    address public _admin;

    uint256 public _value1;
    uint256 public _value2;
    uint256 public _value3;

    ////////////////////////////////////////////////////

    event OnSetValue1(uint256 value);
    event OnSetValue2(uint256 value);
    event OnSetValue3(uint256 value);

    //函数选择器，且参数为1，合并编码:  0x6ca0f3210000000000000000000000000000000000000000000000000000000000000001
    function setValue1(uint256 value) external returns (uint256) {
        _value1 = value;
        emit OnSetValue1(value);
        console.log("LogicV1.setValue1:", value); // 输出日志信息
        return value;
    }

    function getValue1() external view returns (uint256) {
        console.log("LogicV1.getValue1:", _value1); // 输出日志信息
        return _value1;
    }

    //函数选择器，且参数为2，合并编码:  0x74d393f00000000000000000000000000000000000000000000000000000000000000002
    function setValue2(uint256 value) external returns (uint256) {
        _value2 = value;
        emit OnSetValue2(value);
        return value;
    }

    function getValue2() external view returns (uint256) {
        return _value2;
    }

    //函数选择器，且参数为3，合并编码:  0x9a68e5820000000000000000000000000000000000000000000000000000000000000003
    function setValue3(uint256 value) external returns (uint256) {
        _value3 = value;
        emit OnSetValue3(value);
        return value;
    }

    function getValue3() external view returns (uint256) {
        return _value3;
    }
}

contract LogicV2 is LogicV1 {
    uint256 public _value4;

    ////////////////////////////////////////////////////

    event OnSetValue4(uint256 value);

    //函数选择器，且参数为4，合并编码:  0x9a68e5820000000000000000000000000000000000000000000000000000000000000004
    function setValue4(uint256 value) external virtual returns (uint256) {
        _value4 = value;
        emit OnSetValue4(value);
        return value;
    }
}
