// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./TU_MyContract_V1.sol";

contract TU_MyContract_V2 is TU_MyContract_V1 {
    uint256 internal value2;
    address internal testAdr2;

    function getVersion() external pure virtual override returns (string memory) {
        return "TU_Version_V2";
    }

    function setValue2(uint256 _value) public virtual onlyOwner {
        value2 = _value;
    }

    function getValue2() external view virtual returns(uint256){
        return value2;
    }     
}